const { getCenterByIdModel } = require("../models/center.model");
const { getReservasByCenter } = require("../models/reserva.model");

const obtenerReservas = async (req, res) => {
    try {
        const { id_center } = req.params;

        const reservas = await getReservasByCenter(id_center);

        const events = reservas.map(r => ({
            title: `${r.zona} - ${r.nombre_o_numero}`,
            start: r.fecha_hora_inicio,
            end: r.fecha_hora_fin,

            extendedProps: {
                cliente: r.cliente,
                zona: r.zona,
                puesto: r.nombre_o_numero
            }
        }));

        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener reservas" });
    }
};

const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {

    try {

        const {
            centerId,
            selectedDate,
            startHour,
            duration
        } = req.body;

        // VALIDACIÓN
        if (
            !centerId ||
            !selectedDate ||
            !startHour ||
            !duration
        ) {

            return res.status(400).json({
                error: "Datos incompletos"
            });

        }

        if (duration <= 0) {

            return res.status(400).json({
                error: "Duración inválida"
            });

        }

        // CENTER REAL MYSQL
        const center =
            await getCenterByIdModel(centerId);

        if (!center) {

            return res.status(404).json({
                error: "Center no encontrado"
            });

        }

        // PRECIO REAL
        const precioHora =
            parseFloat(center.precio);

        const serviceFee = 2;

        const totalPrice =
            (precioHora * duration)
            + serviceFee;

        // STRIPE
        const session =
            await stripe.checkout.sessions.create({

                payment_method_types: ["card"],

                mode: "payment",

                line_items: [
                    {
                        price_data: {

                            currency: "eur",

                            product_data: {
                                name: center.nombre,
                            },

                            unit_amount:
                                Math.round(
                                    totalPrice * 100
                                ),

                        },

                        quantity: 1,
                    },
                ],

                success_url:
                    `${process.env.CLIENT_URL}/success`,

                cancel_url:
                    `${process.env.CLIENT_URL}/cancel`,

                metadata: {

                    center_id: centerId,

                    date: selectedDate,

                    start_hour: startHour,

                    duration: duration,

                    user_id:
                        req.user.id_usuario

                }

            });

        res.json({
            url: session.url
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Stripe error"
        });

    }

};

module.exports = {
    obtenerReservas,
    createCheckoutSession
};

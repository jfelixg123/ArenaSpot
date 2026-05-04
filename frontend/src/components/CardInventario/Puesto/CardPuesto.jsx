import React from 'react';
import './Cardinventario.css';

export default function CardPuesto({ puesto, onEdit, onDelete }) {
    return (
        <div className="card cardPuesto">

            <h3>{puesto.nombre}</h3>

            <p className="zona">{puesto.zona}</p>

            <div className="specs">

                <strong>Componentes</strong>

                {puesto.tipo === "PC" && (
                    <>
                        <p>{puesto.specs.cpu}</p>
                        <p>{puesto.specs.gpu}</p>
                        <p>{puesto.specs.ram}</p>
                        <p>{puesto.specs.monitor}</p>
                    </>
                )}

                {puesto.tipo === "CONSOLA" && (
                    <>
                        <p>{puesto.specs.plataforma}</p>
                        <p>{puesto.specs.almacenamiento}</p>
                        <p>{puesto.specs.monitor_tv}</p>
                        <p>{puesto.specs.notas}</p>
                    </>

                )}

                {puesto.tipo === "VR" && (
                    <>
                        <p>{puesto.specs.headset}</p>
                        <p>{puesto.specs.controllers}</p>
                        <p>{puesto.specs.tracking}</p>
                        <p>{puesto.specs.plataforma_pc}</p>
                        <p>{puesto.specs.notas}</p>
                    </>
                )}

                {puesto.tipo === "SIMULADOR" && (
                    <>
                        <p>{puesto.specs.base}</p>
                        <p>{puesto.specs.volante}</p>
                        <p>{puesto.specs.pedales}</p>
                        <p>{puesto.specs.shifter}</p>
                        <p>{puesto.specs.asiento}</p>
                        <p>{puesto.specs.plataforma_pc}</p>
                        <p>{puesto.specs.notas}</p>
                    </>

                )}

            </div>

            <div>
                <strong>Periféricos</strong>
                <ul>
                    {puesto.componentes.map((c, i) => (
                        <li key={i}>
                            {c.nombre} x{c.cantidad}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="acciones">
                <button onClick={() => onEdit(puesto)}>✏️</button>
                <button onClick={() => onDelete(puesto.id)}>🗑️</button>
            </div>

        </div>
    );
}

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BotonFiltros from "../components/BotonFiltros/BotonFiltros";
import ListPuestos from "../components/ListadoInventario/ListadoInventario";
import './Inventario.css';
import IconoFiltrar from '../assets/images/filtrar.png';
import IconoAñadir from '../assets/images/añadir.png';




function Inventario() {
    const [showModal, setShowModal] = useState(false);
    const [nombre, setNombre] = useState("");
    const [zonas, setZonas] = useState([]);
    const [idZona, setIdZona] = useState("");
    const [perifericos, setPerifericos] = useState([]);
    const [specs, setSpecs] = useState({
        cpu: "",
        gpu: "",
        ram: "",
        almacenamiento: "",
        monitor: ""
    });
    const [editando, setEditando] = useState(false);
    const [idPuesto, setIdPuesto] = useState(null);
    const [filtroTipo, setFiltroTipo] = useState("TODOS");
    const [showFiltros, setShowFiltros] = useState(false);


    const handleFiltros = () => {
        setShowFiltros(prev => !prev);
    };
    const handleAdd = () => {
        setShowModal(true);
    };
    const handleEdit = (puesto) => {
        setShowModal(true);
        setEditando(true);

        setIdPuesto(puesto.id);
        setNombre(puesto.nombre);
        setIdZona(puesto.id_zona || "");

        setSpecs({
            cpu: puesto.specs?.cpu || "",
            gpu: puesto.specs?.gpu || "",
            ram: puesto.specs?.ram || "",
            almacenamiento: puesto.specs?.almacenamiento || "",
            monitor: puesto.specs?.monitor || ""
        });

        setPerifericos(
            (puesto.componentes || []).map(c => ({
                id_item: c.id_item || "",
                cantidad: c.cantidad
            }))
        );
    };

    const addPeriferico = () => {
        setPerifericos([...perifericos, { id_item: "", cantidad: 1 }]);
    };

    useEffect(() => {
        fetch("http://localhost:3001/api/inventario/zonas/1")
            .then(res => res.json())
            .then(data => setZonas(data))
            .catch(err => console.error(err));
    }, []);

    const handleSave = async () => {

        if (!idZona || !nombre) {
            alert("Completa todos los campos");
            return;
        }

        await fetch("http://localhost:3001/api/inventario/puestos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_zona: idZona,
                nombre,
                specs,
                perifericos
            })
        });

        setShowModal(false);
        window.location.reload();
    };

    const handleUpdate = async () => {

        if (!idZona) {
            alert("Completa todos los campos");
            return;
        }


        await fetch(`http://localhost:3001/api/inventario/puestos/${idPuesto}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre,
                id_zona: idZona,
                specs,
                perifericos
            })
        });

        setShowModal(false);
        setEditando(false);

        window.location.reload();
    };

    return (
        <>
            <Navbar />
            <main className="inventario-main">
                <div className="headerInventario">

                    <h1>Inventario</h1>

                    <div className="accionesInventario">
                        <div className="contenedorFiltros">

                            <BotonFiltros
                                texto={"Filtros"}
                                onClick={handleFiltros}
                                icono={IconoFiltrar}
                            />

                            {showFiltros && (
                                <div className="dropdownFiltros">

                                    <button onClick={() => {setFiltroTipo("TODOS"); setShowFiltros(false);}}>Todos</button>
                                    <button onClick={() => {setFiltroTipo("PC"); setShowFiltros(false);}}>PC</button>
                                    <button onClick={() => {setFiltroTipo("CONSOLA"); setShowFiltros(false);}}>Consola</button>
                                    <button onClick={() => {setFiltroTipo("VR"); setShowFiltros(false);}}>VR</button>
                                    <button onClick={() => {setFiltroTipo("SIMULADOR"); setShowFiltros(false);}}>Simulador</button>

                                </div>
                            )}

                        </div>
                        <BotonFiltros texto={"Añadir"} onClick={handleAdd} icono={IconoAñadir} />
                    </div>

                </div>

                <ListPuestos onEdit={handleEdit} filtroTipo={filtroTipo} />

                {showModal && (
                    <div className="modal">
                        <div className="modalContent">

                            <h2>Nuevo Equipo</h2>

                            <input
                                placeholder="Nombre (PC-6...)"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />

                            <select value={idZona} onChange={(e) => setIdZona(e.target.value)}>
                                <option value="">Selecciona zona</option>

                                {zonas.map(z => (
                                    <option key={z.id_zona} value={z.id_zona}>
                                        {z.nombre} ({z.tipo})
                                    </option>
                                ))}
                            </select>

                            <div className="specsForm">
                                <input placeholder="CPU" onChange={(e) => setSpecs({ ...specs, cpu: e.target.value })} />
                                <input placeholder="GPU" onChange={(e) => setSpecs({ ...specs, gpu: e.target.value })} />
                                <input placeholder="RAM" onChange={(e) => setSpecs({ ...specs, ram: e.target.value })} />
                                <input placeholder="Almacenamiento" onChange={(e) => setSpecs({ ...specs, almacenamiento: e.target.value })} />
                                <input placeholder="Monitor" onChange={(e) => setSpecs({ ...specs, monitor: e.target.value })} />
                            </div>

                            <div>
                                <h4>Periféricos</h4>

                                {perifericos.map((p, i) => (
                                    <div key={i} className="perifericoRow">

                                        <select
                                            onChange={(e) => {
                                                const updated = [...perifericos];
                                                updated[i].id_item = e.target.value;
                                                setPerifericos(updated);
                                            }}
                                        >
                                            <option value="">Selecciona</option>
                                            <option value="1">Teclado</option>
                                            <option value="2">Ratón</option>
                                            <option value="3">Auriculares</option>
                                        </select>

                                        <input
                                            type="number"
                                            value={p.cantidad}
                                            onChange={(e) => {
                                                const updated = [...perifericos];
                                                updated[i].cantidad = e.target.value;
                                                setPerifericos(updated);
                                            }}
                                        />

                                    </div>
                                ))}

                                <button onClick={addPeriferico}>+ Añadir periférico</button>
                            </div>

                            <div className="modalActions">
                                <button onClick={editando ? handleUpdate : handleSave}>
                                    {editando ? "Actualizar" : "Guardar"}
                                </button>
                                <button onClick={() => setShowModal(false)}>Cancelar</button>
                            </div>

                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}

export default Inventario;

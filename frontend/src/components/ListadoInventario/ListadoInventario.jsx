import { useEffect, useState } from "react";
import CardPuesto from "../CardInventario/Puesto/CardPuesto";

export default function ListadoInventario({ onEdit, filtroTipo }) {

    const [puestos, setPuestos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/inventario/puestos/1")
            .then(res => res.json())
            .then(data => setPuestos(data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("¿Eliminar equipo?")) return;

        await fetch(`http://localhost:3001/api/inventario/puestos/${id}`, {
            method: "DELETE"
        });

        setPuestos(prev => prev.filter(p => p.id !== id));
    };

    const puestosFiltrados =
        filtroTipo === "TODOS"
            ? puestos
            : puestos.filter(p => p.tipo === filtroTipo);

    return (
        <div className="grid-inventario">
            {puestosFiltrados.map(p => (
                <CardPuesto
                    key={p.id}
                    puesto={p}
                    onEdit={onEdit}
                    onDelete={handleDelete}
                />
            ))}
        </div>

    );
}

import React from "react";
import Navbar from "../components/Navbar/Navbar";
import EditarPerfilCliente from "../components/EditarPerfil/EditarPerfilCliente";
import "./EditarPerfil.css";

function EditarPerfil() {
    return (
        <div className="editar-perfil-page">
            <Navbar />
            <main className="editar-perfil-main">
                <EditarPerfilCliente />
            </main>
        </div>
    );
}

export default EditarPerfil;
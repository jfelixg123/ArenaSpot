import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DashboardGC from "./pages/DashboardGC";
import Inventario from "./pages/Inventario";
import CenterDetail from "./pages/CenterDetail";
import MisReservas from "./pages/MisReservas";
import EditarPerfil from "./pages/EditarPerfil";

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/home" element={<Home />} />

                <Route path="/centers/:id" element={<CenterDetail />} />

                {/* Hay que protejer ruta por rol */}
                <Route path="/dashboardGC" element={<DashboardGC />} />

                <Route path="/gestionarInventario" element={<Inventario />} />

                <Route path="/mis-reservas" element={<MisReservas />} />
                <Route path="/editar-perfil" element={<EditarPerfil />} />

                {/* fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

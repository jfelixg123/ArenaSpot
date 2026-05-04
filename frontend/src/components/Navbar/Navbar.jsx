import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import mando from '../../assets/images/mando.png';
import usuario from '../../assets/images/usuario.png';
import './Navbar.css';

function Header() {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return;

        fetch("http://localhost:3001/api/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(() => {
                localStorage.removeItem("token");
                setUser(null);
            });
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/";
    };

    return (
        <header className="header">
            <Link to="/" className="logoLink">
                <img src={logo} alt="ArenaSpot" className="logoImage" />
            </Link>

            <nav className="nav">

                {/* NO LOGUEADO */}
                {!user && (
                    <>
                        <a href="/register" className="enlace">
                            <img src={mando} alt="Mando" className="enlaceImage" />
                            Registra tu Gaming Center
                        </a>

                        <a href="/login" className="enlace">
                            <img src={usuario} alt="Usuario" className="enlaceImage" />
                            Iniciar sesión
                        </a>
                    </>
                )}

                {/* CLIENTE */}
                {user?.rol === "CLIENTE" && (
                    <div className="profile-dropdown" ref={dropdownRef}>
                        <button
                            className="profile-button"
                            onClick={() => setOpen(!open)}
                        >
                            <img src={usuario} className="profile-avatar" />
                            <span>Mi perfil</span>
                        </button>

                        {open && (
                            <div className="dropdown-menu">
                                <button className="dropdown-item">
                                    Editar perfil
                                </button>
                                <button className="dropdown-item">
                                    Mis reservas
                                </button>
                                <button className="dropdown-item logout" onClick={handleLogout}>
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* ADMIN */}
                {user?.rol === "ADMIN" && (
                    <>
                        <a href="/dashboardGC" className="enlace">
                            <img src={mando} alt="Mando" className="enlaceImage" />
                           Calendario
                        </a>

                        <a href="/gestionarInventario" className="enlace">
                            <img src={mando} alt="Mando" className="enlaceImage" />
                            Gestiona tu Inventario
                        </a>

                        <div className="profile-dropdown" ref={dropdownRef}>
                            <button
                                className="profile-button"
                                onClick={() => setOpen(!open)}
                            >
                                <div className="profile-avatar">Logo</div>
                                <span>Mi perfil</span>
                            </button>

                            {open && (
                                <div className="dropdown-menu">
                                    <button className="dropdown-item">
                                        Editar perfil
                                    </button>
                                    <button className="dropdown-item">
                                        Mis reservas
                                    </button>
                                    <button className="dropdown-item logout" onClick={handleLogout}>
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}

            </nav>
        </header>
    );
}

export default Header;

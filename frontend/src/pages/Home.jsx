import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BarraBuscar from "../components/BarraBuscar/BarraBuscar";
import MapPicker from "../components//MapPicker/MapPicker";
import BotonFiltros from "../components/BotonFiltros/BotonFiltros";
import CardCenters from "../components/CardCenters/CardCenters";
import "./Home.css";
import IconoFiltrar from '../assets/images/filtrar.png';

function Home() {

    const [centers, setCenters] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [centerSeleccionado, setCenterSeleccionado] = useState(null);
    const [busquedaError, setBusquedaError] = useState("");
    const [showFiltros, setShowFiltros] = useState(false);
    const [filtroCiudad, setFiltroCiudad] = useState("");
    const [filtroPrecio, setFiltroPrecio] = useState("");

    useEffect(() => {

        fetch("http://localhost:3001/api/centers")
            .then(res => res.json())
            .then(data => {
                console.log('Home: fetched centers.length=', Array.isArray(data)?data.length:0, data && data.slice ? data.slice(0,3) : data);
                setCenters(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    useEffect(() => {
        console.log('Home: centers state changed, length=', centers.length);
    }, [centers.length]);

    const selectCenter = (center) => {
        if (!center) return;

        setCenterSeleccionado({ lat: Number(center.lat), lng: Number(center.lng) });
        setBusquedaError("");
        setSearchQuery(center.nombre || "");
        setShowSearchResults(false);
    };

    const handleSearch = (query) => {
        const texto = String(query || "").trim().toLowerCase();
        setSearchQuery(query);
        setShowSearchResults(false);

        if (!texto) {
            setCenterSeleccionado(null);
            setBusquedaError("");
            return;
        }

        const encontrados = centers.filter((center) => {
            const nombre = String(center.nombre || "").toLowerCase();
            const ciudad = String(center.ciudad || "").toLowerCase();
            return nombre.includes(texto) || ciudad.includes(texto);
        });

        if (encontrados.length > 0) {
            selectCenter(encontrados[0]);
            setBusquedaError("");
        } else {
            setCenterSeleccionado(null);
            setBusquedaError("No se encontró ningún gaming center con ese nombre o ciudad.");
        }
    };

    const searchResults = searchQuery.trim()
        ? centers.filter((center) => {
            const texto = searchQuery.trim().toLowerCase();
            const nombre = String(center.nombre || "").toLowerCase();
            const ciudad = String(center.ciudad || "").toLowerCase();
            return nombre.includes(texto) || ciudad.includes(texto);
        })
        : [];

    const handleFiltros = () => {
        setShowFiltros((prev) => !prev);
    };

    const limpiarFiltros = () => {
        setFiltroCiudad("");
        setFiltroPrecio("");
    };

    const centersFiltrados = centers.filter((center) => {
        const coincideCiudad = !filtroCiudad || String(center.ciudad || "").toLowerCase().includes(filtroCiudad.toLowerCase());
        const precioCentro = center.precio !== null && center.precio !== undefined && center.precio !== ""
            ? parseFloat(center.precio)
            : null;
        const precioMaximo = filtroPrecio ? parseFloat(filtroPrecio) : null;
        const coincidePrecio = precioMaximo === null || (precioCentro !== null && precioCentro <= precioMaximo);

        return coincideCiudad && coincidePrecio;
    });

    return (
        <>
            <Navbar />

            <main className="home-main">

                <h1>
                    Busca tu <span className="span">
                        Gaming center
                    </span> más cercano
                </h1>

                <div className="home-search-wrapper">
                    <BarraBuscar
                        onSearch={handleSearch}
                        onQueryChange={(value) => {
                            setSearchQuery(value);
                            setShowSearchResults(Boolean(String(value || "").trim()));
                        }}
                        value={searchQuery}
                    />

                    {showSearchResults && searchQuery.trim() && searchResults.length > 0 && (
                        <div className="home-search-results">
                            {searchResults.map((center) => (
                                <button
                                    type="button"
                                    key={center.id_center}
                                    className="home-search-result"
                                    onClick={() => selectCenter(center)}
                                >
                                    <strong>{center.nombre}</strong>
                                    <span>{center.ciudad}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {busquedaError && <p className="home-search-error">{busquedaError}</p>}

                <MapPicker value={centerSeleccionado} flyTo={centerSeleccionado} centers={centers} />

                <div className="home-listado-header">

                    <h1>Listado</h1>

                    <div className="home-filtros-wrapper">
                        <BotonFiltros
                            texto={"Filtros"}
                            onClick={handleFiltros}
                            icono={IconoFiltrar}
                        />

                        {showFiltros && (
                            <div className="home-filtros-backdrop" onClick={() => setShowFiltros(false)}>
                                <div className="home-filtros-popup" onClick={(e) => e.stopPropagation()}>
                                    <div className="home-filtros-popup-header">
                                        <h3>Filtrar centros</h3>
                                        <button type="button" className="home-filtros-close" onClick={() => setShowFiltros(false)}>
                                            ×
                                        </button>
                                    </div>

                                    <label>
                                        Ciudad
                                        <input
                                            type="text"
                                            placeholder="Ej. Madrid"
                                            value={filtroCiudad}
                                            onChange={(e) => setFiltroCiudad(e.target.value)}
                                        />
                                    </label>

                                    <label>
                                        Precio máximo (€ / hora)
                                        <input
                                            type="number"
                                            min="0"
                                            step="1"
                                            placeholder="Ej. 20"
                                            value={filtroPrecio}
                                            onChange={(e) => setFiltroPrecio(e.target.value)}
                                        />
                                    </label>

                                    <div className="home-dropdown-actions">
                                        <button type="button" className="secondary" onClick={limpiarFiltros}>Limpiar</button>
                                        <button type="button" onClick={() => setShowFiltros(false)}>Aplicar</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {centersFiltrados.slice(0, 4).map(center => (
                    <CardCenters
                        key={center.id_center}
                        center={center}
                    />
                ))}

            </main>

            <Footer />
        </>
    );
}

export default Home;

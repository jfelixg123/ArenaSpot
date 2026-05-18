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

    useEffect(() => {

        fetch("http://localhost:3001/api/centers")
            .then(res => res.json())
            .then(data => {
                setCenters(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    const handleSearch = () => {};

    const handleFiltros = () => {};

    return (
        <>
            <Navbar />

            <main className="home-main">

                <h1>
                    Busca tu <span className="span">
                        Gaming center
                    </span> más cercano
                </h1>

                <BarraBuscar onSearch={handleSearch} />

                <MapPicker />

                <div className="home-listado-header">

                    <h1>Listado</h1>

                    <BotonFiltros
                        texto={"Filtros"}
                        onClick={handleFiltros}
                        icono={IconoFiltrar}
                    />

                </div>

                {centers.map(center => (
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

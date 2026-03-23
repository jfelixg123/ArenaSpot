import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BarraBuscar from "../components/BarraBuscar/BarraBuscar";
import MapPicker from "../components/MapPicker";
import BotonFiltros from "../components/BotonFiltros/BotonFiltros";
import CardCenters from "../components/CardCenters/CardCenters";
import "./Home.css";

function Home() {
    const handleSearch = () => {};

    return (
        <>
            <Navbar />
            <main className="home-main">
                <h1>Busca tu <span className="span">Gaming center</span> más cercano</h1>
                <BarraBuscar onSearch={handleSearch} />
                <MapPicker />
                <div className="home-listado-header">
                    <h1>Listado</h1>
                    <BotonFiltros onClick={() => {}} />
                </div>
                <CardCenters />
                <CardCenters />
                <CardCenters />
                <CardCenters />
            </main>
            <Footer />
        </>
    );
}

export default Home;
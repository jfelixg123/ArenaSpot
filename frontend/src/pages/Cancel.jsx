import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function Cancel() {

    return (

        <>
            <Navbar />

            <div className="cancel-page">

                <h1>
                    ❌ Pago cancelado
                </h1>

                <p>
                    No se realizó ningún cobro.
                </p>

            </div>

            <Footer />
        </>

    );

}

export default Cancel;

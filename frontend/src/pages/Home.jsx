import { useEffect, useState } from "react";
import { apiGet } from "../api";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import TrendingSection from "../components/TrendingCenters/TrendingSection";
import ComoFuncionaSection from "../components/ComoFunciona/ComoFuncionaSection";
import Comunidad from "../components/Comunidad/ComunidadSection";
import Footer from "../components/Footer/Footer";

const styles = {
  main: {
    minHeight: "100vh",
  },
};

export default function Home() {
  const [dbTest, setDbTest] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet("/api/db-test")
      .then(setDbTest)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <>
      <Navbar />
      <main style={styles.main}>
        <Hero />
        <TrendingSection />
        <ComoFuncionaSection />
        <Comunidad />
      </main>
      <Footer />
    </>
  );
}
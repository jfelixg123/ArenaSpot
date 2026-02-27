import { useEffect, useState } from "react";
import { apiGet } from "../api";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import TrendingSection from "../components/TrendingCenters/TrendingSection";
import ComoFuncionaSection from "../components/ComoFunciona/ComoFuncionaSection";

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
      </main>
      


      {/* {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {dbTest ? (
        <pre>{JSON.stringify(dbTest, null, 2)}</pre>
      ) : (
        <p>Cargando...</p>
      )} */}
    </>
  );
}

const styles = {
  main: {
    backgroundColor: '#0E1117',
  },
};
import { useEffect, useState } from "react";
import { apiGet } from "../api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

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
      <Hero />

      <div style={{ padding: 20 }}>
      <h1>ArenaSpot</h1>

      {/* {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {dbTest ? (
        <pre>{JSON.stringify(dbTest, null, 2)}</pre>
      ) : (
        <p>Cargando...</p>
      )} */}
      </div>
    </>
  );
}
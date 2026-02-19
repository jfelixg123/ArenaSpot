import { useEffect, useState } from "react";
import { apiGet } from "../api";

export default function Home() {
  const [dbTest, setDbTest] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet("/api/db-test")
      .then(setDbTest)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>ArenaSpot</h1>

      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {dbTest ? (
        <pre>{JSON.stringify(dbTest, null, 2)}</pre>
      ) : (
        <p>Cargando...</p>
      )}

      <div style={{ marginTop: 20 }}>
        <a href="/login">Login</a> | <a href="/register">Registro</a>
      </div>
    </div>
  );
}
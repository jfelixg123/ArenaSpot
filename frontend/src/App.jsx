import { useEffect, useState } from "react"
import axios from "axios"
import { apiGet } from "./api"

function App() {
  const [dbTest, setDbTest] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet("/api/db-test")
      .then(setDbTest)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Front conectado</h1>

      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {dbTest ? (
        <pre>{JSON.stringify(dbTest, null, 2)}</pre>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default App

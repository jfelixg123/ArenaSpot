import { useEffect } from "react"
import axios from "axios"

function App() {
  const [Data, setData] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const resp = await axios.get('http://localhost:3000/api/users');
      const data = resp.data;
      setData(data.data);
    };
    getUsers();
  }, [])

  if (Data.length > 0) {
    return (
      <>
      cargando data...
      </>)
  }

  return (
    <>
      hola mundo
      {
        Data.map(name=>(<>
        <li>{name}</li>
        </>))
      }
    </>
  )
}

export default App

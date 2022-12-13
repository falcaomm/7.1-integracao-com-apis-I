import React, { useEffect, useState } from "react";
import AddUsuario from "./Componentes/AddUsuario/AddUsuario";
import Usuario from "./Componentes/Usuario/Usuario";
import axios from "axios";

const usuariosLocal = [
  {
    id: 1,
    name: "Muri"
  },
  {
    id: 2,
    name: "Paulinha"
  },
  {
    id: 3,
    name: "Marcelo"
  },
  {
    id: 4,
    name: "Rodrigo"
  },
]

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [atualiza, setAtualiza] = useState(false)

  const getAllUsers = () => {
    const url = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users"
    const config = {
      headers: {
        Authorization: "manuela-falcao-barbosa"
      }
    }

    axios.get(url, config)
      .then((response) => { setUsuarios(response.data); console.log(response.data); })
      .catch((error) => { console.log(error.response); })
  }

  useEffect(() => {
    getAllUsers()
  }, [atualiza])

  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>
      <AddUsuario 
        setAtualiza={setAtualiza}
        atualiza={atualiza}
      />
      {usuarios.map((usuario) => {
        return <Usuario
          key={usuario.id}
          usuario={usuario} 
          setAtualiza={setAtualiza}
          atualiza={atualiza}
          />
      })}
    </>
  )
}

export default App;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const User = styled.div`
  border: black 1px solid;
  margin-top: 10px;
  width: 350px;
`
function Usuario(props) {
  const [usuario, setUsuario] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  const getUserById = (id) => {

    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`
    
    axios
      .get(url, {
        headers: { Authorization: "manuela-falcao-barbosa" }
      })
      .then((response) => { setUsuario(response.data) })
      .catch((error) => { console.log(error.response) })
  }

  const editUser = (id) => {

    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/` + id

    const config = {
      headers: { Authorization: "manuela-falcao-barbosa" }
    }

    const body = {
      name: nome,
      email: email
    }
    axios
      .put(url, body, config)
      .then((res) => {
        console.log("deu certo");
        props.setAtualiza(!props.atualiza)
      })
      .catch((error) => { console.log(error.response) })
  }
  
  const deleteUser = (id) => {

    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/` + id

    const config = {
      headers: { Authorization: "manuela-falcao-barbosa" }
    }

    axios
      .delete(url, config)
      .then((res) => {
        props.setAtualiza(!props.atualiza)
      })
      .catch((error) => { console.log(error.response) })
  }

  useEffect(() => {
    getUserById(props.usuario.id)
  }, [props.atualiza])

  return (
    <User>
      {editar ? (
        <div>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)} 
            
            />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={() => editUser(usuario.id)}>Enviar alterações</button>
        </div>
      ) : (
        <>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={() => deleteUser(usuario.id) }>Excluir</button>
    </User>
  );
}

export default Usuario;

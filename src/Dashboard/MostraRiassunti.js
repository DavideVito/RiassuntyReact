import React, {
  useEffect,
  useState
} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import GoogleLogin from "react-google-login";
import "../App.css";

function MostraRiassunti() {
  let [anteprime, cambiaAnteprime] = useState([]);
  let eliminato = useState(false);

  const prendiRiassunti = () => {
    const getAnteprime = async () => {
      let anteprime = await fetch(
        "https://vps.lellovitiello.tk/Riassunty/API/anteprima.php"
      );
      anteprime = await anteprime.json();
      cambiaAnteprime(anteprime);
      console.log("Anteprime", anteprime);
    };
    getAnteprime();
  };

  useEffect(prendiRiassunti, []);

  async function eliminaRiassunto(evento) {

    let data = new FormData();

    data.append("id", evento.currentTarget.id);
    let rispostaFetch = await fetch(
      "https://vps.lellovitiello.tk/Riassunty/API/eliminaRiassunto.php", {
        method: "POST",
        body: data,
        mode: "cors"
      }
    );

    console.log(rispostaFetch);
  }

  function a(arg) {
    console.log("ARG", arg)
  }

  let stile = {
    color: "white"
  };

  return ( <
    React.Fragment >

    {
      anteprime.map(anteprima => {
        return ( <
          div >
          <
          div className = "container-fluid row" >
          <
          div style = {
            stile
          }
          className = "col-md" >
          <
          p > {
            anteprima.Titolo
          } < /p> <
          img src = {
            "https://vps.lellovitiello.tk/Riassunty/" +
            anteprima.URLImmagine
          }
          width = "300"
          height = "300" /
          >
          <
          /div> <
          div style = {
            stile
          }
          className = "col-md" >
          <
          p > Elimina < /p> <
          img id = {
            anteprima.ID
          }
          style = {
            {
              cursor: "pointer"
            }
          }
          src = "https://img.icons8.com/flat_round/64/000000/delete-sign.png"
          onClick = {
            eliminaRiassunto
          }
          /> <
          /div> <
          /div> <
          /div>
        );
      })
    } <
    /React.Fragment>
  );
}

export default MostraRiassunti;
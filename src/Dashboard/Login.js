import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import FullNavBar from "../NavBar/FullNavBar";
import Bottone from "../Util/Bottone";
import "../App.css";
import $ from "jquery";
import MostraRiassunti from "./MostraRiassunti";

function Login(props) {
  let [ok, cambiaOk] = useState(false);
  let [udid, cambiaUDID] = useState();

  const esisteGia = () => {
    if (udid === 0 || typeof udid === "undefined") {
      return;
    }
    async function controllaCheEsistaGia() {
      let data = new FormData();
      data.append("id", udid);
      let token = sessionStorage.token;
      if (token) {
        data.append("token", token);
      }
      let risposta = await fetch(
        "https://vps.lellovitiello.tk/Riassunty/API/Utenti.php",
        //"http://localhost/~davidevitiello/Riassunty/API/Utenti.php",
        {
          method: "POST",
          body: data
        }
      );
      risposta = await risposta.json();
      sessionStorage.token = risposta.token;
      console.log(risposta);
      cambiaOk(true);
    }

    controllaCheEsistaGia();
  };

  useEffect(esisteGia, [udid]);

  function responseGoogle(risposta) {
    debugger;
    console.log(risposta);
    cambiaUDID(risposta.googleId);
    console.log(udid);
  }

  const stile = {
    marginTop: "-20%"
  };

  $("#loadingImage").fadeOut(500, "swing");

  if (ok) {
    $("#loadingImage").fadeOut(500, "swing");
    return (
      <React.Fragment>
        <FullNavBar
          elementi={[
            {
              nome: "Stai attento a quello che carichi, non ti conviene",
              dati: []
            }
          ]}
        />{" "}
        <div style={stile}>
          <Bottone TestoBottone="Per caricare" link="/Login/CaricaRiassunto" />
          <Bottone
            TestoBottone="Per approvare"
            link="/Login/ApprovaRiassunto"
          />
          <MostraRiassunti account={udid} />
          <div id="body"> </div>{" "}
        </div>{" "}
      </React.Fragment>
    );
  } else {
    $("#loadingImage").fadeOut(500, "swing");
    return (
      <React.Fragment>
        <FullNavBar
          elementi={[
            {
              nome: "Stai attento a quello che carichi, non ti conviene",
              dati: []
            }
          ]}
        />{" "}
        <div style={{ marginTop: "-20%" }}>
          <GoogleLogin
            clientId="757171675502-tn1k2bjmh123u729uqufjhg0nr8d1br1.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Login;

import React, { useEffect, useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import FullNavBar from "../NavBar/FullNavBar";
import Bottone from "../Util/Bottone";
import "../App.css";
import $ from "jquery";
import MostraRiassunti from "./MostraRiassunti";

function Login(props) {
  let [ok, cambiaOk] = useState(false);
  let [udid, cambiaUDID] = useState();
  let [account, cambiaAccount] = useState({});

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
  console.log(props);

  useEffect(esisteGia, [props.location.pathname, udid]);

  function responseGoogle(risposta) {
    console.log(risposta.getBasicProfile());
    cambiaAccount(risposta.getBasicProfile());
    cambiaUDID(risposta.googleId);
    console.log(udid);
  }

  function logout() {}

  const stile = {
    marginTop: "-50%"
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
          <div id="datiUtente" style={{ marginBottom: "20%" }}>
            <div id="nomePersona" className="row justify-content-center">
              {<p>Bentornato {account.getName()}</p>}
            </div>
            <div id="immaginePersona" className="row justify-content-center">
              {<img src={account.getImageUrl()} width="150" height="150" />}
            </div>
          </div>
          <div id="bottoni" style={{ marginTop: "20%" }}>
            <div
              className="row justify-content-center"
              style={{ marginBottom: "20%" }}
            >
              <GoogleLogout
                clientId="757171675502-tn1k2bjmh123u729uqufjhg0nr8d1br1.apps.googleusercontent.com"
                buttonText="Logout"
                theme="dark"
                width="260"
                height="80"
                onLogoutSuccess={logout}
              />
            </div>
            <Bottone
              TestoBottone="Per caricare"
              link="/Login/CaricaRiassunto"
            />
            <Bottone
              TestoBottone="Per approvare"
              link="/Login/ApprovaRiassunto"
            />
          </div>
          <div id="body" style={{ marginTop: "30%" }}>
            <MostraRiassunti account={udid} />
          </div>{" "}
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
        <div
          className="row justify-content-center"
          style={{ marginTop: "-20%" }}
        >
          <GoogleLogin
            clientId="757171675502-tn1k2bjmh123u729uqufjhg0nr8d1br1.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            theme="dark"
            width="260"
            height="80"
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Login;

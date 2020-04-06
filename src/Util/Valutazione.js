import React, { useState, useEffect } from "react";
import "../App.css";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import ReactStars from "react-stars";

function Valutazione(props) {
  let [valutazione, cambiaValutazione] = useState(0);

  function responseGoogle(risposta) {
    sessionStorage.clear();
    cambiaAccount(risposta.getBasicProfile());
    cambiaUDID(risposta.googleId);
    cambiaOK(true);
  }

  const getValutazione = async () => {
    let risposta = await fetch(
      `https://vps.lellovitiello.tk/Riassunty/API/getValutazione.php?idRiassunto=${props.idRiassunto}`
      //`http://localhost/~davidevitiello/Riassunty/API/getValutazione.php?idRiassunto=${props.idRiassunto}`
    );
    risposta = await risposta.json();
    let valutazione = risposta.Valutazione;
    cambiaValutazione(valutazione);
  };

  useEffect(() => {
    getValutazione();
  }, [window.location.href]);

  let [ok, cambiaOK] = useState(false);
  let [udid, cambiaUDID] = useState();
  let [account, cambiaAccount] = useState({});
  const cambiaValutazioneAndInvia = (val) => {
    if (ok === false) {
      return;
    }
    let id = account.getId();
    let riassunto = props.idRiassunto;
    let valutazione = val;
    fetch(
      `https://vps.lellovitiello.tk/Riassunty/API/InserisciValutazione.php?idUtente=${id}&valutazione=${valutazione}&idRiassunto=${riassunto}`
      //`http://localhost/~davidevitiello/Riassunty/API/InserisciValutazione.php?idUtente=${id}&valutazione=${valutazione}&idRiassunto=${riassunto}`
    ).then((risposta) =>
      risposta.json().then((ris) => {
        console.log(ris.valutazione);
        cambiaValutazione(ris.Valutazione);
      })
    );
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <ReactStars
          count={5}
          onChange={cambiaValutazioneAndInvia}
          size={24}
          value={valutazione}
          color2={"#ffd700"}
        />{" "}
      </div>{" "}
      <div
        style={{
          height: "50px",
        }}
      >
        {" "}
      </div>{" "}
      {ok ? (
        <div>
          <p
            style={{
              color: "white",
              fontSize: "1.2em",
              textAlign: "center",
            }}
          >
            Bevenuto {account.getName()}{" "}
          </p>
          <div className="row justify-content-center">
            <GoogleLogout
              clientId="757171675502-tn1k2bjmh123u729uqufjhg0nr8d1br1.apps.googleusercontent.com"
              buttonText="Logout"
              theme="dark"
              width="260"
              height="80"
              onLogoutSuccess={() => {
                cambiaOK(false);
              }}
            />{" "}
          </div>{" "}
        </div>
      ) : (
        <div className="row justify-content-center">
          <GoogleLogin
            clientId="757171675502-tn1k2bjmh123u729uqufjhg0nr8d1br1.apps.googleusercontent.com"
            buttonText="Accedi per valutare il riassunto"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            isSignedIn={true}
            theme="dark"
            width="260"
            height="80"
            cookiePolicy={"single_host_origin"}
          />{" "}
        </div>
      )}{" "}
    </div>
  );
}

export default Valutazione;

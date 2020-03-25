import React, { useEffect, useState } from "react";
import $ from "jquery";
import ReCAPTCHA from "react-google-recaptcha";
import "../App.css";
import FullNavBar from "../NavBar/FullNavBar";

function CaricaRiassunto() {
  let anni = [];
  let [indirizzi, cambiaIndirizzi] = useState([]);
  let [materie, cambiaMaterie] = useState([]);
  let [ok, cambiaOK] = useState(false);

  useEffect(() => {
    if (ok === false) {
      document.getElementById("bottoneSubmit").disabled = true;
      $("#bottoneSubmit").css({ cursor: "default" });
    } else {
      document.getElementById("bottoneSubmit").disabled = false;

      $("#bottoneSubmit").css({ cursor: "pointer" });
    }
  }, [window.location.href, ok]);

  const controllaValidita = () => {
    $.ajax({
      url:
        //"http://localhost/~davidevitiello/Riassunty/API/controllaValidita.php",
        "https://vps.lellovitiello.tk/Riassunty/API/controllaValidita.php",
      method: "POST",
      data: {
        token: sessionStorage.token
      },
      success: data => {
        if (data.valido === false) {
          window.location.href = "/Login";
        }
      }
    });
  };

  useEffect(() => {
    controllaValidita();
  }, [window.location.href]);

  controllaValidita();

  setInterval(async () => {
    controllaValidita();
  }, 60000);

  for (let i = 0; i < 5; i++) {
    anni.push(i + 1);
  }

  const prendiIndirizzi = () => {
    const getIndirizzi = async () => {
      let indirizzi = await fetch(
        "https://vps.lellovitiello.tk/Riassunty/API/indirizzi.php"
      );
      indirizzi = await indirizzi.json();
      cambiaIndirizzi(indirizzi);
    };
    getIndirizzi();
  };

  useEffect(prendiIndirizzi, []);

  const prendiMaterie = event => {
    let indirizzo =
      event.currentTarget.options[event.currentTarget.selectedIndex].value;

    const getMaterie = async () => {
      let materie = await fetch(
        "https://vps.lellovitiello.tk/Riassunty/API/materie.php?indirizzo=" +
          indirizzo
      );

      materie = await materie.json();
      cambiaMaterie(materie);
    };
    getMaterie();
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }
  $("#loadingImage").fadeOut(500, "swing");
  const caricaFile = async e => {
    if (!ok) {
      alert("Conferma il capthca");
    } else {
      debugger;
      e.preventDefault();
      let file = $("#file").prop("files")[0];
      let form = new FormData();
      form.append("pdfDaCaricare", file);

      let annoSelezionato = document.getElementById("anno");
      annoSelezionato =
        annoSelezionato.options[annoSelezionato.selectedIndex].value;

      form.append("anno", annoSelezionato);

      let indirizzoSelezionato = document.getElementById("indirizzo");
      indirizzoSelezionato =
        indirizzoSelezionato.options[indirizzoSelezionato.selectedIndex].value;

      form.append("indirizzi", indirizzoSelezionato);

      let materiaSelezionata = document.getElementById("materia");
      materiaSelezionata =
        materiaSelezionata.options[materiaSelezionata.selectedIndex].value;

      form.append("materie", materiaSelezionata);

      let token = sessionStorage.token;
      if (token) {
        form.append("token", token);
      }
      $("#loadingImage").fadeIn(500, "swing");
      $("#loadingImage").css({ opacity: "0.8" });
      $.ajax({
        //url: "http://localhost/~davidevitiello/Riassunty/API/caricaRiassunto.php", // point to server-side PHP script
        url: "https://vps.lellovitiello.tk/Riassunty/API/caricaRiassunto.php",
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        type: "POST",
        success: data => {
          if (data.shouldRedirect === "true") {
            window.location.href = "/Login";
          }
          alert("ok");
          debugger;
          $("#loadingImage").css({ opacity: "0" });
          $("#loadingImage").fadeOut(500, "swing");
        }
      });
    }
  };

  const stileDivisiore = {
    marginBottom: "30px"
  };

  let stile = {
    color: "white"
  };

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
      <section id="section0" className="sezione0">
        <div
          className="container-fluid"
          style={{
            textAlign: "center",
            marginTop: "100px"
          }}
        >
          <form onSubmit={caricaFile}>
            <div className="row justify-content-center">
              <p> Seleziona il file </p>{" "}
            </div>{" "}
            <div className="row justify-content-center">
              <input
                className="form-control-file"
                type="file"
                id="file"
                name="pdfDaCaricare"
                accept=".pdf"
                required
                style={{
                  width: "auto",
                  height: "auto",
                  borderRadius: "0"
                  //marginLeft: "50%"
                }}
              />{" "}
            </div>
            <div style={stileDivisiore}> </div>{" "}
            <div style={stile}>
              <div className="row justify-content-center">
                <p> Seleziona l 'indirizzo</p>{" "}
              </div>{" "}
              <div className="row justify-content-center">
                <select onChange={prendiMaterie} id="indirizzo" required>
                  {" "}
                  {indirizzi.map(indirizzo => {
                    return (
                      <option value={indirizzo.Indirizzo}>
                        {" "}
                        {indirizzo.Indirizzo}{" "}
                      </option>
                    );
                  })}{" "}
                </select>{" "}
              </div>{" "}
            </div>{" "}
            <div style={stileDivisiore}> </div>{" "}
            <div style={stile}>
              <div className="row justify-content-center">
                <p> Seleziona la materia </p>{" "}
              </div>{" "}
              <div className="row justify-content-center">
                <select required id="materia">
                  {" "}
                  {materie.map(materia => {
                    return (
                      <option value={materia.IDMateria}>
                        {" "}
                        {materia.Materia}{" "}
                      </option>
                    );
                  })}{" "}
                </select>{" "}
              </div>{" "}
            </div>{" "}
            <div style={stileDivisiore}> </div>{" "}
            <div style={stile}>
              <div className="row justify-content-center">
                <p> Seleziona l 'anno</p>{" "}
              </div>{" "}
              <div className="row justify-content-center">
                <select required id="anno">
                  {" "}
                  {anni.map(anno => {
                    return <option value={anno}> {anno} </option>;
                  })}{" "}
                </select>{" "}
              </div>{" "}
            </div>{" "}
            <div style={stileDivisiore}> </div>{" "}
            <div className="row justify-content-center">
              <ReCAPTCHA
                sitekey="6LfWBeAUAAAAACEmmY5bn5jkl5MPHpmQbyX6yohU"
                onChange={onChange}
                theme="dark"
                badge="bottomright"
                size="compact"
                onChange={() => {
                  cambiaOK(true);
                }}
                onExpired={() => {
                  cambiaOK(false);
                }}
              />
            </div>{" "}
            <div style={stileDivisiore}> </div>{" "}
            <div className="row justify-content-center">
              <button
                type="submit"
                value="Carica"
                className="btn btn-primary mb-2"
                id="bottoneSubmit"
                //onClick={caricaFile}
              >
                Carica{" "}
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </div>{" "}
      </section>{" "}
    </React.Fragment>
  );
}

export default CaricaRiassunto;

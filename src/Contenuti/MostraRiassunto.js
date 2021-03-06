import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "../App.css";
import $ from "jquery";
import Brand from "../NavBar/Foto/Brand";
import MenuIcon from "../NavBar/Elementi/MenuIcon";
import PDFViewer from "mgr-pdf-viewer-react";
import Valutazione from "../Util/Valutazione.js";
import { storageRef } from "../FirebaseStuff/config";
import { accediGoogle } from "../FirebaseStuff/auth";

function MostraRiassunto(props) {
  let [linkFoto, cambiaLink] = useState("");
  let [scala, cambiaScala] = useState(1);
  let [byteScaricati, cambiabyteScaricati] = useState(0);
  let [utente, cambiaUtente] = useState();
  let [ok, cambiaOk] = useState(false);

  $(window, document).on("scroll", () => {
    try {
      let elemento = document.getElementsByClassName("navShadow");
      if (elemento.length === 0) {
        cambiaLink("https://riassunty.altervista.org/FrecciaNera.png");
      } else {
        cambiaLink("https://riassunty.altervista.org/FrecciaBianca.png");
      }
    } catch (e) {
      cambiaLink("https://riassunty.altervista.org/FrecciaNera.png");
      console.log(e);
    }
  });

  const fetchRiassunto = () => {
    let idRiassunto = props.match.params.id;

    let a = localStorage.getItem(idRiassunto);
    if (a !== null) {
      a = JSON.parse(a);
      cambiaRiassunto(a.testo);
      document.getElementById("scaricamento").innerHTML = "";
      //rimuoviRiassuntiVecchi();
      return;
    }

    $.ajax({
      url: `https://vps.lellovitiello.tk/Riassunty/API/riassunto.php?id=${idRiassunto}`,
      //url:`http://localhost/~davidevitiello/Riassunty/API/riassunto.php?id=${idRiassunto}`
      cache: false,
      contentType: false,
      processData: false,

      type: "GET",
      success: (data) => {
        let riassuntoJSON = data[0];
        let oggettoDaMettere = {
          testo: riassuntoJSON,
          data: new Date(),
        };
        cambiaRiassunto(riassuntoJSON);
        document.getElementById("scaricamento").innerHTML = "";

        try {
          localStorage.setItem(idRiassunto, JSON.stringify(oggettoDaMettere));
        } catch (error) {
          console.error("Impossibile inserire nel local storage", error);
        }
      },

      xhr: function () {
        let xhr = new window.XMLHttpRequest();
        //Download progress
        xhr.addEventListener(
          "progress",
          function (evt) {
            console.log(evt.loaded);
            cambiabyteScaricati(evt.loaded);
          },
          false
        );
        return xhr;
      },
    });
  };
  $("#loadingImage").fadeOut(50);

  const [riassunto, cambiaRiassunto] = useState([]);
  let [url, cambiaUrl] = useState("");

  function fetchRiassuntoFirebase() {
    let utente = localStorage.getItem("utente");

    if (utente !== null) {
      cambiaUtente(utente);
      cambiaOk(true);
    }

    let nomeRiassunto = props.match.params.id;
    storageRef
      .child(nomeRiassunto)
      .getDownloadURL()
      .then((a) => {
        console.log(a);
        cambiaUrl(a);
      });
  }

  function blobToBase64(blob) {}

  useEffect(fetchRiassuntoFirebase, [props.location.pathname]);

  if (typeof riassunto === "undefined") {
    return <Redirect to="/" />;
  }
  return (
    <React.Fragment>
      <header>
        <nav>
          <Brand link={linkFoto} />
          <div id="menu">
            <div
              id="menu-toggle"
              onClick={() => {
                $("#menu-toggle").toggleClass("closeMenu");
                $("ul").toggleClass("showMenu");

                if ($("#menu-toggle").hasClass("closeMenu")) {
                  $("#main").animate(
                    {
                      left: "85%",
                      opacity: "0.7",
                    },
                    300
                  );
                } else {
                  $("#main").animate(
                    {
                      left: "0px",
                      opacity: "1",
                    },
                    300
                  );
                }
                $("li").on("click", () => {
                  $("ul").removeClass("showMenu");
                  $("#menu-toggle").removeClass("closeMenu");
                });
              }}
            >
              <MenuIcon />
            </div>
            <ul> </ul>
          </div>
        </nav>
        <div id="hero-section">
          <p
            style={{
              color: "white",
              fontSize: "1.2em",
              textAlign: "center",
            }}
          >
            <h3> {riassunto.Titolo} </h3> <br />
            <br />
            <br />
            Scorri per vedere <br />
            <br />
            Clicca + per incrementare lo zoom, clicca - per diminuire lo zoom
            <br />
            <br />
            Per una migliore esperienza, gira il telefono
          </p>
          <div>
            {!ok ? (
              <>
                <p
                  style={{
                    color: "white",
                    fontSize: "1.2em",
                    textAlign: "center",
                  }}
                >
                  Ciao Anonimo #{Math.floor(Math.random() * 10000)}
                </p>
              </>
            ) : (
              <>
                <p
                  style={{
                    color: "white",
                    fontSize: "1.2em",
                    textAlign: "center",
                  }}
                >
                  Ciao {utente.displayName}
                </p>
              </>
            )}
          </div>
          <p
            style={{
              color: "white",
              fontSize: "1.2em",
              textAlign: "center",
            }}
          >
            <br />
          </p>
        </div>
      </header>
      <section id={`section1`} className={`sezione1`}>
        {url === "" ? (
          <span>Carico...</span>
        ) : (
          <React.Fragment>
            <div
              className="row"
              style={{
                paddingTop: "50px",
              }}
            >
              <div className="col-md">
                <PDFViewer
                  document={{
                    url: url,
                  }}
                  hideNavbar={false}
                  scale={scala}
                  navigation={{
                    css: {
                      previousPageBtn: "mr-2 mt-1 mb-1 btn btn-danger", // CSS Class for the previous page button
                      nextPageBtn: "ml-2 mt-1 mb-1 btn btn-success", // CSS Class for the next page button
                      wrapper:
                        "bg-secondary border text-white rounded-lg border-primary",
                    },
                  }}
                />
              </div>
              <div
                style={{
                  paddingLeft: "10px",
                }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(_) => {
                    cambiaScala(scala + 0.025);
                  }}
                >
                  &nbsp; + &nbsp;
                </button>
              </div>
              <div
                style={{
                  paddingLeft: "10px",
                }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(_) => {
                    cambiaScala(scala - 0.025);
                  }}
                >
                  &nbsp; - &nbsp;
                </button>
              </div>
              <div className="col-xs-2"> </div>
            </div>
          </React.Fragment>
        )}
        <div
          style={{
            height: "80px",
          }}
        ></div>
      </section>
    </React.Fragment>
  );
}

export default MostraRiassunto;
/*            <PDFViewer
              document={{
                base64: riassunto.txt
              }}
              sacle="1.1"
            />

      



*/

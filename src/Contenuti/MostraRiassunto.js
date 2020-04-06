import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "../App.css";
import $ from "jquery";
import Brand from "../NavBar/Foto/Brand";
import MenuIcon from "../NavBar/Elementi/MenuIcon";
import PDFViewer from "mgr-pdf-viewer-react";
import Valutazione from "../Util/Valutazione.js";

function MostraRiassunto(props) {
  let [linkFoto, cambiaLink] = useState("");
  let [scala, cambiaScala] = useState(1);

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
    let riassuntoJSON = {};
    let idRiassunto = props.match.params.id;

    async function prendiRiassunto() {
      riassuntoJSON = await fetch(
        `https://vps.lellovitiello.tk/Riassunty/API/riassunto.php?id=${idRiassunto}`
        //`http://localhost/~davidevitiello/Riassunty/API/riassunto.php?id=${idRiassunto}`
      );

      riassuntoJSON = await riassuntoJSON.json();
      riassuntoJSON = riassuntoJSON[0];

      //riassuntoJSON.txt = dataURLtoFile(riassuntoJSON.txt);
      //debugger;

      let oggettoDaMettere = {
        testo: riassuntoJSON,
        data: new Date(),
      };
      cambiaRiassunto(riassuntoJSON);
      try {
        localStorage.setItem(idRiassunto, JSON.stringify(oggettoDaMettere));
      } catch (error) {
        console.error("Impossibile inserire nel local storage", error);
      }

      $("#loadingImage").fadeOut(500);
    }
    $("#loadingImage").fadeIn(500);

    let a = localStorage.getItem(idRiassunto);

    if (a !== null) {
      a = JSON.parse(a);
      cambiaRiassunto(a.testo);
      $("#loadingImage").fadeOut(500);
      //rimuoviRiassuntiVecchi();
      return;
    }

    prendiRiassunto();
  };

  function rimuoviRiassuntiVecchi() {
    let elementiLocali = allStorage();
    let data = new Date();
    for (let elemento of elementiLocali) {
      let differenza = data.getTime() - elemento.getTime();
    }
  }

  function allStorage() {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }

    return values;
  }

  const [riassunto, cambiaRiassunto] = useState([]);

  useEffect(fetchRiassunto, [props.location.pathname]);

  if (typeof riassunto === "undefined") {
    return <Redirect to="/" />;
  }
  return (
    <React.Fragment>
      <header>
        <nav>
          <Brand link={linkFoto} />{" "}
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
            </div>{" "}
            <ul> </ul>{" "}
          </div>{" "}
        </nav>{" "}
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
            Caricato il {riassunto.DataPubblicazione} <br />
            <br />
            Scorri per vedere <br />
            <br />
            Clicca + per incrementare lo zoom, clicca - per diminuire lo zoom{" "}
            <br />
            <br />
            Per una maggiore esperienza, gira il telefono{" "}
          </p>{" "}
          <Valutazione idRiassunto={props.match.params.id} />{" "}
        </div>{" "}
      </header>{" "}
      <section id={`section1`} className={`sezione1`}>
        {" "}
        {typeof riassunto.txt === "undefined" ? (
          <span> Caricamento </span>
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
                    base64: riassunto.txt,
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
                />{" "}
              </div>{" "}
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
                  & nbsp; + & nbsp;{" "}
                </button>{" "}
              </div>{" "}
              <div
                style={{
                  paddingLeft: "10px",
                }}
              >
                {" "}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(_) => {
                    cambiaScala(scala - 0.025);
                  }}
                >
                  & nbsp; - & nbsp;{" "}
                </button>{" "}
              </div>{" "}
              <div className="col-xs-2"> </div>{" "}
            </div>{" "}
          </React.Fragment>
        )}{" "}
        <div
          style={{
            height: "80px",
          }}
        >
          {" "}
        </div>{" "}
      </section>{" "}
    </React.Fragment>
  );
}

export default MostraRiassunto;
/*            <PDFViewer
              document={{
                base64: riassunto.txt
              }}
              sacle="1.1"
            />{" "}

      



*/

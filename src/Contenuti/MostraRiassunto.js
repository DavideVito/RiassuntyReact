import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "../App.css";
import $ from "jquery";
import Brand from "../NavBar/Foto/Brand";
import MenuIcon from "../NavBar/Elementi/MenuIcon";
import PDFViewer from "pdf-viewer-reactjs";

function MostraRiassunto(props) {
  let [linkFoto, cambiaLink] = useState("");

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

  const [riassunto, cambiaRiassunto] = useState([]);
  const fetchRiassunto = () => {
    let riassuntoJSON = {};
    let idRiassunto = props.match.params.id;

    async function prendiRiassunto() {
      riassuntoJSON = await fetch(
        `https://vps.lellovitiello.tk/Riassunty/API/riassunto.php?id=${idRiassunto}`
      );

      riassuntoJSON = await riassuntoJSON.json();
      riassuntoJSON = riassuntoJSON[0];
      cambiaRiassunto(riassuntoJSON);
      $("#loadingImage").fadeOut(500);
    }
    $("#loadingImage").fadeIn(500);
    prendiRiassunto();
  };

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
                      opacity: "0.7"
                    },
                    300
                  );
                } else {
                  $("#main").animate(
                    {
                      left: "0px",
                      opacity: "1"
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
      </header>{" "}
      <section id={`section1`} className={`sezione1`}>
        {" "}
        {typeof riassunto.txt === "undefined" ? (
          <span> Caricamento </span>
        ) : (
          <div>
            <PDFViewer
              document={{
                base64: riassunto.txt
              }}
              sacle="1.1"
            />{" "}
          </div>
        )}{" "}
      </section>{" "}
    </React.Fragment>
  );
}

export default MostraRiassunto;
/*

      <div className="container-fluid">
        <label class="pure-material-slider" style={{ width: "100%" }}>
          <input
            type="range"
            min="0.1"
            defaultValue="1"
            step="0.01"
            max="1.53"
            onChange={e => {
              let scala = e.target.value;
              console.log(scala);

              $("#iframe").css({
                "-webkit-transform": `scale(${scala})`,
                transform: `scale(${scala})`
              });
            }}
          />
          <span style={{ color: "white", textAlign: "center" }}>
            Seleziona il livello di zoom
          </span>
        </label>
      </div>



*/

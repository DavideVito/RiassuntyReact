import React, {
  useEffect,
  useState
} from "react";
import $ from "jquery";
import ReCAPTCHA from "react-google-recaptcha";
import "../App.css";

import ProgressBar from "react-percent-bar";

function CaricaRiassunto(props) {
  let anni = [];
  let [percentualeCaricamento, cambiaPercentualeCaricamento] = useState(0);
  let [indirizzi, cambiaIndirizzi] = useState([]);
  let [materie, cambiaMaterie] = useState([]);
  let [ok, cambiaOK] = useState(false);

  useEffect(() => {
    if (ok === false) {
      document.getElementById("bottoneSubmit").disabled = true;
      $("#bottoneSubmit").css({
        cursor: "default",
      });
    } else {
      document.getElementById("bottoneSubmit").disabled = false;

      $("#bottoneSubmit").css({
        cursor: "pointer",
      });
    }
  }, [window.location.href, ok]);

  const controllaValidita = () => {
    $.ajax({

      //url: "http://localhost/~davidevitiello/Riassunty/API/controllaValidita.php",
      url: "https://vps.lellovitiello.tk/Riassunty/API/controllaValidita.php",
      //url: "http://192.168.1.130/Riassunty/API/controllaValidita.php",
      method: "POST",
      data: {
        token: sessionStorage.token,
      },
      success: (data) => {
        if (data.valido === false) {
          window.location.href = "/Login";
        }
      },
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
      let ind = indirizzi[0].Indirizzo;
      cambiaIndirizzi(indirizzi);

      prendiMaterie(ind);
    };

    getIndirizzi();
  };

  useEffect(prendiIndirizzi, []);

  const prendiMaterie = (indirizzo) => {
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

  function onChange(value) {}
  $("#loadingImage").fadeOut(500, "swing");
  const caricaFile = async (e) => {
    if (!ok) {
      alert("Conferma il capthca");
    } else {
      e.preventDefault();
      let file = "";
      if (props.file) {
        file = props.file;
      } else {
        file = $("#file").prop("files")[0];
      }
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

      $("#formCaricamento").slideUp();

      $.ajax({
        //url: "http://localhost/~davidevitiello/Riassunty/API/caricaRiassunto.php", // point to server-side PHP script
        url: "https://vps.lellovitiello.tk/Riassunty/API/caricaRiassunto.php",
        //url: "http://192.168.1.130/Riassunty/API/caricaRiassunto.php",
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        type: "POST",
        success: (data) => {
          $("#section5").css({
            backgroundColor: "green",
            opacity: 0,
          });

          $("#section5").animate({
              opacity: 1,
            },
            750,
            () => {
              $("#section5").css({
                opacity: 1,
                backgroundColor: "#949121",
              });
            }
          );
          if (data.shouldRedirect === "true") {
            window.location.href = "/Login";
          }

          if (data === "N3000") {
            $("#section5").css({
              backgroundColor: "red",
              opacity: 0,
            });

            $("#section5").animate({
                opacity: 1,
              },
              750,
              () => {
                $("#section5").css({
                  opacity: 1,
                  backgroundColor: "#949121",
                });
              }
            );
          }
          $("#formCaricamento").slideDown();
          cambiaPercentualeCaricamento(0);
        },
        error: (data) => {
          $("#section5").css({
            backgroundColor: "red",
            opacity: 0,
          });

          $("#section5").animate({
              opacity: 1,
            },
            750,
            () => {
              $("#section5").css({
                opacity: 1,
                backgroundColor: "#949121",
              });
            }
          );
          if (data.responseText !== "OK") {
            $("#section5").css({
              backgroundColor: "red",
              opacity: 0,
            });

            $("#section5").animate({
                opacity: 1,
              },
              750,
              () => {
                $("#section5").css({
                  opacity: 1,
                  backgroundColor: "#949121",
                });
              }
            );
          }
          $("#formCaricamento").slideDown();
          cambiaPercentualeCaricamento(0);
        },
        xhr: function () {
          var xhr = new window.XMLHttpRequest();
          //Upload progress
          xhr.upload.addEventListener(
            "progress",
            function (evt) {
              if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                cambiaPercentualeCaricamento(percentComplete * 100);
              }
            },
            false
          );
          //Download progress
          xhr.addEventListener(
            "progress",
            function (evt) {
              if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
              }
            },
            false
          );
          return xhr;
        },
      });
    }
  };

  const stileDivisiore = {
    marginBottom: "30px",
  };

  let stile = {
    color: "white",
  };

  return ( <
    React.Fragment > {
      " "
    } <
    section id = "section5"
    className = "sezione5" >
    <
    div className = "container-fluid"
    style = {
      {
        textAlign: "center",
        marginTop: "100px",
      }
    } >
    <
    p style = {
      {
        fontSize: "20pt",
        fontWeight: "700",
        marginBottom: "40px",
      }
    } >
    Carica Riassunto {
      " "
    } <
    /p>{" "} <
    form onSubmit = {
      caricaFile
    }
    id = "formCaricamento" > {
      " "
    } {
      typeof props.renderSelezionaFile === "undefined" ? ( <
        React.Fragment >
        <
        div className = "row justify-content-center" >
        <
        input className = "form-control-file"
        type = "file"
        id = "file"
        name = "pdfDaCaricare"
        accept = ".pdf"
        required style = {
          {
            width: "auto",
            height: "auto",
            borderRadius: "0",
            //marginLeft: "50%"
          }
        }
        />{" "} < /
        div > {
          " "
        } <
        /React.Fragment>
      ) : ( <
        div style = {
          {
            opacity: 0,
          }
        } >
        <
        React.Fragment >
        <
        div className = "row justify-content-center" >
        <
        p > Seleziona il file < /p>{" "} < /
        div > {
          " "
        } <
        div className = "row justify-content-center" >
        <
        input className = "form-control-file"
        type = "file"
        id = "file"
        name = "pdfDaCaricare"
        accept = ".pdf"
        style = {
          {
            width: "auto",
            height: "auto",
            borderRadius: "0",
            //marginLeft: "50%"
          }
        }
        />{" "} < /
        div > {
          " "
        } <
        /React.Fragment>{" "} < /
        div >
      )
    } {
      " "
    } <
    div style = {
      stileDivisiore
    } > < /div>{" "} <
    div style = {
      stile
    } >
    <
    div className = "row justify-content-center" >
    <
    p > Seleziona l 'indirizzo</p>{" "} < /
    div > {
      " "
    } <
    div className = "row justify-content-center" >
    <
    select onChange = {
      (e) => {
        prendiMaterie(
          e.currentTarget.options[e.currentTarget.selectedIndex]
          .value
        );
      }
    }
    id = "indirizzo"
    required > {
      " "
    } {
      indirizzi.map((indirizzo) => {
        return ( <
          option value = {
            indirizzo.Indirizzo
          } > {
            " "
          } {
            indirizzo.Indirizzo
          } {
            " "
          } <
          /option>
        );
      })
    } {
      " "
    } <
    /select>{" "} < /
    div > {
      " "
    } <
    /div>{" "} <
    div style = {
      stileDivisiore
    } > < /div>{" "} <
    div style = {
      stile
    } >
    <
    div className = "row justify-content-center" >
    <
    p > Seleziona la materia < /p>{" "} < /
    div > {
      " "
    } <
    div className = "row justify-content-center" >
    <
    select required id = "materia" > {
      " "
    } {
      materie.map((materia) => {
        return ( <
          option value = {
            materia.IDMateria
          } > {
            " "
          } {
            materia.Materia
          } {
            " "
          } <
          /option>
        );
      })
    } {
      " "
    } <
    /select>{" "} < /
    div > {
      " "
    } <
    /div>{" "} <
    div style = {
      stileDivisiore
    } > < /div>{" "} <
    div style = {
      stile
    } >
    <
    div className = "row justify-content-center" >
    <
    p > Seleziona l 'anno</p>{" "} < /
    div > {
      " "
    } <
    div className = "row justify-content-center" >
    <
    select required id = "anno" > {
      " "
    } {
      anni.map((anno) => {
        return <option value = {
          anno
        } > {
          anno
        } < /option>;
      })
    } {
      " "
    } <
    /select>{" "} < /
    div > {
      " "
    } <
    /div>{" "} <
    div style = {
      stileDivisiore
    } > < /div>{" "} <
    div className = "row justify-content-center" >
    <
    ReCAPTCHA sitekey = "6LfWBeAUAAAAACEmmY5bn5jkl5MPHpmQbyX6yohU"
    onChange = {
      onChange
    }
    theme = "dark"
    badge = "bottomright"
    size = "compact"
    onChange = {
      () => {
        cambiaOK(true);
      }
    }
    onExpired = {
      () => {
        cambiaOK(false);
      }
    }
    />{" "} < /
    div > {
      " "
    } <
    div style = {
      stileDivisiore
    } > < /div>{" "} <
    div className = "row justify-content-center" >
    <
    button type = "submit"
    value = "Carica"
    className = "btn btn-primary mb-2"
    id = "bottoneSubmit"
    //onClick={caricaFile}
    >
    Carica {
      " "
    } <
    /button>{" "} < /
    div > {
      " "
    } <
    div style = {
      {
        height: "50px",
      }
    } > {
      " "
    } <
    /div>{" "} < /
    form > {
      " "
    } <
    div className = "row justify-content-center"
    style = {
      {
        paddingBottom: "80px",
      }
    } > {
      " "
    } {
      percentualeCaricamento !== 100 ? ( <
        ProgressBar colorShift = {
          false
        }
        fillColor = "#007bff"
        percent = {
          percentualeCaricamento
        }
        />
      ) : ( <
        p > Sto elaborando... < /p>
      )
    } {
      " "
    } <
    /div>{" "} < /
    div > {
      " "
    } <
    /section>{" "} < /
    React.Fragment >
  );
}

export default CaricaRiassunto;
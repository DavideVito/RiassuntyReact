import React, {
  useEffect,
  useState
} from "react";
import FullNavBar from "../NavBar/FullNavBar";
import $ from "jquery";
import "../App.css";

function RiassuntiDaApprovare(props) {
  let [riassuntiNonApprovati, cambiaRiassunti] = useState([]);

  const prendiRiassunti = () => {
    const getRiassunti = async () => {
      $.ajax({
        url: "https://vps.lellovitiello.tk/Riassunty/API/riassuntiNonApprovati.php",
        //"http://localhost/~davidevitiello/Riassunty/API/riassuntiNonApprovati.php",

        data: {
          token: sessionStorage.token
        },
        method: "GET",
        success: data => {
          if (data.shouldRedirect === "true") {
            window.location.href = "/Login";
          }
          cambiaRiassunti(data);
          $("#loadingImage").fadeOut(500, "swing");
          console.log("Anteprime", data);
        }
      });
    };
    getRiassunti();
  };

  useEffect(prendiRiassunti, [props.location.pathname]);

  const approvaRiassunto = evento => {
    let id = evento.currentTarget.id;
    $.ajax({
      url: "https://vps.lellovitiello.tk/Riassunty/API/approvaRiassunto.php", //"http://localhost/~davidevitiello/Riassunty/API/approvaRiassunto.php", //
      data: {
        id: id,
        token: sessionStorage.token
      },
      method: "POST",
      success: data => {
        if (data.shouldRedirect === "true") {
          window.location.href = "/Login";
        }
      }
    });
  };

  async function eliminaRiassunto(evento) {
    let data = new FormData();

    data.append("id", evento.currentTarget.id);
    let rispostaFetch = await fetch(
      "https://vps.lellovitiello.tk/Riassunty/API/eliminaRiassunto.php", {
        method: "POST",
        body: data,
        credentials: "same-origin"
      }
    );
    if (rispostaFetch.shouldRedirect === "true") {
      window.location.href = "/Login";
    }
    console.log(rispostaFetch);
  }

  function a(arg) {
    console.log("ARG", arg);
    debugger;
  }

  let stile = {
    color: "white"
  };

  return ( <
    React.Fragment > {
      " "
    } <
    FullNavBar elementi = {
      [{
        nome: "Clicca sulla X per scartare un riassunto, sull'altro per approvare, Easy no?",
        dati: []
      }]
    }
    />{" "} <
    div > {
      " "
    } {
      riassuntiNonApprovati.map((riassunto, indice) => {
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
            riassunto.Titolo
          } < /p>{" "} <
          img src = {
            "https://vps.lellovitiello.tk/Riassunty/" +
            riassunto.URLImmagine
          }
          width = "300"
          height = "300" /
          >
          <
          /div>{" "} <
          div style = {
            stile
          }
          className = "col-md" >
          <
          p > Elimina < /p>{" "} <
          img id = {
            riassunto.ID
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
          />{" "} <
          /div>{" "} <
          div style = {
            stile
          }
          className = "col-md" >
          <
          p > Approva < /p>{" "} <
          img id = {
            riassunto.ID
          }
          style = {
            {
              cursor: "pointer"
            }
          }
          src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Green_tick.svg/1024px-Green_tick.svg.png"
          width = "50"
          height = "50"
          onClick = {
            approvaRiassunto
          }
          />{" "} <
          /div>{" "} <
          /div>{" "} <
          /div>
        );
      })
    } {
      " "
    } <
    /div>{" "} <
    /React.Fragment>
  );
}

/*

       {anteprime.map(anteprima => {
        return (
          <div>
            <div className="container-fluid row">
              <div style={stile} className="col-md">
                <p>{anteprima.Titolo}</p>
                <img
                  src={
                    "https://vps.lellovitiello.tk/Riassunty/" +
                    anteprima.URLImmagine
                  }
                  width="300"
                  height="300"
                />
              </div>
              <div style={stile} className="col-md">
                <p>Elimina</p>
                <img
                id={anteprima.ID}
                  style={{ cursor: "pointer" }}
                  src="https://img.icons8.com/flat_round/64/000000/delete-sign.png"
                  onClick={eliminaRiassunto}
                />
              </div>
            </div>
          </div>
        );
      })}


 */

export default RiassuntiDaApprovare;
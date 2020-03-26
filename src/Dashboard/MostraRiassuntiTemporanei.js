import React, { useEffect, useState } from "react";
import "../Util/DropDownMenu/DropDownMenu";
import "../App.css";
import $ from "jquery";
import DropDownMenu from "../Util/DropDownMenu/DropDownMenu";

function MostraRiassuntiTemporanei(props) {
  let [riassuntiTemporanei, cambiaRiassunti] = useState([]);

  const prendiRiassunti = () => {
    $.ajax({
      url: `http://localhost/~davidevitiello/Riassunty/API/getRiassuntiTemporanei.php`,
      // url: `https://vps.lellovitiello.tk/Riassunty/API/getRiassuntiTemporanei.php`,

      data: {
        token: sessionStorage.token
      },
      method: "POST",
      success: data => {
        console.log(data);
        cambiaRiassunti(data);
      }
    });
  };

  useEffect(prendiRiassunti, [props.account]);

  let stile = {
    color: "white"
  };

  return (
    <React.Fragment>
      {" "}
      {riassuntiTemporanei.map(riassuntoTemporaneo => {
        return (
          <div className="row">
            <div className="col-md-5"> </div>{" "}
            <div className="col-md">
              <div style={{ display: "inline" }}></div>
              <DropDownMenu
                nome={riassuntoTemporaneo.Nome}
                elementi={riassuntoTemporaneo.versioni}
              />
            </div>
            <div className="col-md-2"> </div>{" "}
          </div>
        );
      })}{" "}
    </React.Fragment>
  );
}

export default MostraRiassuntiTemporanei;

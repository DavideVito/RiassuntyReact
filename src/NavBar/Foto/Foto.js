import React from "react";
import "../../App.css";

function Foto() {
  const style = {
    height: "100%",
    width: "100%",
    borderRadius: "45%"
  };

  return ( <
    img src = "https://riassunty.altervista.org/logoBIANCO.jpg"
    alt = "Logo ITIS"
    style = {
      style
    }
    />
  );
}

export default Foto;
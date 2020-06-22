import React from "react";
import SearchBar from "../Util/SearchBar/SearchBar";
import Bottone from "../Util/Bottone";
import Carosello from "../Util/Carosello/Carosello";
import foto1 from "../Foto/foto1.jpg";
import foto2 from "../Foto/foto2.jpg";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const CaricaAndCerca = () => {
  let elementi = [
    { src: "https://biografieonline.it/img/bio/b/Benito_Mussolini.jpg" },
    {
      src:
        "https://images2.corriereobjects.it/methode_image/2018/09/08/Interni/Foto%20Interni%20-%20Trattate/BS01F11SCO_1933139F1-kZKE-U30201022121106IXC-1224x916@Corriere-Web-Sezioni-593x443.jpg?v=20180911164452",
    },
  ];
  let stileImmagine = { width: "50%", height: "50%" };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-1"></div>
        <div className="col-sm">
          <SearchBar />
          <Bottone
            TestoBottone="Per caricare un riassunto"
            link="/Login"
          />{" "}
        </div>
        <div className="col-sm-1"></div>
      </div>
    </div>
  );
};

export default CaricaAndCerca;
//<Carosello elementi={elementi} />

import React from "react";
import SearchBar from "../Util/SearchBar/SearchBar";
import Bottone from "../Util/Bottone";

const CaricaAndCerca = () => {
  return (
    <div>
      <SearchBar />
      <Bottone TestoBottone="Per caricare un riassunto" link="/Login" />{" "}
    </div>
  );
};

export default CaricaAndCerca;

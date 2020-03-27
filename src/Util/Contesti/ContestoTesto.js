import React, {
  useState,
  createContext
} from "react";

export const ContestoTesto = createContext();

export const TestoProvider = props => {
  let [testo, cambiaTesto] = useState("");

  return ( <
    ContestoTesto.Provider value = {
      [testo, cambiaTesto]
    } > {
      " "
    } {
      props.children
    } {
      " "
    } <
    /ContestoTesto.Provider>
  );
};
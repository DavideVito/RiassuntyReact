import React, { useState, createContext } from "react";

export const ContestoShowModalMenu = createContext();

export const ShowModalMenuProvider = props => {
  const [show, setShow] = useState(false);

  return (
    <ContestoShowModalMenu.Provider value={[show, setShow]}>
      {" "}
      {props.children}{" "}
    </ContestoShowModalMenu.Provider>
  );
};

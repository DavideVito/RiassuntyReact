import React, { useContext } from "react";

import { ContestoTesto } from "../Util/Contesti/ContestoTesto";

function A() {
  const [testo, cambiaTesto] = useContext(ContestoTesto);

  return <div>{testo}</div>;
}

export default A;

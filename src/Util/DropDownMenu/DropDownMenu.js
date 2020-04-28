import React from "react";

function DropDownMenu(props) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {props.nome}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {props.elementi.map((elemento) => {
          return (
            <a className="dropdown-item" href="#">
              {elemento.UltimaModifica}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default DropDownMenu;

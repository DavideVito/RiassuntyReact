import React from "react";
import "./stileFooter.css";

function Footer() {
  return (
    <React.Fragment>
      <div id="footer">
        <p> Una produzione: </p>
        <small>
          {" "}
          <a
            href="https://www.instagram.com/iamnotdavidevitiello/"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fab fa-instagram"> </i> Davide Vitiello,{" "}
          </a>{" "}
        </small>{" "}
        <small>
          <a
            href="https://www.instagram.com/tommasovincioni/"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fab fa-instagram"> </i> Tommaso Vincioni,
          </a>{" "}
        </small>
        <small> Stefano Mori, </small>
        <small> Francesco Emolo, </small>
        <small>
          {" "}
          <a
            href="https://www.instagram.com/btw.sam/"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fab fa-instagram"> </i> Samuele Rosi{" "}
          </a>
        </small>
        <p
          style={{
            textAling: "center",
            fontSize: "13pt"
          }}
        >
          Copyright ©: WmW (2019-2020-2021)
        </p>{" "}
      </div>{" "}
    </React.Fragment>
  );
}

export default Footer;

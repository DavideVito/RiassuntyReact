import React from "react";
import { a } from "react-router-dom";
import "./stileFooter.css";

function Footer(props) {
  console.log("Indirizzi pros", props);
  let oggethref = props.dati;

  return (
    <React.Fragment>
      <div id="footer">
        <a href="mailhref:moriste01@gmail.com">
          {" "}
          <p> Mail: moriste01 @gmail.com </p>
        </a>
        <small> In collaborazione con velarte </small>{" "}
        <p
          style={{
            textAling: "center",
            fontSize: "13pt"
          }}
        >
          Social:
        </p>{" "}
        <div
          style={{
            paddinghrefp: "10px"
          }}
        >
          <a href="https://it-it.facebook.com/adeccoitalia/" target="_blank">
            <i className="fab fa-facebook-square"> </i>{" "}
          </a>

          <a href="mailhref:moriste01@gmail.com" target="_blank">
            <i className="fa fa-envelope"> </i>{" "}
          </a>

          <a
            href="https://www.instagram.com/adeccoitaly/?hl=it"
            target="_blank"
          >
            <i className="fab fa-instagram"> </i>{" "}
          </a>

          <a href="https://www.pinterest.it/adeccousa/" target="_blank">
            <i className="fab fa-pinterest-squaree"> </i>{" "}
          </a>

          <a href="https://twitter.com/adeccogroupita" target="_blank">
            <i className="fab fa-twitter-square"> </i>{" "}
          </a>

          <a href="https://www.youtube.com/user/AdeccoItaliaTV" target="_blank">
            <i className="fab fa-youtube"> </i>{" "}
          </a>
        </div>{" "}
      </div>{" "}
    </React.Fragment>
  );
}

export default Footer;

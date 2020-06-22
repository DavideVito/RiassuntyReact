import React from "react";
import $ from "jquery";
import Carousel from "react-bootstrap/Carousel";

export default function Carosello(props) {
  if (!props.elementi) {
    return <></>;
  }

  return (
    <Carousel fade={true}>
      {props.elementi.map((elemento) => {
        return (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={elemento.src}
              alt="First slide"
            />
            {elemento.desc ? (
              <Carousel.Caption>{elemento.desc}</Carousel.Caption>
            ) : (
              <></>
            )}
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

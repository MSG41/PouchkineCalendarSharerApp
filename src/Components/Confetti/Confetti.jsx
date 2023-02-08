import React, { useState } from "react";
import styled from "styled-components";

const StyledConfetti = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const ConfettiPiece = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.color};
  transform: rotate(${(props) => props.rotate}deg);
`;

const Confetti = () => {
  const [confetti, setConfetti] = useState([]);

  const explodeConfetti = () => {
    setConfetti(
      Array.from({ length: 50 }, (_, index) => (
        <ConfettiPiece
          key={index}
          top={Math.floor(Math.random() * window.innerHeight)}
          left={Math.floor(Math.random() * window.innerWidth)}
          width={Math.floor(Math.random() * 20 + 10)}
          height={Math.floor(Math.random() * 20 + 10)}
          color={`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)})`}
          rotate={Math.floor(Math.random() * 360)}
        />
      ))
    );
  };

  return <StyledConfetti>{confetti}</StyledConfetti>;
};

export default Confetti;

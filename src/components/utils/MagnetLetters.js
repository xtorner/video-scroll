import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const LetterContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const Letter = styled.div`
  display: inline-block;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Word = styled.div`
  position: relative;
  text-align: center;
  width: fit-content;
  margin: 0 auto;
`;

const MagnetLetters = ({ text }) => {
  const [letters, setLetters] = useState([]);
  const wordRef = useRef();

  useEffect(() => {
    if (wordRef.current) {
      const wordWidth = wordRef.current.offsetWidth;
      const wordHeight = wordRef.current.offsetHeight;
      const letterContainers = wordRef.current.children;
      const lettersData = [];

      for (let i = 0; i < letterContainers.length; i++) {
        const letterContainer = letterContainers[i];
        const letter = letterContainer.children[0];
        const letterWidth = letter.offsetWidth;
        const letterHeight = letter.offsetHeight;
        const letterLeft = letterContainer.offsetLeft;
        const letterTop = letterContainer.offsetTop;

        lettersData.push({
          letter,
          letterWidth,
          letterHeight,
          letterLeft,
          letterTop,
          initialLeft: letterLeft,
          initialTop: letterTop,
        });
      }

      setLetters(lettersData);
    }
  }, [wordRef, setLetters]);

  const handleMouseMove = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    for (let i = 0; i < letters.length; i++) {
      const { letterWidth, letterHeight, initialLeft, initialTop } = letters[i];
      const centerX = initialLeft + letterWidth / 2;
      const centerY = initialTop + letterHeight / 2;
      const distance = calculateDistance(centerX, centerY, mouseX, mouseY);
      const maxDistance = Math.max(letterWidth, letterHeight);

      if (distance < maxDistance) {
        const angle = calculateAngle(centerX, centerY, mouseX, mouseY);
        const velocity = calculateVelocity(distance, maxDistance);
        const x = initialLeft + (velocity * Math.cos(angle) * maxDistance) / 2;
        const y = initialTop + (velocity * Math.sin(angle) * maxDistance) / 2;

        letters[i].letter.style.left = `${x}px`;
        letters[i].letter.style.top = `${y}px`;
      } else {
        letters[i].letter.style.left = `${initialLeft}px`;
        letters[i].letter.style.top = `${initialTop}px`;
      }
    }
  };

  return (
    <Word ref={wordRef} onMouseMove={handleMouseMove}>
      {text.split("").map((char, index) => (
        <LetterContainer key={index}>
          <Letter>{char}</Letter>
        </LetterContainer>
      ))}
    </Word>
  );
};

const calculateDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const calculateAngle = (x1, y1, x2, y2) => {
  return Math.atan2(y2 - y1, x2 - x1);
};

const calculateVelocity = (distance, maxDistance) => {
  return distance / maxDistance;
};

export default MagnetLetters;

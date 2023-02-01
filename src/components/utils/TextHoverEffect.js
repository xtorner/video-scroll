import React, { useState, useRef } from "react";

function useTextHoverEffect(initialText) {
  const [text, setText] = useState(initialText);
  const [hover, setHover] = useState(false);
  const textRef = useRef(null);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return {
    textRef,
    text,
    hover,
    handleMouseEnter,
    handleMouseLeave,
  };
}

function TextHoverEffect({ text }) {
  const { textRef, hover, handleMouseEnter, handleMouseLeave } =
    useTextHoverEffect(text);

  return (
    <div
      ref={textRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`text-effect ${hover ? "hovered" : ""}`}
    >
      <h2>{text}</h2>
    </div>
  );
}

export default TextHoverEffect;

import React, { useState, useEffect } from "react";

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i >= text.length) {
        clearInterval(typingInterval);
      }
    }, 150);
  }, [text]);

  return (
    <p
      dangerouslySetInnerHTML={{
        __html: displayedText.replace(/\n/g, "<br />"),
      }}
    />
  );
};

export default Typewriter;

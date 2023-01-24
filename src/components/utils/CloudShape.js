import React from "react";

const CloudShape = () => {
  return (
    <svg width="100%" height="100%">
      <path
        id="track"
        d="M50,50 C100,50 150,100 150,150 C100,200 50,250 50,200 C50,150 100,100 50,50 Z"
        fill="none"
        stroke="#333"
        strokeWidth="1"
      />
      <circle cx="50" cy="50" r="5" fill="#fff" stroke="#333" strokeWidth="1" />
      <animateMotion
        path="#track"
        dur="8s"
        repeatCount="indefinite"
        rotate="auto"
      >
        <circle
          cx="50"
          cy="50"
          r="5"
          fill="#fff"
          stroke="#333"
          strokeWidth="1"
        />
      </animateMotion>
    </svg>
  );
};

export default CloudShape;

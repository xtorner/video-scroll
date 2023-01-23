import React, { useState, useEffect } from "react";
import * as noise from "noisejs";

const BackgroundWithText = ({ children }) => {
  const [fill, setFill] = useState("white");
  const [cloudPoints, setCloudPoints] = useState([]);
  useEffect(() => {
    setFill(getRandomColor());
    createCloudShape();
  }, []);

  const createCloudShape = () => {
    const n = new noise.Noise(Math.random());
    let points = "";
    for (let a = 0; a < 8 * Math.PI; a += 0.005) {
      const x = 500 / 2 + (200 + 50 * n.perlin2(a, a)) * Math.cos(a);
      const y = 500 / 2 + (200 + 50 * n.perlin2(a, a)) * Math.sin(a);
      points += `${x},${y} `;
    }
    setCloudPoints(points);
  };

  return (
    <>
      <svg width="100%" height="100%">
        <path fill={fill} d={`M ${cloudPoints} Z`} />
      </svg>
      <div>{children}</div>
    </>
  );
};

const getRandomColor = () => {
  const colors = ["#ffffff"];
  let newFill = colors[Math.floor(Math.random() * colors.length)];
  return newFill;
};

export default BackgroundWithText;

import React, { useState, useEffect } from "react";
import * as noise from "noisejs";

const BackgroundWithText = ({ children }) => {
  const [fill, setFill] = useState("#F2F1F2");
  const [cloudPoints, setCloudPoints] = useState([]);
  useEffect(() => {
    setFill(getRandomColor());
    createCloudShape();
  }, []);

  const createCloudShape = () => {
    const n = new noise.Noise(Math.random());
    let points = "";
    for (let a = 0; a < 8 * Math.PI; a += 0.0015) {
      const x = 300 / 5 + 140 * n.perlin2(a, a) * Math.cos(a * a * Math.PI);
      const y = 60 / 0.98 + 60 * n.perlin2(a, a) * Math.sin(a * Math.sin(a));
      points += `${x},${y} `;
    }
    setCloudPoints(points);
  };

  return (
    <>
      <div className="child">{children}</div>
      <svg width="100%" height="100%" className="eseuve">
        <path fill={fill} d={`M ${cloudPoints} Z`} />
      </svg>
    </>
  );
};

const getRandomColor = () => {
  const color1 = "#f1f2f1";
  const color2 = "#f2f1f2";

  function blendColors(color1, color2, ratio = 0.5) {
    const color1Array = color1.match(/\w{2}/g).map((x) => parseInt(x, 16));
    const color2Array = color2.match(/\w{2}/g).map((x) => parseInt(x, 16));
    const blended = color1Array.map((c, i) =>
      Math.round(c + (color2Array[i] - c) * ratio)
    );
    return `#${blended.map((x) => x.toString(16).padStart(2, "0")).join("")}`;
  }

  const colors = Array.from({ length: 10 }, (_, i) =>
    blendColors(color1, color2, i / 10)
  );
  let newFill = colors[Math.floor(Math.random() * colors.length)];
  return newFill;
};

export default BackgroundWithText;
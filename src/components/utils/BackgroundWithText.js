import React, { useState, useEffect } from "react";
import noise from "noisejs";

const BackgroundWithText = ({ children }) => {
  const [fill, setFill] = useState(getGradientColor);
  const [cloudPoints, setCloudPoints] = useState([]);
  useEffect(() => {
    setFill(getGradientColor());
    createCloudShape();
  }, []);

  const createCloudShape = () => {
    const n = new noise.Noise(Math.random());
    let points = "";
    for (let a = 0; a < 8 * Math.PI; a += 0.005) {
      const x = 300 / 5 + 180 * n.perlin2(a, a) * Math.cos(a * a);
      const y = 60 / 0.98 + 130 * n.perlin2(a, a) * Math.sin(a * Math.sin(a));
      points += `${x.toFixed(2)},${y.toFixed(2)} `;
    }
    // console.log(points);
    setCloudPoints(points);
  };

  return (
    <>
      <div className="child">{children}</div>
      <svg width="100%" height="100%" className="eseuve" data-testid="eseuve">
        <defs>
          <linearGradient id="black-to-white" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#feeded" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        {cloudPoints && (
          <path fill={fill} d={`M ${cloudPoints} Z`} data-testid="path" />
        )}
      </svg>
    </>
  );
};

const getGradientColor = () => {
  return `url(#black-to-white)`;
};

export default BackgroundWithText;

import React, { useState, useEffect } from "react";

const BlockText = () => {
  const [circles, setCircles] = useState([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let elements = [];
    for (let i = 0; i < 10; i++) {
      elements.push({
        x: (window.innerWidth / 5) * i + window.innerWidth / 10,
        y: window.innerHeight / 2,
        dx: 0,
        dy: 0,
      });
    }
    setCircles(elements);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseMove = (event) => {
    setMouse({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    const updateCircles = () => {
      const updatedCircles = [];
      for (let i = 0; i < circles.length; i++) {
        let dx = mouse.x - circles[i].x;
        let dy = mouse.y - circles[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let totalForceX = 0;
        let totalForceY = 0;

        if (distance < 100) {
          const force = (100 - distance) / 10;
          const direction = {
            x: dx / distance,
            y: dy / distance,
          };
          totalForceX -= direction.x * force;
          totalForceY -= direction.y * force;
        }

        updatedCircles.push({
          x: circles[i].x + totalForceX,
          y: circles[i].y + totalForceY,
        });
      }
      setCircles(updatedCircles);
    };

    const animationFrame = requestAnimationFrame(updateCircles);
    return () => cancelAnimationFrame(animationFrame);
  });

  return (
    <div className="ball-container">
      {circles.map((circle, index) => (
        <div
          key={index}
          className="ball"
          style={{
            left: `${circle.x}px`,
            top: `${circle.y}px`,
          }}
        />
      ))}
    </div>
  );
};

export default BlockText;

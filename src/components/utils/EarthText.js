import React, { useState, useEffect } from "react";


const EarthText = () => {
  const [circles, setCircles] = useState([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let elements = [];
    for (let i = 0; i < 800; i++) {
      elements.push({
        x: Math.floor(Math.random() * window.innerWidth),
        y: Math.floor(Math.random() * window.innerHeight),
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
          const force = (10 - distance * 5) / 10;
          const direction = {
            x: dx / distance,
            y: dy / distance,
          };
          totalForceX += direction.x * force;
          totalForceY += direction.y * force;
        }

        for (let j = 0; j < circles.length; j++) {
          if (j !== i) {
            dx = circles[j].x - circles[i].x;
            dy = circles[j].y - circles[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 50) {
              const force = (50 - distance) / 2;
              const direction = {
                x: dx / distance,
                y: dy / distance,
              };
              totalForceX -= direction.x * force;
              totalForceY -= direction.y * force;
            }
          }
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
    <>
      <div className="ballcontainer">
        {circles.map((circle, index) => (
          <div
            key={index}
            className="circle"
            style={{
              left: `${circle.x}px`,
              top: `${circle.y}px`,
            }}
          />
        ))}
      </div>
      {/* <LoaderBlock /> */}
    </>
  );
};

export default EarthText;

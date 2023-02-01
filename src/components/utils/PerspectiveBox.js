import React, { useState, useEffect, useRef } from "react";

const Constrain = 500;

const PerspectiveBox = ({ children, ...props }) => {
  console.log(props.data);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [xy, setXY] = useState([0, 0]);
  const ex1LayerRef = useRef(null);

  const transforms = (x, y, el) => {
    let box = el.getBoundingClientRect();
    let calcX = -(y - box.y - box.height / 2) / Constrain;
    let calcY = (x - box.x - box.width / 2) / Constrain;

    return `perspective(100px) rotateX(${calcX}deg) rotateY(${calcY}deg)`;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isMouseOver) {
        setXY([e.clientX, e.clientY]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMouseOver]);

  useEffect(() => {
    if (isMouseOver) {
      ex1LayerRef.current.style.transform = transforms(
        ...xy,
        ex1LayerRef.current
      );
    }
  }, [isMouseOver, xy]);

  return (
    <div
      id="ex1"
      className={`container3d`}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div id="ex1-layer" className={`${props.data} box3d`} ref={ex1LayerRef}>
        {children}
      </div>
    </div>
  );
};

export default PerspectiveBox;

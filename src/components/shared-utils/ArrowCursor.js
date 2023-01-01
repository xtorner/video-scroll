import React, { useRef, useEffect } from "react";

function ArrowCursor() {
  const cursorEl = useRef(null);
  let prevX = 0;
  let prevY = 0;

  useEffect(() => {
    const handleMouseMove = (event) => {
      const deltaX = event.clientX - prevX;
      const deltaY = event.clientY - prevY;
      const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
      cursorEl.current.style.transform = `rotate(${angle}deg)`;
      prevX = event.clientX;
      prevY = event.clientY;
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div ref={cursorEl} className="cursor" />;
}
export default ArrowCursor;

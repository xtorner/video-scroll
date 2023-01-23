import React, { useState } from "react";

function ImageCarousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  };

  const handleNextClick = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <button onClick={handlePrevClick}>&lt;</button>
      <button onClick={handleNextClick}>&gt;</button>
      <div>
        {images.map((image, index) => (
          <span
            key={image}
            onClick={() => handleDotClick(index)}
            style={{
              background: activeIndex === index ? "black" : "white",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              display: "inline-block",
              marginRight: "5px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
export default ImageCarousel;

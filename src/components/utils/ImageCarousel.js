import React, { useState, useEffect } from "react";

function ImageCarousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [description, setDescription] = useState(images[0].desc);

  useEffect(() => {
    const newDescription = images[activeIndex].desc;
    setDescription(newDescription);
  }, [activeIndex, images]);

  const handlePrevClick = () => {
    setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  };

  const handleNextClick = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  return (
    <div className="image-carousel">
      <div className="slide-container">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`slide ${activeIndex === index ? "active" : ""}`}
          >
            <div className="text">{image.text}</div>
            <img src={image.src} alt="" />
          </div>
        ))}
      </div>

      <div className="text-slide-container">
        <div className="controls">
          <button onClick={handlePrevClick}>&lt;</button>
          <button onClick={handleNextClick}>&gt;</button>
        </div>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
    </div>
  );
}

export default ImageCarousel;

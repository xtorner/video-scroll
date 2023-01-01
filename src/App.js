import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import video from "./vid.mp4";
function App() {
  const [progress, setProgress] = useState(0);
  const videoEl = useRef(null);
  // const cursorEl = useRef(null);
  const handleLoadedData = () => {
    setProgress((videoEl.current.duration / 100) * progress);
  };
  const handleTimeUpdate = () => {
    setProgress((videoEl.current.currentTime / videoEl.current.duration) * 100);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      videoEl.current.currentTime = scrollPos / 10;
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     cursorEl.current.style.top = `${event.clientY}px`;
  //     cursorEl.current.style.left = `${event.clientX}px`;
  //     cursorEl.current.style.opacity = `${event.clientY / 1000}`;
  //   };
  //   document.addEventListener("mousemove", handleMouseMove);
  //   return () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

  return (
    <>
      <div className="container"></div>
      {/* <div className="cursor" ref={cursorEl}></div> */}

      <div className="video-screen">
        <progress value={progress} max="100" className="progress-bar" />
        <video
          ref={videoEl}
          src={video}
          onLoadedData={handleLoadedData}
          onTimeUpdate={handleTimeUpdate}
        />
      </div>
      <section className="section">Section Uno</section>
      <section className="section">Section Dos</section>
    </>
  );
}

export default App;

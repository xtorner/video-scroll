import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import video from "./vid.mp4";
import { NavLink } from "react-bootstrap";
function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoEl = useRef(null);

  const handleLoadedData = () => {
    setIsLoaded(true);

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

  return (
    <>
      <div className="area-top">
        <progress value={progress} max="100" className="progress-bar" />

        <nav className="container navbar navbar-expand-lg">
          <NavLink className="navbar-brand" href="#">
            <img src="/img/logo.png" width="50" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <NavLink className="nav-link" href="#"></NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" href="#"></NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" href="#"></NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="video-screen">
        <video
          preload="auto"
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

import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import video from "./vid.mp4";
import { NavLink } from "react-bootstrap";
import useWindowResize from "./components/hooks/windowresize";
function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoEl = useRef(null);

  const handleLoadedData = () => {
    setProgress((videoEl.current.duration / 100) * progress);
  };

  const handleTimeUpdate = () => {
    let taim = (videoEl.current.currentTime / videoEl.current.duration) * 100;
    if (videoEl.current.currentTime === videoEl.current.duration)
      setIsVideoVisible(true);
    else if (taim === 0) setIsVideoVisible(false);
    setProgress(taim);
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

  useWindowResize(videoEl);
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
                <NavLink className="nav-link" href="#">
                  The Platform
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" href="#">
                  Plans
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" href="#">
                  Company
                </NavLink>
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
          width="100%"
          height="100%"
          className={isVideoVisible ? `free` : `stuck`}
          onLoadedData={handleLoadedData}
          onTimeUpdate={handleTimeUpdate}
        />
      </div>
      <section className="section section-1">
        <div className="card w-100">1</div>
      </section>
      <section className="section section-2">2</section>
      <section className="section section-2">3</section>
      <section className="section section-2">4</section>
      <section className="section section-2">5</section>
    </>
  );
}

export default App;

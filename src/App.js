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
    const handleScroll = (event) => {
      console.log(window.scrollY);
      const scrollPos = window.scrollY / 10.5;
      //const scrollVelocity = videoEl.current.scrollTop / event.deltaY;
      videoEl.current.currentTime = scrollPos / 10;
      //videoEl.current.currentTime = scrollVelocity / 2;
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
      <div className="static-info-1">
        <p>
          Empower your child with a 21st-century education to succeed in the age
          of AI.
        </p>
      </div>
      <section className="section section-0">
        <div>
          <h2>The Platform</h2>
          <h3>What we offer</h3>
          <ul>
            <li>Mastery of AI technology</li>
            <li>
              Learn the ethical implications of AI and the importance of
              responsible use of technology
            </li>
            <li>
              Educational resources tailored for students between the ages of 12
              and 17 years old
            </li>
          </ul>
          <p></p>
        </div>
      </section>
      <section className="section section-1">
        <div>
          <h2>The Platform</h2>
          <h3>What we do</h3>
          <ul>
            <li>Fun and effective learning along with Kod and Aiki</li>
            <li>
              Project-based learning by solving real cases relevant to students'
              lives
            </li>
            <li>Learning by doing and being actively involved</li>
          </ul>
          <p></p>
        </div>
      </section>
      <section className="section section-1-2">
        <div>
          <h2>Plans</h2>
          <h3>What we do</h3>
          <ul>
            <li>
              Tailor-made plans according to the needs of your educational
              institution (B2B)
            </li>
            <li>
              Become a user of our educational platform and become part of a
              worldwide community of entrepreneurs (B2C)
            </li>
          </ul>
          <p></p>
        </div>
      </section>
      <section className="section section-1-3">
        <div>
          <h2>About Us</h2>
          <h3> </h3>

          <p>
            AI is present every day in our lives: from choosing songs in your
            music app to recognizing your face on your cell phone. And yet,
            children and parents do not understand how these technological tools
            work and their possibilities and impact on society, the economy, and
            our lives in general. The goal of AIKreate is to provide our
            students, ages 12-17, with a set of skills to understand what AI is
            and how AI models, their algorithms, and the data that feed them are
            built. Programming and technology skills will make a difference in
            the future. Most of today's jobs will be replaced by new ones.
            AIKreate wants to positively influence your children's future so
            that they have a future with better opportunities. Your children
            will thank you for introducing them to 21st-century language
            learning at an early age. We believe that teenagers need a platform
            where they feel safe, free from advertising and distractions, with
            easy-to-follow and fun content
          </p>
        </div>
      </section>
      <section className="section section-1-4">FIFTH LAYOUT</section>

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
        <div className="scroll-warn">
          <span>Scroll Down</span>
        </div>
      </div>
      <section className="section section-2"></section>
    </>
  );
}

export default App;

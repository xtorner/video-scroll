import React, { useState, useRef, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import video from "./assets/vid.mp4";
import { NavLink } from "react-bootstrap";
import useWindowResize from "./components/hooks/windowresize";
import LoaderBlock from "./components/utils/loader-block/LoaderBlock";
import BackgroundWithText from "./components/utils/BackgroundWithText";
import ImageCarousel from "./components/utils/ImageCarousel";
// import SmokeScene from "./components/utils/smoke/Smoke";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [classFooter, setClassFooter] = useState("section-footer-blocked");
  const videoEl = useRef(null);
  const footer = useRef(null);
  const [elements, setElements] = useState({
    element1: true,
    element2: false,
    element3: false,
    element4: false,
    element5: false,
    element6: false,
  });
  const anchor1Ref = useRef(null);
  const anchor2Ref = useRef(null);
  const anchor3Ref = useRef(null);

  const refs = new Map([
    ["anchor1", anchor1Ref],
    ["anchor2", anchor2Ref],
    ["anchor3", anchor3Ref],
  ]);

  const handleAnchor = (anchorId) => {
    const anchorRef = refs.get(anchorId);
    anchorRef.current.scrollIntoView({ behavior: "smooth" });
  };
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
    // 1 scroll down | 2 theplatform | 3 plans | 4
    const handleScroll = (event) => {
      console.log("scrollpos:", window.scrollY);
      let sY = window.scrollY;
      setElements({
        ...elements,
        element1: sY >= 0 && sY < 115 ? elements.element1 : !elements.element1,
        element2: sY > 150 && sY < 580 ? !elements.element2 : elements.element2,
        element3: sY > 680 && sY < 910 ? !elements.element3 : elements.element3,
        element4:
          sY > 875 && sY < 1180 ? !elements.element4 : elements.element4,
        element5:
          sY > 1150 && sY < 1400 ? !elements.element5 : elements.element5,
        element6: sY > 1410 ? !elements.element6 : elements.element6,
      });
      if (window.scrollY > 10) {
        const scrollPos = window.scrollY / 10.5;
        console.log(window.scrollY, videoEl.current.duration);
        //const scrollVelocity = videoEl.current.scrollTop / event.deltaY;
        videoEl.current.currentTime = scrollPos / 10;
        setClassFooter(
          window.scrollY > 1775
            ? "section-footer-free"
            : "section-footer-blocked"
        );

        //videoEl.current.currentTime = scrollVelocity / 2;
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   // Add event listener to disable right-click context menu
  //   document.addEventListener("contextmenu", (event) => event.preventDefault());
  // }, []);

  //useWindowResize(videoEl);

  const handleLoadVideo = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // simulate loading the entire app
    setTimeout(() => {
      setIsLoading(false);
      //videoEl.current.currentTime = 1;
    }, 3000);
  }, []);
  return (
    <>
      {isLoading ? (
        <>
          {/* <SmokeScene /> */}
          <LoaderBlock />
        </>
      ) : (
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
                    <NavLink
                      className="nav-link"
                      href="#anchor1"
                      onClick={() => handleAnchor("anchor1")}
                    >
                      The Platform
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      href="#anchor2"
                      onClick={() => handleAnchor("anchor2")}
                    >
                      Plans
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      href="#anchor3"
                      onClick={() => handleAnchor("anchor3")}
                    >
                      Company
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div
            className={`static-info-1 fade ${
              elements.element1 ? "visible" : "hidden"
            }`}
          >
            <h1>
              Empower your child
              <br />
              with a 21st-century education to <br />
              succeed in the age of AI
            </h1>
            <strong></strong>
            <div className="scroll-warn">
              <a href="#anchor1" onClick={() => handleAnchor("anchor1")}>
                Scroll down
              </a>

              <div className="arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  width="512"
                  height="512"
                >
                  <path d="M23.12,9.91,19.25,6a1,1,0,0,0-1.42,0h0a1,1,0,0,0,0,1.41L21.39,11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H21.45l-3.62,3.61a1,1,0,0,0,0,1.42h0a1,1,0,0,0,1.42,0l3.87-3.88A3,3,0,0,0,23.12,9.91Z" />
                </svg>
              </div>
            </div>
          </div>
          <div
            className={
              isVideoVisible ? ` video-screen stuck` : `video-screen free`
            }
          >
            <video
              preload="auto"
              ref={videoEl}
              src={video}
              width="100%"
              height="100%"
              onLoadedData={handleLoadedData}
              onTimeUpdate={handleTimeUpdate}
            />
          </div>
          <div ref={anchor1Ref} id="anchor1" className="anchor1"></div>
          <section
            className={`section section-platform fade ${
              elements.element2 ? "visible" : "hidden"
            }`}
          >
            <BackgroundWithText>
              <h2>The Platform</h2>
              <div>
                <h3>What we offer</h3>
                <ul>
                  <li>Mastery of AI technology</li>
                  <li>
                    Learn the ethical implications of AI and the importance of
                    responsible use of technology
                  </li>
                  <li>
                    Educational resources tailored for students between the ages
                    of 12 and 17 years old
                  </li>
                </ul>
                <br />
                <h3>What we do</h3>
                <ul>
                  <li>Fun and effective learning along with Kod and Aiki</li>
                  <li>
                    Project-based learning by solving real cases relevant to
                    students' lives
                  </li>
                  <li>Learning by doing and being actively involved</li>
                </ul>
              </div>
            </BackgroundWithText>
          </section>
          <div ref={anchor2Ref} id="anchor2" className="anchor2"></div>
          <section
            className={`section section-plans fade ${
              elements.element3 ? "visible" : "hidden"
            }`}
          >
            <BackgroundWithText>
              <h2>Plans</h2>
              <div className="paragraf">
                <p>
                  Tailor-made plans according to the needs of your educational
                  institution (B2B)
                </p>
                <p>
                  Become a user of our educational platform and become part of a
                  worldwide community of entrepreneurs (B2C)
                </p>

                <div className="carroussel">
                  <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                  </ul>
                </div>
              </div>
            </BackgroundWithText>
          </section>
          <div ref={anchor3Ref} id="anchor3" className="anchor3"></div>
          <section
            className={`section section-about-us fade ${
              elements.element4 ? "visible" : "hidden"
            }`}
          >
            <BackgroundWithText>
              <h2>About Us</h2>
              {/* <p>
                AI is present every day in our lives: from choosing songs in
                your music app to recognizing your face on your cell phone.
                <br />
                And yet, children and parents do not understand how these
                technological tools work and their possibilities and impact on
                society, the economy, and our lives in general.
                <br />
                The goal of AIKreate is to provide our students, ages 12-17,
                with a set of skills to understand what AI is and how AI models,
                their algorithms, and the data that feed them are built.
                <br />
                Programming and technology skills will make a difference in the
                future.
                <br />
                Most of today's jobs will be replaced by new ones.
                <br />
                AIKreate wants to positively influence your children's future so
                that they have a future with better opportunities.
                <br />
                Your children will thank you for introducing them to
                21st-century language learning at an early age. We believe that
                teenagers need a platform where they feel safe, free from
                advertising and distractions, with easy-to-follow and fun
                content.
              </p> */}
            </BackgroundWithText>
          </section>
          <section
            className={`section section-1-3 fade ${
              elements.element5 ? "visible" : "hidden"
            }`}
          >
            <BackgroundWithText>
              <h2>The Team</h2>
              <p>PARALEL IMAGE CARROUSSEL</p>
              <ImageCarousel
                images={[
                  "cursor.png",
                  "cursor.png",
                  "cursor.png",
                  "cursor.png",
                ]}
              ></ImageCarousel>
            </BackgroundWithText>
          </section>
          <section
            className={`section section-1-4 fade ${
              elements.element6 ? "visible" : "hidden"
            }`}
          >
            <BackgroundWithText>
              <h2>Contact Us</h2>

              <p>CONTACT FORM</p>
            </BackgroundWithText>
          </section>
          <section className="section section-1-5">
            <div className={classFooter} ref={footer}>
              <footer>
                <div className="container">
                  <ul>
                    <li>
                      <p className="footer-claim">
                        Our mission
                        <br />
                        This company was created to educate young people between
                        the ages of 12 and 17 in AI. The idea came both from the
                        experience of teaching AI for several years in high
                        schools and with the dream of spreading this knowledge
                        around the world
                      </p>
                    </li>
                    <li>
                      <h3>THE PLATFORM</h3>
                      <p>
                        <a href="#whatweoffer">What we offer</a>
                      </p>
                      <p>
                        <a href="#whatwedo">What we do</a>
                      </p>
                    </li>
                    <li>
                      <h3>PLANS</h3>
                    </li>
                    <li>
                      <h3>COMPANY</h3>
                      <p>
                        <a href="#about-us">About Us</a>
                      </p>
                      <p>
                        <a href="#the-team">The Team</a>
                      </p>
                      <p>
                        <a href="#contact-us">Contact Us</a>
                      </p>
                    </li>
                    <li>
                      <h3>RESOURCES</h3>
                      <p>
                        <a href="#blog">Blog</a>
                      </p>
                    </li>
                  </ul>
                </div>
              </footer>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default App;

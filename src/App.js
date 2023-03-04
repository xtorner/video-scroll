import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import video from "./assets/vid.mp4";
import { NavLink } from "react-bootstrap";
import useWindowResize from "./components/hooks/windowresize";
import LoaderBlock from "./components/utils/loader-block/LoaderBlock";
import BackgroundWithText from "./components/utils/BackgroundWithText";
import ImageCarousel from "./components/utils/ImageCarousel";
import CarrouselData from "./components/utils/CarrouselData";
import Typewriter from "./components/utils/Typewriter";
import TextHoverEffect from "./components/utils/TextHoverEffect";
import PerspectiveBox from "./components/utils/PerspectiveBox";
import Modal from "./components/utils/Modal";

import legalNoticeHTML from "./components/html/LegalNotice.js";

import PlatformHTML from "./components/html/ThePlatformHTML";
import AboutUsHTML from "./components/html/AboutUsHTML";
import PlansHTML from "./components/html/PlansHTML";
const Anchor = React.forwardRef((props, ref) => <div ref={ref} {...props} />);

const VideoComponent = React.forwardRef((props, ref) => (
  <video
    playsInline
    muted
    preload="auto"
    ref={ref}
    src={props.video}
    width="100%"
    height="100%"
    onLoadedData={props.handleLoadedData}
    onTimeUpdate={props.handleTimeUpdate}
  />
));

function App() {
  const isEdge = /Edge/.test(navigator.userAgent);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [classFooter, setClassFooter] = useState("section-footer-blocked");
  const videoEl = useRef(null);
  const footer = useRef(null);
  const plansHtmlRef = useRef(null);
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
  const anchor4Ref = useRef(null);
  const anchor5Ref = useRef(null);

  const refs = new Map([
    ["anchor1", anchor1Ref],
    ["anchor2", anchor2Ref],
    ["anchor3", anchor3Ref],
    ["anchor4", anchor4Ref],
    ["anchor5", anchor5Ref],
  ]);

  const handleClickSubscribeNewsletter = (event) => {
    console.log(event);
    handleAnchor("anchor5");
  };

  const handleAnchor = (anchorId) => {
    const anchorRef = refs.get(anchorId);
    // console.log(anchorRef);
    anchorRef.current.scrollIntoView({
      alignToTop: true,
      behavior: "smooth",
      duration: 6000,
    });
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
    // // eslint-disable-next-line import/no-webpack-loader-syntax
    // 1 scroll down | 2 theplatform | 3 plans | 4
    const handleScroll = (event) => {
      handleTimeUpdate();
      let sY = window.scrollY;
      setElements({
        ...elements,
        element1: sY < 115 ? elements.element1 : !elements.element1,
        element2: sY > 150 && sY < 580 ? !elements.element2 : elements.element2,
        element3: sY > 660 && sY < 860 ? !elements.element3 : elements.element3,
        element4:
          sY > 860 && sY < 1130 ? !elements.element4 : elements.element4,
        element5:
          sY > 1150 && sY < 1400 ? !elements.element5 : elements.element5,
        element6: sY > 1410 ? !elements.element6 : elements.element6,
      });
      if (window.scrollY > 10) {
        const scrollPos = window.scrollY / 10.5;
        // console.log(window.scrollY, videoEl.current.duration);
        videoEl.current.currentTime = scrollPos / 10;
        const endScroll = isEdge ? 1780 : 1600;
        setClassFooter(
          window.scrollY > endScroll
            ? "section-footer-free"
            : "section-footer-blocked"
        );
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    // Add event listener to disable right-click context menu
    // document.addEventListener("contextmenu", (event) => event.preventDefault());
  }, []);

  useWindowResize(videoEl);

  // const handleLoadVideo = () => {
  //   setIsLoading(false);
  // };

  useEffect(() => {
    // simulate loading the entire app
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  useLayoutEffect(() => {
    const currentHTML = plansHtmlRef.current;
    console.log(currentHTML);
    if (!!currentHTML) {
      currentHTML.addEventListener("click", handleClickSubscribeNewsletter);

      return () => {
        currentHTML.removeEventListener(
          "click",
          handleClickSubscribeNewsletter
        );
      };
    }
  }, [plansHtmlRef.current]);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const handleSubmitContact = (e) => {
    e.preventDefault();
    const { emailcontact, namecontact, messagecontact } = e.target;
    const dataObject = {
      emailcontact: emailcontact.value,
      namecontact: namecontact.value,
      messagecontact: messagecontact.value,
      browser: navigator.userAgent,
    };
  };
  const handleSubmitSubscribe = (e) => {
    e.preventDefault();
    const { emailsubscribe } = e.target;
    const dataObject = {
      emailsubscribe: emailsubscribe.value,
      browser: navigator.userAgent,
    };
  };

  return (
    <>
      {isLoading ? (
        <>
          <LoaderBlock />
        </>
      ) : (
        <div className="container-fluid">
          <Modal
            isOpen={showModal}
            onClose={toggleModal}
            className="section-legal"
          >
            <PerspectiveBox
              initialPosition={[0, 0]}
              data="section-platform-color"
            >
              <div
                className="content-legal"
                dangerouslySetInnerHTML={{ __html: legalNoticeHTML }}
              />
            </PerspectiveBox>
          </Modal>
          <div className="area-top">
            <progress value={progress} max="100" className="progress-bar" />
            <nav className="container navbar navbar-expand-lg">
              <NavLink className="navbar-brand" href="#">
                <img src="/img/logo.png" width="50" alt="" />
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
                      <TextHoverEffect text="The Platform" />
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      href="#anchor2"
                      onClick={() => handleAnchor("anchor2")}
                    >
                      <TextHoverEffect text="Plans" />
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      href="#anchor3"
                      onClick={() => handleAnchor("anchor3")}
                    >
                      <TextHoverEffect text="Company" />
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <section
            className={`static-info-1 section fade ${
              elements.element1 ? "visible" : "hidden"
            }`}
          >
            <PerspectiveBox
              initialPosition={[-0.5, 2.4]}
              data="typewriter sectonx"
            >
              <Typewriter
                text="Empower your child
              with a 21st-century education
              to 
              succeed in the age of AI "
              ></Typewriter>
            </PerspectiveBox>

            {/* <BlockText /> 
              <MagnetLetters text="proves" />*/}
            <div
              className="scroll-warn"
              onClick={() => handleAnchor("anchor1")}
            >
              <span>Scroll down</span>

              <div className="arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  width="25"
                  height="25"
                >
                  <path d="M23.12,9.91,19.25,6a1,1,0,0,0-1.42,0h0a1,1,0,0,0,0,1.41L21.39,11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H21.45l-3.62,3.61a1,1,0,0,0,0,1.42h0a1,1,0,0,0,1.42,0l3.87-3.88A3,3,0,0,0,23.12,9.91Z" />
                </svg>
              </div>
            </div>
          </section>
          <div
            className={
              isVideoVisible ? ` video-screen stuck` : `video-screen free`
            }
          >
            <VideoComponent video={video} ref={videoEl} />
          </div>
          <Anchor ref={anchor1Ref} id="anchor1" className="anchor1" />
          <section
            className={`section section-platform fade ${
              elements.element2 ? "visible" : "hidden"
            }`}
          >
            <PerspectiveBox
              initialPosition={[-0.5, 1.4]}
              data="section-platform-color sectionx"
            >
              <BackgroundWithText>
                <h2>The Platform</h2>
                <div className="platform-wrapper">
                  <PlatformHTML />
                </div>
              </BackgroundWithText>
            </PerspectiveBox>
          </section>
          <Anchor ref={anchor2Ref} id="anchor2" className="anchor2" />
          <section
            className={`section section-plans fade ${
              elements.element3 ? "visible" : "hidden"
            }`}
          >
            <PerspectiveBox
              initialPosition={[-0.48, -0.28]}
              data="section-plans-color sectionx"
            >
              <BackgroundWithText>
                <h2>Plans</h2>
                <div className="plans-wrapper" ref={plansHtmlRef}>
                  <PlansHTML />
                </div>
              </BackgroundWithText>
            </PerspectiveBox>
          </section>
          <Anchor ref={anchor3Ref} id="anchor3" className="anchor3" />
          <section
            className={`section section-about-us fade ${
              elements.element4 ? "visible" : "hidden"
            }`}
          >
            <PerspectiveBox
              initialPosition={[-1.1, 1]}
              data="section-about-color sectionx"
            >
              <BackgroundWithText>
                <h2>About Us</h2>

                <div className="plans-wrapper">
                  <AboutUsHTML />
                </div>
              </BackgroundWithText>
            </PerspectiveBox>
          </section>
          <Anchor ref={anchor4Ref} id="anchor4" className="anchor4" />
          <section
            className={`section section-theteam fade ${
              elements.element5 ? "visible" : "hidden"
            }`}
          >
            <PerspectiveBox
              initialPosition={[0, 0]}
              data="section-theteam-color sectionx"
            >
              <BackgroundWithText>
                <h2>The Team</h2>
                <div className="carrousel-theteam">
                  <ImageCarousel images={CarrouselData}></ImageCarousel>
                </div>
              </BackgroundWithText>
            </PerspectiveBox>
          </section>
          <Anchor ref={anchor5Ref} id="anchor5" className="anchor5" />
          <section
            className={`section section-contact fade ${
              elements.element6 ? "visible" : "hidden"
            }`}
          >
            <PerspectiveBox
              initialPosition={[-0.36, 0.58]}
              data="section-contact-color sectionx"
            >
              <BackgroundWithText>
                <h2>Contact Us</h2>

                <div className="form-wrapper">
                  <form onSubmit={handleSubmitContact}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="namecontact"
                            className="name-contact input"
                            required
                          />
                          <label htmlFor="name-contact">Your Name:</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="email"
                            id="emailcontact"
                            className="email-contact input"
                            required
                          />
                          <label htmlFor="email-contact">Your Email</label>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <textarea
                            type="textarea"
                            id="messagecontact"
                            className="message-contact textarea"
                            required
                          />
                          <label htmlFor="message-contact">Your Message:</label>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="checkbox"
                            id="contactcheck"
                            required
                            className="checkbox"
                          />
                          <label htmlFor="legalcheck">
                            I have read and accept the Privacy Policy.
                          </label>
                        </div>
                      </div>
                      <div className="col-md-12 button-contact">
                        <button type="submit" className="button">
                          SEND
                        </button>
                      </div>
                    </div>
                    {/* <div className='row  button-flip-wrapper'>
                                  <input className="checkbox1" type="checkbox" id="reg-log1" name="reg-log1" />
                                  <label htmlFor="reg-log1" onClick={ switchModeHandler } />
                                </div> */}
                  </form>
                </div>
              </BackgroundWithText>
            </PerspectiveBox>
          </section>
          <section
            className={`section section-subscribe fade ${
              elements.element6 ? "visible" : "hidden"
            }`}
          >
            <PerspectiveBox
              initialPosition={[0.3, -0.58]}
              data="section-subscribe-color sectionx"
            >
              <BackgroundWithText>
                <h4>Newsletter Subscribe</h4>

                <div className="form-wrapper">
                  <div className="row">
                    <form onSubmit={handleSubmitSubscribe}>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="email"
                            id="emailsubscribe"
                            className="input"
                            required
                          />
                          <label htmlFor="input">Your Email</label>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="checkbox"
                            id="subscribecheck"
                            required
                            className="checkbox"
                          />
                          <label htmlFor="legalcheck">
                            I have read and accept the Privacy Policy.
                          </label>
                        </div>
                      </div>

                      {/* <div className="col-md-6">
                      <input type="text" placeholder="Your Email:" />
                    </div>

                    <div className="col-md-12">
                      <textarea type="text" placeholder="Your Message:" />
                    </div>
*/}
                      <div className="col-md-12 button-contact">
                        <button type="submit" className="button">
                          SUBSCRIBE
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </BackgroundWithText>
            </PerspectiveBox>
          </section>
          <section className="section-legal section-legal-color"></section>
          <section className="section section-1-5">
            <Anchor className={classFooter} ref={footer}>
              <footer>
                <div className="container">
                  <ul>
                    <li>
                      <p className="footer-claim">
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
                      <p>
                        <a
                          href="#plans"
                          onClick={() => handleAnchor("anchor2")}
                        >
                          Educational institutions
                        </a>
                      </p>
                      <p>
                        <a
                          href="#plans"
                          onClick={() => handleAnchor("anchor2")}
                        >
                          School students
                        </a>
                      </p>
                    </li>
                    <li>
                      <h3>COMPANY</h3>
                      <p>
                        <a
                          href="#anchor3"
                          onClick={() => handleAnchor("anchor3")}
                        >
                          About Us
                        </a>
                      </p>
                      <p>
                        <a
                          href="#anchor4"
                          onClick={() => handleAnchor("anchor4")}
                        >
                          The Team
                        </a>
                      </p>
                      <p>
                        <a
                          href="#anchor5"
                          onClick={() => handleAnchor("anchor5")}
                        >
                          Contact Us
                        </a>
                      </p>
                      <p>
                        <a href="#anchor5" onClick={toggleModal}>
                          Legal Note & Privacy Policy
                        </a>
                      </p>
                    </li>
                    {/* <li>
                      <h3>RESOURCES</h3>
                      <p>
                        <a href="#blog">Blog</a>
                      </p>
                    </li> */}
                  </ul>
                </div>
              </footer>
            </Anchor>
          </section>
        </div>
      )}
    </>
  );
}

export default App;

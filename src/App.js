import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import video from "./assets/vid2.mp4";
//import video1 from "./assets/vid.mp4";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { NavLink } from "react-bootstrap";

/** COMPONENT HOOKS */
import useWindowResize from "./components/hooks/windowresize";
import BackgroundWithText from "./components/utils/BackgroundWithText";
import Typewriter from "./components/utils/Typewriter";
import TextHoverEffect from "./components/utils/TextHoverEffect";
import PerspectiveBox from "./components/utils/PerspectiveBox";

/** UTILS */
import Modal from "./components/utils/Modal";

/** EXTERNAL HTML COMPONENTS */
import LegalNoticeHTML from "./components/html/LegalNoticeHTML";
import PlatformHTML from "./components/html/ThePlatformHTML";
import AboutUsHTML from "./components/html/AboutUsHTML";
import PlansHTML from "./components/html/PlansHTML";
import LoaderBlock from "./components/utils/loader-block/LoaderBlock";
import ImageCarousel from "./components/utils/ImageCarousel";
import CarrouselData from "./components/utils/CarrouselData";
import MenuDropdown from "./components/utils/MenuDropdown";

/** COMPONENTS */

const Anchor = React.forwardRef((props, ref) => <div ref={ref} {...props} />);

const VideoComponent = React.forwardRef(
  ({ video, handleLoadedData, handleTimeUpdate }, ref) => (
    <video
      playsInline
      muted
      preload="metadata"
      ref={ref}
      src={video}
      width="100%"
      height="100%"
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
    />
  )
);

function App() {
  const isEdge = /Edge/.test(navigator.userAgent);

  /** BASIC STATE CONTROL */
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [classFooter, setClassFooter] = useState("section-footer-blocked");
  const [elements, setElements] = useState({
    element1: true,
    element2: false,
    element3: false,
    element4: false,
    element5: false,
    element6: false,
  });

  const [activeOption, setActiveOption] = useState(null);

  const menuOptions = [
    {
      name: "The Platform",
      subOptions: [
        { name: "What we do", anchor: "anchor1" },
        { name: "What we offer", anchor: "anchor1" },
      ],
    },
    {
      name: "Plans",
    },
    {
      name: "Company",
      subOptions: [{ name: "Option 4", anchor: "anchor4" }],
    },
  ];

  const toggleMenu = (optionName) => {
    setActiveOption((prevOption) =>
      prevOption === optionName ? null : optionName
    );
    toggleMenu(optionName);
  };

  /** DIFERED REFERENCES */
  const videoEl = useRef(null);
  const footer = useRef(null);
  const plansHtmlRef = useRef(null);

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

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  // This function handles clicking on the subscribe button to subscribe user to the newsletter
  const handleClickSubscribeNewsletter = (event) => {
    handleAnchor("anchor5");
  };

  // The function scrolls into view an element in the document with the given anchorId,
  // This ensures that the webpage automatically scrolls down or up to the position of the targeted HTMLElement.
  const handleAnchor = (anchorId) => {
    const anchorRef = refs.get(anchorId);
    anchorRef.current.scrollIntoView({
      alignToTop: true,
      behavior: "smooth",
      duration: 6000,
    });
  };

  const handleLoadedData = () => {
    setProgress((videoEl.current.duration / 100) * progress);
  };

  // This function handles the time update event of a video
  const handleTimeUpdate = () => {
    // calculate progress of the video
    let taim = (videoEl.current.currentTime / videoEl.current.duration) * 100;
    // check if the end of the video is reached, and set the value of the visibility state accordingly
    if (videoEl.current.currentTime === videoEl.current.duration)
      setIsVideoVisible(true);
    // check if the current time of the video is at the beginning, and set the value of the visibility state accordingly
    else if (taim === 0) setIsVideoVisible(false);
    // update the progress state with the calculated progress value
    setProgress(taim);
    // handle loaded data, possibly for additional functionality
    handleLoadedData();
  };

  // Run the handleScroll function when the component loads
  useEffect(() => {
    // Define a callback function for the window scroll event
    const handleScroll = (event) => {
      // Call the handleTimeUpdate function
      handleTimeUpdate();
      // Store the current Y scrolling position in 'sY'
      let sY = window.scrollY;
      // Update elements object by changing the value of its properties based on the current scrolling position
      setElements({
        ...elements,
        element1: sY < 115 ? elements.element1 : !elements.element1,
        element2: sY > 176 && sY < 380 ? !elements.element2 : elements.element2,
        element3: sY > 500 && sY < 760 ? !elements.element3 : elements.element3,
        element4:
          sY > 760 && sY < 1130 ? !elements.element4 : elements.element4,
        element5:
          sY > 1150 && sY < 1400 ? !elements.element5 : elements.element5,
        element6: sY > 1410 ? !elements.element6 : elements.element6,
      });
      // If the user scrolls more than 2 pixels (this is just a tr¡ck)
      if (window.scrollY > 0) {
        // Calculate the current scroll position relative to the video duration and update the video's current time
        const scrollPos = window.scrollY / 10.5;
        videoEl.current.currentTime = scrollPos / 10;
        // Determine the end of the section that differs on Edge Browser and update the classFooter state based on whether the section is fully scrolled
        const endScroll = isEdge ? 1780 : 1600;
        setClassFooter(
          window.scrollY > endScroll
            ? "section-footer-free"
            : "section-footer-blocked"
        );
      }
    };
    // Add the event listener to the window to trigger the handleScroll function when the user scrolls
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unloads
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    //Add event listener to disable right-click context menu
    //document.addEventListener("contextmenu", (event) => event.preventDefault());
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

  // Excecutes the following function after every completed render cycle
  useLayoutEffect(() => {
    // Get ref to HTML element associated with plansHtmlRef
    const currentHTML = plansHtmlRef.current;

    // Conditional statement to check if ref is valid
    if (!!currentHTML) {
      // Attach a click event listener on the extracted HTML element (to handle clicks on subscribe)
      currentHTML.addEventListener("click", handleClickSubscribeNewsletter);

      // Return function to remove event listener when unmounting the component or updating props
      return () => {
        currentHTML.removeEventListener(
          "click",
          handleClickSubscribeNewsletter
        );
      };
    }
    // Specifying plansHtmlRef.current as a useEffect dependency will cause this block of code to execute where the
    // references to the callback and plansHtml elements are set up by causing a new effect to hook up after the reference update.
  }, [plansHtmlRef.current]);

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
              <div className="content-legal">
                <LegalNoticeHTML />
              </div>
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
                {/* <MenuDropdown
                  menuOptions={menuOptions}
                  toggleMenu={toggleMenu}
                  NavLink={NavLink}
                  activeOption={activeOption}
                  setActiveOption={setActiveOption}
                  handleAnchor={handleAnchor}
                /> */}

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
            className={`static-info-1 sectionx fade ${
              elements.element1 ? "visible" : "hidden"
            }`}
          >
            <PerspectiveBox initialPosition={[-0.5, 2.4]} data="typewriter">
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
                            name="contactcheck"
                            required
                            className="checkbox"
                          />
                          <label htmlFor="contactcheck">
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
                            name="emailsubscribe"
                            className="input"
                            required
                          />
                          <label htmlFor="emailsubscribe">Your Email</label>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="checkbox"
                            id="legalcheck"
                            name="legalcheck"
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
                        <a
                          href="#whatweoffer"
                          onClick={() => handleAnchor("anchor1")}
                        >
                          What we offer
                        </a>
                      </p>
                      <p>
                        <a
                          href="#whatwedo"
                          onClick={() => handleAnchor("anchor1")}
                        >
                          What we do
                        </a>
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

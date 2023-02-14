import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import video from "./assets/vid.mp4";
import { NavLink } from "react-bootstrap";
import useWindowResize from "./components/hooks/windowresize";
import LoaderBlock from "./components/utils/loader-block/LoaderBlock";
import BackgroundWithText from "./components/utils/BackgroundWithText";
import ImageCarousel from "./components/utils/ImageCarousel";
import Typewriter from "./components/utils/Typewriter";
import TextHoverEffect from "./components/utils/TextHoverEffect";
import PerspectiveBox from "./components/utils/PerspectiveBox";
import Modal from "./components/utils/Modal";

// eslint-disable-next-line import/no-webpack-loader-syntax
import legalNoticeHTML from "raw-loader!./components/html/legal-notice.html";
// eslint-disable-next-line import/no-webpack-loader-syntax
import platformHTML from "raw-loader!./components/html/the-platform.html";
// eslint-disable-next-line import/no-webpack-loader-syntax
import aboutusHTML from "raw-loader!./components/html/about-us.html";
// eslint-disable-next-line import/no-webpack-loader-syntax
import plansHTML from "raw-loader!./components/html/plans.html";

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
    console.log(anchorRef);
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
    // 1 scroll down | 2 theplatform | 3 plans | 4
    const handleScroll = (event) => {
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
    console.log(window);
  };
  const handleSubmitSubscribe = (e) => {
    e.preventDefault();
    const { emailsubscribe } = e.target;
    const dataObject = {
      emailsubscribe: emailsubscribe.value,
      browser: navigator.userAgent,
    };
    console.log(window);
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
                <div
                  className="platform-wrapper"
                  dangerouslySetInnerHTML={{ __html: platformHTML }}
                ></div>
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
                <div
                  className="plans-wrapper"
                  ref={plansHtmlRef}
                  dangerouslySetInnerHTML={{ __html: plansHTML }}
                ></div>
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

                <div
                  className="plans-wrapper"
                  dangerouslySetInnerHTML={{ __html: aboutusHTML }}
                ></div>
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
              initialPosition={[0, 0.83]}
              data="section-theteam-color sectionx"
            >
              <BackgroundWithText>
                <h2>The Team</h2>
                <div className="carrousel-theteam">
                  <ImageCarousel
                    images={[
                      {
                        src: "img/team/MireiaTorello.jpg",
                        text: "Mireia Torello | Co-founder, CEO",
                        desc: `<strong>Investment Director and Research Director with more than 10 years of experience.</strong> <br /><br />Passionate in sustainability, ethics and the impact of artificial intelligence on youth.<br />Wide international research experience and scientific publications.<br />She holds an EMBA from IESE Business School and a PhD in Earth Sciences from James Cook University, Australia.
                      <br /><br /><a href="https://www.linkedin.com/in/mireia-torello-raventos/" class="icon-team"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" class="svg-inline--fa fa-linkedin icon-team" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>&nbsp;@mireia-torello-raventos</a><br />
                      <a href="https://twitter.com/TorelloRaventos" class="icon-team"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" class="svg-inline--fa fa-twitter  icon-team" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path></svg>&nbsp;@TorelloRaventos</a>`,
                      },
                      {
                        src: "img/team/MarcOliveras.jpg",
                        text: "Marc Oliveras | Co-founder, Product & Learning Methodologies Director",
                        desc: `<strong>AI consultant and President of the Board of Trustees of the L’Horitzó School.<br />Director and teacher of the Artificial Intelligence project at this school.</strong><br /><br />He holds a Master's in Business Intelligence & Big Data from the UOC, a degree in Business Administration and Management & MBA from ESADE, and a PhD in Economics and Business from Ramon Llull University.<br />Passionate about education and pedagogy, his doctoral dissertation defines reflective knowledge and its influence on the modern economy.
                      <br /><br />
                      <a href="https://www.laguineueconomista.com" class="icon-team" ><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="globe" class="svg-inline--fa fa-globe " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M352 256C352 278.2 350.8 299.6 348.7 320H163.3C161.2 299.6 159.1 278.2 159.1 256C159.1 233.8 161.2 212.4 163.3 192H348.7C350.8 212.4 352 233.8 352 256zM503.9 192C509.2 212.5 512 233.9 512 256C512 278.1 509.2 299.5 503.9 320H380.8C382.9 299.4 384 277.1 384 256C384 234 382.9 212.6 380.8 192H503.9zM493.4 160H376.7C366.7 96.14 346.9 42.62 321.4 8.442C399.8 29.09 463.4 85.94 493.4 160zM344.3 160H167.7C173.8 123.6 183.2 91.38 194.7 65.35C205.2 41.74 216.9 24.61 228.2 13.81C239.4 3.178 248.7 0 256 0C263.3 0 272.6 3.178 283.8 13.81C295.1 24.61 306.8 41.74 317.3 65.35C328.8 91.38 338.2 123.6 344.3 160H344.3zM18.61 160C48.59 85.94 112.2 29.09 190.6 8.442C165.1 42.62 145.3 96.14 135.3 160H18.61zM131.2 192C129.1 212.6 127.1 234 127.1 256C127.1 277.1 129.1 299.4 131.2 320H8.065C2.8 299.5 0 278.1 0 256C0 233.9 2.8 212.5 8.065 192H131.2zM194.7 446.6C183.2 420.6 173.8 388.4 167.7 352H344.3C338.2 388.4 328.8 420.6 317.3 446.6C306.8 470.3 295.1 487.4 283.8 498.2C272.6 508.8 263.3 512 255.1 512C248.7 512 239.4 508.8 228.2 498.2C216.9 487.4 205.2 470.3 194.7 446.6H194.7zM190.6 503.6C112.2 482.9 48.59 426.1 18.61 352H135.3C145.3 415.9 165.1 469.4 190.6 503.6V503.6zM321.4 503.6C346.9 469.4 366.7 415.9 376.7 352H493.4C463.4 426.1 399.8 482.9 321.4 503.6V503.6z"></path></svg>laguineueconomista.com</a><br />
                      <a href="https://www.linkedin.com/in/marc-oliveras-ball%C3%BAs/" class="icon-team"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" class="svg-inline--fa fa-linkedin icon-team" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>&nbsp;@moliverasballus</a><br />
                      <a href="https://twitter.com/moliverasballus" class="icon-team"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" class="svg-inline--fa fa-twitter  icon-team" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path></svg>&nbsp;@moliverasballus</a>`,
                      },
                      {
                        src: "img/team/JosepCurto.jpg",
                        text: "Josep Curto | Co-founder, Product & Analytics Director",
                        desc: `<strong>Advisor, entrepreneur, data scientist, and professor.<br />Founder, AthenaCore.<br />Member of the advisory board at L’Horitzó School.<br /><br />Academic Director of the Master in Business Intelligence and Big Data Analytics (MIBA) at Universitat Oberta de Catalunya (UOC), associate professor at IE Business School</strong>, and casual lecturer at <strong>AGSM@UNSW</strong> where he gives lectures about <strong>responsible AI</strong>, <strong>data science</strong>, data governance</strong>, <strong>big data and data-driven strategies</strong> for future managers and developers. Josep holds a <strong>BSc (Hons) in Mathematics (UAB)</strong>, an <strong>MSc (Hons) in Business Intelligence (UOC)</strong>, and an <strong>MSc (Hons) in IT Management (UOC)</strong>, as well as a <strong>top tier MBA (IE Business School)</strong>. He is the author of numerous academic articles and books related to his professional experience.
                      <br /><br />
                      <a href="www.josepcurto.com" class="icon-team"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="globe" class="svg-inline--fa fa-globe " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M352 256C352 278.2 350.8 299.6 348.7 320H163.3C161.2 299.6 159.1 278.2 159.1 256C159.1 233.8 161.2 212.4 163.3 192H348.7C350.8 212.4 352 233.8 352 256zM503.9 192C509.2 212.5 512 233.9 512 256C512 278.1 509.2 299.5 503.9 320H380.8C382.9 299.4 384 277.1 384 256C384 234 382.9 212.6 380.8 192H503.9zM493.4 160H376.7C366.7 96.14 346.9 42.62 321.4 8.442C399.8 29.09 463.4 85.94 493.4 160zM344.3 160H167.7C173.8 123.6 183.2 91.38 194.7 65.35C205.2 41.74 216.9 24.61 228.2 13.81C239.4 3.178 248.7 0 256 0C263.3 0 272.6 3.178 283.8 13.81C295.1 24.61 306.8 41.74 317.3 65.35C328.8 91.38 338.2 123.6 344.3 160H344.3zM18.61 160C48.59 85.94 112.2 29.09 190.6 8.442C165.1 42.62 145.3 96.14 135.3 160H18.61zM131.2 192C129.1 212.6 127.1 234 127.1 256C127.1 277.1 129.1 299.4 131.2 320H8.065C2.8 299.5 0 278.1 0 256C0 233.9 2.8 212.5 8.065 192H131.2zM194.7 446.6C183.2 420.6 173.8 388.4 167.7 352H344.3C338.2 388.4 328.8 420.6 317.3 446.6C306.8 470.3 295.1 487.4 283.8 498.2C272.6 508.8 263.3 512 255.1 512C248.7 512 239.4 508.8 228.2 498.2C216.9 487.4 205.2 470.3 194.7 446.6H194.7zM190.6 503.6C112.2 482.9 48.59 426.1 18.61 352H135.3C145.3 415.9 165.1 469.4 190.6 503.6V503.6zM321.4 503.6C346.9 469.4 366.7 415.9 376.7 352H493.4C463.4 426.1 399.8 482.9 321.4 503.6V503.6z"></path></svg>www.josepcurto.com</a><br />
                      <a href="https://www.linkedin.com/in/josepcurto/" class="icon-team"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" class="svg-inline--fa fa-linkedin icon-team" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>&nbsp;@josepcurto</a><br />
                      <a href="https://twitter.com/josepcurto" class="icon-team"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" class="svg-inline--fa fa-twitter  icon-team" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path></svg>&nbsp;@josepcurto</a><br /><br />`,
                      },
                      {
                        src: "img/team/FrancescColome.jpg",
                        text: "Francesc Colome | Co-founder, Curriculum Director",
                        desc: "<strong>Member of the advisory board at L’Horitzó School</strong>.<br />He has a <strong>degree in Chemistry</strong> and has been, among other responsibilities, <strong>inspector of education</strong>, <strong>Director General of Vocational Training of the Ministry of Education</strong>, <strong>Secretary of Educational Policies of the Department of Education of the Generalitat</strong>, and <strong>Professor of Chemistry at the UAB</strong>.",
                      },
                      {
                        src: "img/team/DavidCabanillas.jpg",
                        text: "David Cabanillas | Co-founder, Content Director",
                        desc: "<strong>Data scientist and professor. <br />Member of AthenaCore, and professor at Universitat Oberta de Catalunya (UOC)</strong> where he gives lectures about data science. Data passionate with more than 10 experienced years.<br />Helping several companies to become data-driven organizations focused on identifying and creating efficient ways to collect, cleanse and maintain data, and providing decision intelligence insights (based on classification, scoring and propensity algorithms).<br />David holds <strong>Ph.D. in Artificial Intelligence (UPC)</strong>.",
                      },
                      {
                        src: "img/team/XaviTorner.jpg",
                        text: "Xavier Torner | Full Stack Engineer",
                        desc: `<strong>Computer Science Engineer</strong> with more than 20 years of experience related to web development and system administration.<br /><br />
As a <strong>Site Reliability Engineer (SRE)</strong>, is responsible of implementation and supervision of DevOps technologies and a cyber secure development infrastructure.`,
                      },
                    ]}
                  ></ImageCarousel>
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
                            id="legalcheck"
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
                            id="input"
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
                            id="legalcheck"
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

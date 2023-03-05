import { useEffect } from "react";

const useWindowResize = (videoEl) => {
  useEffect(() => {
    function handleResize() {
      let width = window.innerWidth;
      let height = window.innerHeight;
      let video = videoEl;

      video.current.style.width = width + "px";
      video.current.style.height = height + "px";
      video.current.style.margin = "0px";
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [videoEl]);
};
export default useWindowResize;

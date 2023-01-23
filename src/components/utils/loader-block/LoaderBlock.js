import { Boxes } from "./LoaderBlock.styled";

const LoaderBlock = () => {
  return (
    <>
      <Boxes>
        <h1>Welcome to AIKreate.</h1>
        <span>
          loading assets...
          <br />
          please wait
        </span>
        <div className="boxes">
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </Boxes>
    </>
  );
};
export default LoaderBlock;

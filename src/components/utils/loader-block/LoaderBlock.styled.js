import styled from "styled-components";

export const Boxes = styled.div`
  z-index: 8888;
  width: 100%;
  height: 100%;
  background-color: transparent;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    position: relative;
    width: 100%;
    top: -5rem;
    height: auto;
    display: flex;
    justify-content: center;
    align-content: center;
    color: #19191993;
    font-size: 1.2rem;
  }
  span {
    position: relative;
    top: -4.9rem;
    left: 0;
    font-size: 0.8rem;
    color: #18181835;
    text-align: center;
    width: 100%;
  }
  .boxes {
    --size: 32px;
    --duration: 800ms;
    height: calc(var(--size) * 2);
    width: calc(var(--size) * 3);
    position: relative;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform-origin: 50% 50%;
    -ms-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    margin-top: calc(var(--size) * 1.5 * -1);
    -webkit-transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg)
      translateZ(0px);
    transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
  }

  .boxes .box {
    width: var(--size);
    height: var(--size);
    top: 0;
    left: 0;
    position: absolute;

    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }

  .boxes .box:nth-child(1) {
    -webkit-transform: translate(100%, 0);
    -ms-transform: translate(100%, 0);
    transform: translate(100%, 0);
    -webkit-animation: box1 var(--duration) linear infinite;
    animation: box1 var(--duration) linear infinite;
  }

  .boxes .box:nth-child(2) {
    -webkit-transform: translate(0, 100%);
    -ms-transform: translate(0, 100%);
    transform: translate(0, 100%);
    -webkit-animation: box2 var(--duration) linear infinite;
    animation: box2 var(--duration) linear infinite;
  }

  .boxes .box:nth-child(3) {
    -webkit-transform: translate(100%, 100%);
    -ms-transform: translate(100%, 100%);
    transform: translate(100%, 100%);
    -webkit-animation: box3 var(--duration) linear infinite;
    animation: box3 var(--duration) linear infinite;
  }

  .boxes .box:nth-child(4) {
    -webkit-transform: translate(200%, 0);
    -ms-transform: translate(200%, 0);
    transform: translate(200%, 0);
    -webkit-animation: box4 var(--duration) linear infinite;
    animation: box4 var(--duration) linear infinite;
  }

  .boxes .box > div {
    --background: rgba(64, 110, 181);
    --top: auto;
    --right: auto;
    --bottom: auto;
    --left: auto;
    --translateZ: calc(var(--size) / 2);
    --rotateY: 0deg;
    --rotateX: 0deg;
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--background);
    top: var(--top);
    right: var(--right);
    bottom: var(--bottom);
    left: var(--left);
    -webkit-transform: rotateY(var(--rotateY)) rotateX(var(--rotateX))
      translateZ(var(--translateZ));
    transform: rotateY(var(--rotateY)) rotateX(var(--rotateX))
      translateZ(var(--translateZ));
    border-radius: 0.1rem;
  }

  .boxes .box > div:nth-child(1) {
    --top: 0;
    --left: 0;
    --background: rgba(64, 110, 181, 0.4);
  }

  .boxes .box > div:nth-child(2) {
    --background: rgba(64, 110, 181, 0.8);
    --right: 0;
    --rotateY: 90deg;
  }

  .boxes .box > div:nth-child(3) {
    --rotateX: -90deg;
    background: url("/img/logo.png") center/cover no-repeat;
  }

  .boxes .box > div:nth-child(4) {
    --background: rgba(64, 110, 181, 0.1);
    --top: 0;
    --left: 0;
    --translateZ: calc(var(--size) * 3 * -1);
    /* background: url("/img/logo.png") center/cover no-repeat; */
  }

  @-webkit-keyframes box1 {
    0%,
    50% {
      -webkit-transform: translate(100%, 0);
      transform: translate(100%, 0);
    }

    100% {
      -webkit-transform: translate(200%, 0);
      transform: translate(200%, 0);
    }
  }

  @keyframes box1 {
    0%,
    50% {
      -webkit-transform: translate(100%, 0);
      transform: translate(100%, 0);
    }

    100% {
      -webkit-transform: translate(200%, 0);
      transform: translate(200%, 0);
    }
  }

  @-webkit-keyframes box2 {
    0% {
      -webkit-transform: translate(0, 100%);
      transform: translate(0, 100%);
    }

    50% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }

    100% {
      -webkit-transform: translate(100%, 0);
      transform: translate(100%, 0);
    }
  }

  @keyframes box2 {
    0% {
      -webkit-transform: translate(0, 100%);
      transform: translate(0, 100%);
    }

    50% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }

    100% {
      -webkit-transform: translate(100%, 0);
      transform: translate(100%, 0);
    }
  }

  @-webkit-keyframes box3 {
    0%,
    50% {
      -webkit-transform: translate(100%, 100%);
      transform: translate(100%, 100%);
    }

    100% {
      -webkit-transform: translate(0, 100%);
      transform: translate(0, 100%);
    }
  }

  @keyframes box3 {
    0%,
    50% {
      -webkit-transform: translate(100%, 100%);
      transform: translate(100%, 100%);
    }

    100% {
      -webkit-transform: translate(0, 100%);
      transform: translate(0, 100%);
    }
  }

  @-webkit-keyframes box4 {
    0% {
      -webkit-transform: translate(200%, 0);
      transform: translate(200%, 0);
    }

    50% {
      -webkit-transform: translate(200%, 100%);
      transform: translate(200%, 100%);
    }

    100% {
      -webkit-transform: translate(100%, 100%);
      transform: translate(100%, 100%);
    }
  }

  @keyframes box4 {
    0% {
      -webkit-transform: translate(200%, 0);
      transform: translate(200%, 0);
    }

    50% {
      -webkit-transform: translate(200%, 100%);
      transform: translate(200%, 100%);
    }

    100% {
      -webkit-transform: translate(100%, 100%);
      transform: translate(100%, 100%);
    }
  }
`;

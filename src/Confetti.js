import React from "react";
import { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";

function Confetti() {
  const [windowDimension, setDimension] = useState({
    width: window.innerWidth,
    hight: window.innerHeight,
  });
  const [btn, setBtn] = useState(false);
  const detectSize = () => {
    setDimension({ width: window.innerWidth, hight: window.innerHeight });
  };
  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);
  return (
    <>
      <button
        onClick={() => {
          setBtn(!btn);
        }}
      >
        Confetti On
      </button>
      {btn && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.hight}
          tweenDuration={1000}
        />
      )}
    </>
  );
}

export default Confetti;

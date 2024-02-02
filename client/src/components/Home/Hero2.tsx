import React from "react";
import Plx from "react-plx";
import Image from "../../assets/hero2.svg";
import Atropos from "atropos/react";

const growParallaxData = [
  {
    start: 0,
    end: 500,
    properties: [
      {
        startValue: 0,
        endValue: 1,
        property: "scale",
      },
    ],
  },
];

const rotateParallaxData = [
  {
    start: 0,
    end: 500,
    properties: [
      {
        startValue: 150,
        endValue: 0,
        property: "rotate",
      },
    ],
  },
];

const Hero2 = () => {
  return (
    <div
      id="hero2"
      className="w-full my-8 flex justify-center py-20 px-16 h-screen text-white"
    >
      <div className="w-1/2 flex flex-col text-lg">
        <Plx
          parallaxData={growParallaxData}
          className="font-semibold text-[60px]"
        >
          <span className="font-bold text-blue-500 text-[80px] mr-4">Get</span>
          <Plx parallaxData={growParallaxData} className="inline-block">
            Started
          </Plx>
        </Plx>
        <Atropos
          activeOffset={40}
          shadowScale={1.05}
          onEnter={() => console.log("Enter")}
          onLeave={() => console.log("Leave")}
          onRotate={(x, y) => console.log("Rotate", x, y)}
          className="w-fit my-8 px-4 h-96 cursor-pointer"
        >
<ul className="steps steps-vertical my-8 accent">
          <li className="step step-primary">
            <Plx parallaxData={rotateParallaxData} className="inline-block">
              Register
            </Plx>
          </li>
          <li className="step step-primary">
            <Plx parallaxData={rotateParallaxData} className="inline-block">
              Create Classroom
            </Plx>
          </li>
          <li className="step">
            <Plx parallaxData={rotateParallaxData} className="inline-block">
              Add Students
            </Plx>
          </li>
          <li className="step">
            <Plx parallaxData={rotateParallaxData} className="inline-block">
              Add Assignments
            </Plx>
          </li>
          <li className="step">
            <Plx parallaxData={rotateParallaxData} className="inline-block">
              Done
            </Plx>
          </li>
        </ul>
        </Atropos>
        
      </div>
      <Plx
        parallaxData={rotateParallaxData}
        className="w-1/2 flex justify-center"
      >
        <Atropos
          activeOffset={40}
          shadowScale={1.05}
          onEnter={() => console.log("Enter")}
          onLeave={() => console.log("Leave")}
          onRotate={(x, y) => console.log("Rotate", x, y)}
          className="mx-auto h-96"
        >
          <img src={Image} alt="hero2" className="mx-auto h-96" />
        </Atropos>
      </Plx>
    </div>
  );
};

export default Hero2;

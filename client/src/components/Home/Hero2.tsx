import Plx from "react-plx";
import Image from "../../assets/hero2.svg";
import Atropos from "atropos/react";
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const handleGotoTop = () => {
    window.scrollTo(0, 0);
  };
  const handleGotoJoin = () => {
    window.scrollTo(0, 0);
    navigate("/signup");
  }
  return (
    <div
      id="hero2"
      className="w-full my-8 flex justify-center py-20 px-16 h-[700px] text-white"
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
          className="w-fit mt-8 px-4 h-96 cursor-pointer"
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

        <div className="flex">
          <Plx
            parallaxData={rotateParallaxData}
            onClick={handleGotoJoin}
            className="ml-8 py-3 px-4 gap-x-2 w-1/4 text-md font-semibold rounded-lg text-center cursor-pointer border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            Register
          </Plx>

          <Plx
            parallaxData={rotateParallaxData}
            onClick={handleGotoTop}
            className="ml-8 py-3 px-4 gap-x-2 w-1/4 text-md flex justify-center items-center font-semibold rounded-lg text-center cursor-pointer border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <FaArrowUp className="h-6 w-6 mr-2" />
            Top
          </Plx>
        </div>
      </div>
      <Plx
        parallaxData={rotateParallaxData}
        className="w-1/2 flex justify-center"
      >
        <Atropos
          activeOffset={70}
          shadowScale={1.05}
          onEnter={() => console.log("Enter")}
          onLeave={() => console.log("Leave")}
          onRotate={(x, y) => console.log("Rotate", x, y)}
          className="mx-auto h-[600px] overflow-visible"
        >
          <motion.img
            animate={["initial"]}
            variants={{
              initial: {
                y: [-20, 20],
                rotate: 0,
                transition: {
                  delay: 0.8,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.2,
                  repeatType: "reverse",
                },
              },
            }}
            src={Image}
            alt="hero2"
            className="mx-auto"
          />
        </Atropos>
      </Plx>
    </div>
  );
};

export default Hero2;

import Plx from "react-plx";
import Services from "./Services";
import { motion } from "framer-motion";

const divParallaxData = [
  {
    start: 0,
    end: 500,
    properties: [
      {
        startValue: 1,
        endValue: 2,
        property: "scale",
      },
    ],
  },
];

const paragraphParallaxData = [
  {
    start: 0,
    end: 500,
    properties: [
      {
        startValue: 1,
        endValue: 0,
        property: "opacity",
      },
    ],
  },
];

const Hero = () => {
  return (
    <Plx
      parallaxData={divParallaxData}
      className="flex text-white py-20 px-16 h-[700px]"
    >
      <div className="w-1/2 flex justify-center align-middle flex-col">
        <motion.h1
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-semibold text-[60px]"
        >
          <span className="font-bold text-blue-500 text-[80px] mr-4">
          सaarthi
          </span>
          Streamlining Assignments Simplifying
          <span className="text-blue-500 ml-4">Success!</span>
        </motion.h1>
        <motion.div
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Plx parallaxData={paragraphParallaxData} className="my-4">
            Effortless Assignment Management for Educators and Students Alike.{" "}
            <span className="text-blue-500 underline cursor-pointer">
              Learn More
            </span>
          </Plx>
        </motion.div>
        <motion.div
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a href="#hero2"
            type="button"
            className="my-4 py-3 px-4 gap-x-2 w-1/5 text-md font-semibold rounded-lg border border-transparent bg-blue-600/80 text-white hover:bg-blue-700/50 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            Get Started
          </a>
        </motion.div>
      </div>
      <div className="w-1/2 flex ">
        <Services />
      </div>
    </Plx>
  );
};

export default Hero;

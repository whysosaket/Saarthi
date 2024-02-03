import { FaArrowRight } from "react-icons/fa";
import Plx from "react-plx";
import { motion } from "framer-motion";

const items = [
  { name: "Automated Grading System", link: "/" },
  { name: "Feedback Mechanism", link: "/" },
  { name: "Real-time Progress Tracking", link: "/" },
  { name: "Plagiarism Detection", link: "/" },
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

const Menu = () => {
  return (
    <Plx parallaxData={paragraphParallaxData} className="my-4">
      <motion.ul
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="menu bg-base-200 lg:menu-horizontal rounded-box"
      >
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Inbox
            <span className="badge badge-sm">99+</span>
          </a>
        </li>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Updates
            <span className="badge badge-sm badge-warning">NEW</span>
          </a>
        </li>
        <li>
          <a>
            Stats
            <span className="badge badge-xs badge-info"></span>
          </a>
        </li>
      </motion.ul>
      <motion.div
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-900 mt-2 p-4 rounded-2xl"
      >
        {items.map((item, index) => (
          <motion.div
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + index / 10 }}
            key={index}
            className="bg-gray-800 px-3 py-2 rounded-3xl my-4 hover:bg-gray-700 cursor-pointer"
          >
            <h1 className="text-center font-semibold">
              {item.name}
              <FaArrowRight className="ml-2 inline-block hover:animate-pulse" />
            </h1>
          </motion.div>
        ))}
      </motion.div>
    </Plx>
  );
};

export default Menu;

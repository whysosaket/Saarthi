import Menu from "./Menu";
import {motion} from "framer-motion";

const Services = () => {
  return (
    <div className="w-full flex my-auto flex-col">
      <div className="mx-auto">
        <motion.h1
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl font-semibold text-center">
          Our
          <span className="ml-3 text-blue-500">Services</span>
        </motion.h1>
      </div>

      <div className="flex justify-center">
            <Menu />
      </div>
    </div>
  );
};

export default Services;

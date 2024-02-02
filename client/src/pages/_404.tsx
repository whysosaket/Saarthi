import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../assets/_404.svg";

const _404 = () => {
  return (
    <>
      <>
        <div
          className="flex items-center justify-center min-h-screen  bg-fixed bg-cover bg-bottom error-bg"
          style={{
            backgroundImage:
              'url(data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900"%3E%3Cpolygon fill="%23f0b608" points="957 450 539 900 1396 900"/%3E%3Cpolygon fill="%23e6d710" points="957 450 872.9 900 1396 900"/%3E%3Cpolygon fill="%23e7af05" points="-60 900 398 662 816 900"/%3E%3Cpolygon fill="%23e7d808" points="337 900 398 662 816 900"/%3E%3Cpolygon fill="%23d8a408" points="1203 546 1552 900 876 900"/%3E%3Cpolygon fill="%23f1e213" points="1203 546 1552 900 1162 900"/%3E%3Cpolygon fill="%23f0b607" points="641 695 886 900 367 900"/%3E%3Cpolygon fill="%23e4d506" points="587 900 641 695 886 900"/%3E%3Cpolygon fill="%23eab822" points="1710 900 1401 632 1096 900"/%3E%3Cpolygon fill="%23e8da14" points="1710 900 1401 632 1365 900"/%3E%3Cpolygon fill="%23e8b008" points="1210 900 971 687 725 900"/%3E%3Cpolygon fill="%23edde14" points="943 900 1210 900 971 687"/%3E%3C/svg%3E)',
          }}
        >
          <motion.img
            initial={{ y: 500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={Background}
            className="-z-10 fixed bottom-0"
          />

          <div className="container">
            <div className="row">
              <div className="col-sm-8 offset-sm-2 text-gray-50 text-center  p-6 -mt-52">
                <div className="relative">
                  <motion.h1
                    initial={{ x: -500, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative text-9xl tracking-tighter-less font-sans font-bold"
                  >
                    <span className="[text-shadow:_0_6px_0_rgb(55_48_163_/_40%)]">
                      404
                    </span>
                    {/* 404 */}
                  </motion.h1>
                </div>
                <motion.div
                  className=""
                  initial={{ x: 500, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h5 className="text-gray-200 font-semibold mt-3 [text-shadow:_1px_2px_0_rgb(0_0_0_/_40%)]">
                    Page not found
                  </h5>
                  <p className="text-gray-100 mt-2 mb-6 [text-shadow:_1px_2px_0_rgb(0_0_0_/_40%)]">
                    We are sorry, but the page you requested was not found
                  </p>
                </motion.div>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    to="/"
                    className="bg-blue-400 hover:bg-blue-600  px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg"
                  >
                    Got to Home
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        {/* <style 
    dangerouslySetInnerHTML={{
      __html:
        "\n\t.error-bg {\n\t\tbackground-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23f0b608' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23e6d710' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23e7af05' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23e7d808' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d8a408' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23f1e213' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23f0b607' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23e4d506' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23eab822' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23e8da14' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23e8b008' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23edde14' points='943 900 1210 900 971 687'/%3E%3C/svg%3E\");\n\t}\n\t.tracking-tighter-less {\n\t\tletter-spacing: -0.75rem;\n\t}\n\t.text-shadow {\n\t\ttext-shadow: -8px 0 0 rgb(102 123 242);\n\t}\n"
    }}
  /> */}
      </>
    </>
  );
};

export default _404;

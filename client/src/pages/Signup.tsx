import { Link } from "react-router-dom";
import SignupImage from "../assets/signup.svg";
import { motion } from "framer-motion";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Atropos } from "atropos/react";
import GlobalContext from "../context/GlobalContext";

const Signup = () => {

  const { toastMessage, signup } = useContext(GlobalContext);
  const navigate = useNavigate();

  // Creating refs to handle values
  const passwordref = useRef<HTMLInputElement>(null);
  const nameref = useRef<HTMLInputElement>(null);
  const emailref = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    const name: string = nameref.current?.value || "";
    const password: string = passwordref.current?.value || "";
    const email: string = emailref.current?.value || "";
    if (
      email == "" ||
      password == "" ||
      name == ""
    ) {
      toastMessage("Please fill all the fields to continue.", "danger");
      return;
    }
    const response = await signup(name, email, password);
    if(response){
      navigate("/login");
    }
  };

  return (
    <div>
      <>
        <motion.div
          initial={{ scaleY: 0.58 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.04 }}
          className="bg-gray-900 bg-opacity-0 flex items-center justify-center p-4 md:p-0"
        >
          <div className="bg-gray-900 bg-opacity-40 text-white shadow-xl w-full overflow-hidden rounded-3xl my-0 md:rounded-none">
            <div className="md:flex w-full">
              <motion.div
                initial={{ x: +500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/2 py-10 px-5 md:px-10"
              >
                <div className="text-center mb-10">
                  <h1 className="font-bold text-3xl text-white">REGISTER</h1>
                  <p>Enter your information to register</p>
                </div>
                <div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-3">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Name
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                        </div>
                        <input
                          type="text"
                          className="font-space w-full mt-1 -ml-10 pl-10 pr-3 py-2 rounded-3xl border-2 border-gray-200/10 outline-none focus:border-blue-500/50"
                          placeholder="John"
                          ref={nameref}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-3">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Email
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                        </div>
                        <input
                          type="email"
                          className="font-space w-full mt-1 -ml-10 pl-10 pr-3 py-2 rounded-3xl border-2 border-gray-200/10 outline-none focus:border-blue-500/50"
                          placeholder="johnsmith@example.com"
                          ref={emailref}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-10">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Password
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                        </div>
                        <input
                          type="password"
                          className="font-space w-full mt-1 -ml-10 pl-10 pr-3 py-2 rounded-3xl border-2 border-gray-200/10 outline-none focus:border-blue-500/50"
                          placeholder="************"
                          ref={passwordref}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <button
                        onClick={handleClick}
                        className="block w-full  max-w-xs mx-auto bg-blue-700/80 hover:bg-blue-700 focus:bg-blue-700 text-white rounded-3xl px-3 py-2 font-semibold"
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                  <h1 className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600">
                      Login
                    </Link>
                  </h1>
                </div>
              </motion.div>
              <motion.div
                initial={{ x: -500, rotateY: 180, opacity: 0 }}
                animate={{ x: 0, rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="hidden md:block w-1/2 bg-transparent py-10 px-10"
              >
                <Atropos
                  activeOffset={70}
                  shadowScale={1.05}
                  onEnter={() => console.log("Enter")}
                  onLeave={() => console.log("Leave")}
                  onRotate={(x, y) => console.log("Rotate", x, y)}
                  className="mx-auto "
                >
                  <img src={SignupImage} className="transform -scale-x-100" />
                </Atropos>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </>
    </div>
  );
};

export default Signup;

import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

// https://i.pinimg.com/1200x/4f/e7/11/4fe711959a0dd8c75c16debbeebb1f96.jpg

const Navbar = () => {

  const {isAuthenticated, handleLogout} = useContext(GlobalContext);
  const [top, setTop] = useState<boolean>(true);
  const navigate = useNavigate();

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  }  

  useEffect(() => {
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top])

  return (
    <>
      <header className={`header px-6 md:px-8 py-2 fixed dark:text-white top-0 flex items-center h-16 justify-between w-full z-30 bg-opacity-80 transition duration-300 ease-in-out ${!top ? 'bg-gray-900 backdrop-blur-sm shadow-lg text-white' : 'text-black'}`}>
        {/* logo */}
        <Link
          to="/"
          className="md:w-3/12 w-6/12 p-2 flex justify-start my-aut mt-0"
        >
          <img className="fill-indigo-400 -ml-8 md:-ml-4 -mr-6" height={50} width={80} src="/logo.png" />
          <span className={`${!top?"text-white":"bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"} my-auto font-bold text-xl`}>
            aarthi
          </span>
        </Link>
        {/* navigation */}
        <nav className="nav font-semibold text-lg hidden md:block">
          <ul className="flex items-center">
            <li className="p-4 border-b-2 dark:hover:text-indigo-200 dark:hover:border-indigo-200 border-indigo-500 border-opacity-0 hover:border-opacity-100 hover:text-indigo-500 duration-200 cursor-pointer active">
              <Link to="/">Home</Link>
            </li>
            <li className="p-4 border-b-2 dark:hover:text-indigo-200 dark:hover:border-indigo-200 border-indigo-500 border-opacity-0 hover:border-opacity-100 hover:text-indigo-500 duration-200 cursor-pointer">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="p-4 border-b-2 dark:hover:text-indigo-200 dark:hover:border-indigo-200 border-indigo-500 border-opacity-0 hover:border-opacity-100 hover:text-indigo-500 duration-200 cursor-pointer">
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        {/* buttons -*/}
        <div className="w-6/12  md:w-3/12 flex justify-end">
          {!isAuthenticated? (
            <Link
              to="/login"
              className={`rounded-2xl shadow-md px-4 py-1 font-semibold bg-slate-400/30 text-white bg-opacity-75`}
            >
              Login
            </Link>
          ) : (
            // <button
            // onClick={()=> {
            //   handleLogout();
            //   navigate("/");
            // }}
            // className={`rounded-md shadow-md px-4 py-2 font-semibold btn text-white bg-opacity-75`}
            // >
            //   Logout
            // </button>
            <>
              <Link to="/dashboard" className="w-10 h-10 border-2 cursor-pointer select-none border-blue-300 rounded-full overflow-hidden">
                <img className="" src="https://i.pinimg.com/1200x/4f/e7/11/4fe711959a0dd8c75c16debbeebb1f96.jpg" />
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
};



export default Navbar;
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

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
      <header className={`header px-8 py-2 fixed dark:text-white top-0 flex items-center h-16 justify-between w-full z-30 bg-opacity-80 transition duration-300 ease-in-out ${!top ? 'bg-gray-900 backdrop-blur-sm shadow-lg text-white' : 'text-black'}`}>
        {/* logo */}
        <Link
          to="/"
          className="md:w-3/12 w-6/12 p-2 flex justify-start my-aut mt-0"
        >
          <img className="fill-indigo-400 -mr-6" height={50} width={80} src="/logo.png" />
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
              <Link to="/profile">Profile</Link>
            </li>
            <li className="p-4 border-b-2 dark:hover:text-indigo-200 dark:hover:border-indigo-200 border-indigo-500 border-opacity-0 hover:border-opacity-100 hover:text-indigo-500 duration-200 cursor-pointer">
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        {/* buttons -*/}
        <div className="w-6/12  md:w-3/12 flex justify-end">
          {!localStorage.getItem("auth-token")? (
            <Link
              to="/login"
              className={`rounded-md shadow-md px-4 py-2 font-semibold btn glass text-white bg-opacity-75`}
            >
              Login
            </Link>
          ) : (
            <button
            onClick={()=> {
              localStorage.removeItem("auth-token");
              navigate("/welcome");
            }}
            className={`rounded-md shadow-md px-4 py-2 font-semibold btn glass text-white bg-opacity-75`}
            >
              Logout
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
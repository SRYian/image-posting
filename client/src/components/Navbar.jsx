import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, reset } from "../feature/AuthSlice";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const Logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <nav className="bg-white px-2 sm:px-4 py-3 fixed w-full z-20 top-0 left-0 border-b-2 border-blue-500">
      <h3 className="bluefont">{user && user.username}</h3>

      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <img src="../logo/bear.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
          <span className="bluefont self-center text-xl font-semibold whitespace-nowrap">
            Circle Name
          </span>
        </a>
        <div className="flex md:order-2">
          <button
            type="button"
            className="text-white bluebutton focus:ring-blue-300 font-medium rounded-lg text-base px-8 py-2.5 text-center mr-3 md:mr-0"
          >
            Log In
          </button>
          <button
            type="button"
            className="text-white redbutton focus:ring-blue-300 font-medium rounded-lg text-base px-8 py-2.5 text-center mr-3 md:mr-0"
            onClick={Logout}
          >
            Log Out
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-base text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
            <li>
              <a
                href="#"
                className="text-base font-semibold bluefont inline-block p-4 px-10 py-4 rounded-t-lg border-b-2 border-transparent hover:text-blue-500 hover:border-blue-400"
                id="contacts-tab"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-base font-semibold bluefont inline-block p-4 px-10 py-4 rounded-t-lg border-b-2 border-transparent hover:text-blue-500 hover:border-blue-400"
                id="contacts-tab"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-base font-semibold bluefont inline-block p-4 px-10 py-4 rounded-t-lg border-b-2 border-transparent hover:text-blue-500 hover:border-blue-400 cursor-not-allowed"
                id="contacts-tab"
              >
                Member
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-base font-semibold bluefont inline-block p-4 px-10 py-4 rounded-t-lg border-b-2 border-transparent hover:text-blue-500 hover:border-blue-400 cursor-not-allowed"
                id="contacts-tab"
              >
                Store
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

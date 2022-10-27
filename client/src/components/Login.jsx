import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe, LoginUser, reset } from "../feature/AuthSlice";
function Login() {
  const [username, setUsername] = useState("111");
  const [password, setPassword] = useState("111");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      console.log("USER LOGGED IN, WELCOME " + user);
      navigate("/mypost");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
  };
  return (
    <div className="h-full w-full">
      <div className="flex flex-col justify-center">
        <form
          className="max-w-screen-sm w-full mx-auto bg-gray-100 p-8 px-16 rounded-lg shadow-md shadow-gray-900 bg-[url('../assets/bear.png)]"
          action=""
          onSubmit={Auth}
        >
          {user && <p className="text-center bluefont">{user}</p>}
          {isError && <p className="text-center bluefont">{message}</p>}
          <h3 className="text-3xl bluefont font-bold text-center py-2">
            MEMBER LOGIN
          </h3>
          <div className="flex flex-col text-gray-400 py-2">
            <label
              className="text-gray-500  font-semibold text-left"
              htmlFor=""
            >
              Username
            </label>
            <input
              className="rounded-lg text-gray-500 bg-gray-300 mt-2 p-1 focus:border-x-green-400 focus:bg-gray-400 focus:outline-none "
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              name=""
              id=""
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2 ">
            <label className="text-gray-500 font-semibold text-left" htmlFor="">
              Password
            </label>
            <input
              className="rounded-lg text-gray-500 bg-gray-300 mt-2 p-1 focus:border-x-green-400 focus:bg-gray-400 focus:outline-none "
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name=""
              id=""
            />
          </div>
          <button
            type="submit"
            className="bluebutton w-full my-9 py-2 bg-green-400 shadow-md hover:bg-green-500 shadow-blue-500/50 hover:shadow-blue-500/40 text-white font-semibold rounded-full border-none focus:outline-none"
          >
            {isLoading ? "loading..." : "login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

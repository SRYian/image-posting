import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../feature/AuthSlice";
function Login() {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/nav");
      dispatch(reset());
    }
  }, [user, isSuccess, dispatch]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
  };
  return (
    <div className="h-full w-full">
      <div className="flex flex-col justify-center">
        <form
          className="max-w-screen-sm w-full mx-auto bg-gray-900 p-8 px-16 rounded-lg shadow-md shadow-gray-900"
          action=""
          onSubmit={Auth}
        >
          {isError && <p className="text-center">{message}</p>}
          <h2 className="text-4xl dark:text-white font-bold text-center py-2">
            SIGN IN
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label
              className=" dark:text-white font-semibold text-left"
              htmlFor=""
            >
              Username
            </label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-1 focus:border-x-green-400 focus:bg-gray-800 focus:outline-none "
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
            <label
              className="dark:text-white font-semibold text-left"
              htmlFor=""
            >
              Password
            </label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-1 focus:border-x-green-400 focus:bg-gray-800 focus:outline-none "
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
            className="w-full my-9 py-2 bg-green-400 shadow-md hover:bg-green-500 shadow-green-500/50 hover:shadow-green-500/40 text-white font-semibold rounded-lg border-none focus:outline-none"
          >
            {isLoading ? "loading..." : "login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

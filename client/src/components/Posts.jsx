import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);
  const navigate = useNavigate();

  const getPosts = async () => {
    const response = await axios.get("http://localhost:5000/post");
    setPosts(response.data);
  };

  const deleteProduct = async (index) => {
    console.log(`INDEKS ADALAH ${index + 1}`);
    try {
      await axios.delete(`http://localhost:5000/post/${index}`);
      getPosts();
      navigate("/mypost");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-32  p-10">
      <div className=""></div>
      <div className="grid gap-20  sm:grid-cols-3 grid-cols-1 col-auto ">
        {posts.map((post, index) => {
          return (
            <div
              key={post.id}
              className="flex flex-col justify-end bg-white rounded-xl shadow-lg p-4"
            >
              <img
                className="rounded-lg w-full object-contain"
                src={post.url}
                alt="Sunset in the mountains"
              />
              <div className="py-8 text-left">
                <div className="text-gray-700 font-semibold text-xl mb-2">
                  {post.title}
                </div>
                <span className="text-gray-500 text-base">
                  @{post.username}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => navigate(`/editpost/${post.id}`)}
                  type="button"
                  className="text-white border-none
                focus:outline-none bluebutton focus:ring-blue-300
                font-medium rounded-lg text-base px-8 py-2.5 text-center
                mr-3 md:mr-0"
                >
                  {" "}
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(post.id)}
                  type="button"
                  className="text-white border-none focus:outline-none redbutton focus:ring-blue-300 font-medium rounded-lg text-base px-8 py-2.5 text-center mr-3 md:mr-0"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <div className="p-6 flex items-center justify-center">
          <AiOutlinePlusCircle
            onClick={() => navigate(`/addpost`)}
            className=" hover:brightness-90"
            style={{ fontSize: "10rem", color: "#08c" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Posts;

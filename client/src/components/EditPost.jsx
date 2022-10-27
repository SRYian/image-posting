import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
function EditPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const { id } = useParams();
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  // get individual post by their ids
  useEffect(() => {
    getPostById();
  }, []);

  const getPostById = async () => {
    const response = await axios.get(`http://localhost:5000/post/${id}`);
    console.log(response.data.title);
    setTitle(response.data.title);
    setFile(response.data.image);
    setDescription(response.data.description);
    setPreview(response.data.url);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const UpdatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    console.log(formData);
    console.log("file IS: " + file);
    try {
      const response = await axios.patch(
        `http://localhost:5000/post/${id}`,
        formData
      );
      console.log(response);
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={UpdatePost}>
      <div>
        <h1>UPDATE</h1>
        <label>Post Name</label>
        <div className="control">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="post title"
          />
        </div>
      </div>
      <textarea
        rows="2"
        cols="20"
        maxlength="50"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="post description"
      ></textarea>
      <div>
        <label>File</label>
        <div className="control">
          <input type="file" onChange={loadImage} />
        </div>
      </div>
      {preview ? (
        <figure className="">
          <img src={preview} alt="preview" />
        </figure>
      ) : (
        ""
      )}
      <div>
        <div>
          <button type="submit">Update</button>
        </div>
      </div>
    </form>
  );
}

export default EditPost;

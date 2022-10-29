import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
function EditPost() {
  const [title, setTitle] = useState(``);
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
    setTitle(response.data[0].title);
    setFile(response.data[0].image);
    setDescription(response.data[0].description);
    setPreview(response.data[0].url);
    console.log(title);
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
      navigate("/mypost");
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
            required
          />
        </div>
      </div>
      <textarea
        rows="2"
        cols="20"
        maxLength="50"
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

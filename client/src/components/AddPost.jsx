import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const savePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    console.log(formData);
    console.log("file IS: " + file);
    try {
      const response = await axios
        .post("http://localhost:5000/post", formData)
        .then((response) => {
          console.log(response.data);
        });
      console.log(response);
      navigate("/mypost");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={savePost}>
      <div>
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
          <button type="submit">Publish</button>
        </div>
      </div>
    </form>
  );
}

export default AddPost;

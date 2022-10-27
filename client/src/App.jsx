import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Posts from "./components/Posts";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import MyPost from "./Pages/MyPost";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/nav" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypost" element={<MyPost />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/editpost/:id" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// MakeBlogg.jsx

import { useState, useContext } from "react";
import { UserContext } from "../comp/UserContext";

const MakeBlogg = ({ onAddBlog }) => {
  const [title, setTitle] = useState("");
  const [blogText, setBlogText] = useState("");
  const [category, setCategory] = useState("");
  const { userName } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !blogText.trim() || !category) {
      alert("Please enter title, blog text, and select a category");
      return;
    }
    const newBlog = { title, blogText, author: userName, category };
    onAddBlog(newBlog);
    setTitle("");
    setBlogText("");
    setCategory("");
  };

  return (
    <div className="form-container">
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit} className="form">

        <div className="form-input">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-input">
          <label>Blog Text:</label>
          <textarea
            className="bloggTextInput"
            value={blogText}
            onChange={(e) => setBlogText(e.target.value)}
          ></textarea>
        </div>
        
        <div className="form-input">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Gaming">Gaming</option>
            <option value="Food">Food</option>
            <option value="News">News</option>
          </select>
        </div>

        <p>Author: {userName} (You)</p>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default MakeBlogg;

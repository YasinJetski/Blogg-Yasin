import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../comp/UserContext";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import "../explore.css";

const Discover = () => {
  const { userName } = useContext(UserContext);
  const [editablePostId, setEditablePostId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [comments, setComments] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Retrieve blog posts from local storage
    const storedPosts = JSON.parse(localStorage.getItem("blogPosts"));
    if (storedPosts) {
      setBlogPosts(storedPosts);
    }
  }, []);

  useEffect(() => {
    let filtered = blogPosts;
    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }
    filtered = filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });

    setFilteredPosts(filtered);
  }, [blogPosts, selectedCategory, sortBy]);

  const addBlogPost = (post) => {
    const updatedPosts = [...blogPosts, post];
    setBlogPosts(updatedPosts);
    // Store updated posts in local storage
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
  };

  const removeBlogPost = (postId) => {
    const updatedPosts = blogPosts.filter((post) => post.id !== postId);
    setBlogPosts(updatedPosts);
    // Update local storage
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
  };

  const updateBlogPost = (postId, newText) => {
    const updatedPosts = blogPosts.map((post) =>
      post.id === postId ? { ...post, blogText: newText } : post
    );
    setBlogPosts(updatedPosts);
    // Update local storage
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
  };

  const handleEdit = (postId, text) => {
    setEditablePostId(postId);
    setEditedText(text);
  };

  const handleSave = (postId) => {
    updateBlogPost(postId, editedText);
    setEditablePostId(null);
  };

  const handleKeyPress = (event, postId) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave(postId);
    }
  };

  const handleCommentChange = (postId, event) => {
    const { value } = event.target;
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = (postId) => {
    const commentContent = comments[postId];
    if (commentContent) {
      const newComment = { userName, text: commentContent };
      const updatedPosts = blogPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), newComment] }
          : post
      );
      setBlogPosts(updatedPosts);
      // Update local storage
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: "",
      }));
    }
  };

  return (
    <div className="heroContent">
      <div className="blogContainer">
        <div className="filterSection">
          <button
            className={`filterButton ${sortBy === "newest" ? "active" : ""}`}
            onClick={() => setSortBy("newest")}
          >
            Newest
          </button>
          <button
            className={`filterButton ${sortBy === "oldest" ? "active" : ""}`}
            onClick={() => setSortBy("oldest")}
          >
            Oldest
          </button>
          <h1>Category:</h1>
          <button
            className={`filterButton ${
              selectedCategory === "Gaming" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("Gaming")}
          >
            Gaming
          </button>
          <button
            className={`filterButton ${
              selectedCategory === "Food" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("Food")}
          >
            Food
          </button>
          <button
            className={`filterButton ${
              selectedCategory === "News" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("News")}
          >
            News
          </button>
          <button
            className={`filterButton ${!selectedCategory ? "active" : ""}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
        </div>
        {filteredPosts.map((post) => (
          <div className="blogPost" key={post.id}>
            <h2>
              {post.title}
              {post.author === userName && (
                <>
                  <MdDeleteOutline
                    onClick={() => removeBlogPost(post.id)}
                    className="removeButton"
                  >
                    Remove
                  </MdDeleteOutline>
                  {editablePostId === post.id ? (
                    <MdEdit onClick={() => handleSave(post.id)} />
                  ) : (
                    <MdEdit onClick={() => handleEdit(post.id, post.blogText)} />
                  )}
                </>
              )}
            </h2>
            <div className="blogContent">
              {editablePostId === post.id ? (
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, post.id)}
                />
              ) : (
                <h3>{post.blogText}</h3>
              )}
              <p>Author: {post.author} {post.author === userName && "(You)"}</p>
              <textarea
                value={comments[post.id] || ""}
                onChange={(event) => handleCommentChange(post.id, event)}
                placeholder="Leave a comment..."
              />
              <button
                onClick={() => handleCommentSubmit(post.id)}
                disabled={!comments[post.id]}
              >
                Submit
              </button>
            </div>
            <div className="commentSection" data-postid={post.id}>
              <h1>Comments:</h1>
              {post.comments && post.comments.map((comment, index) => (
                <div className="commentWrapper" key={index}>
                  <h2>{comment.userName === userName ? "You" : comment.userName}</h2>
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;

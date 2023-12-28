import React, { useState } from "react";
import "./CreatePost.css";
import { BsFillFileEarmarkPostFill, BsFileImage } from "react-icons/bs";
import PostText from "./PostText";
import Rightbar from "../Rightbar/Rightbar";

const makeStyle = {
  borderBottom: "2px solid #0079ff",
  color: "#0079ff",
};
const CreatePost = () => {
  const [postType, setPosttype] = useState("post");
  const handleClick = (e) => {
    setPosttype(e.target.id);
  };
  return (
    <>
      <div className="reddit_clone-create_post_head">
        <h3>Create a post </h3>
        <button>
          Drafts<span>1</span>{" "}
        </button>
      </div>
      <div className="reddit_clone-create_post_line"></div>
      <select name="" id="" className="reddit_clone-create_post_select">
        <option value="">Choose A Community</option>
        <option value="">User</option>
      </select>
     
      <div className="reddit_clone-create_post">
        <div className="reddit_clone-create_post_links">
        
          <button
            id="img_video"
            onClick={handleClick}
            style={postType === "img_video" ? makeStyle : {}}
          >
            <BsFileImage /> Title & Images
          </button>
        
        
        </div>
        <div className="reddit_clone-create_post_types">
          <PostText post={postType} />
        </div>
        <div className="reddit_clone-content">
        <Rightbar />
      </div>
      </div>
    </>
  );
};

export default CreatePost;

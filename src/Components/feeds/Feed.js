import React, { useState } from "react";
import "./feeds.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { BsSave } from "react-icons/bs";
import {
  faComment,
  faListDots,
  faShare,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";

const Feed = ({ fed }) => {
 
  const likeHandle = async (postId) => {
    
    const id = postId;
    console.log("id", id);
    try {
      const liked = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/like/${postId}`,
        {
          method: "POST",
          headers: {
            // Authorization: `Bearer ${token}`,
            projectID: "f104bi07c490",
          },
        }
      );
      // if (liked.status === "success") {
      const res = await liked.json();
      console.log("liked", res);

      if (res.status === "success") {
        toast.success(res.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error while liking:", error);
      toast.error("An error occurred while processing your request.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="feed" key={fed?._id}>
      <div className="top-content">
       
          <div className="user">
          <div className="vote-like">
            <ImArrowUp className="reddit_clone-arrow_up"/>
            {fed?.likeCount}
            <ImArrowDown  className="reddit_clone-arrow_down"/>
          </div>
            <img src={fed?.author?.profileImage} alt="" />
            <div>
              <h3>{fed?.author?.name}</h3>
            </div>
          </div>
       
      
      </div>
      <div className="mid-content">
        <p>{fed?.content}</p>
        <img src={fed?.channel?.image} alt="" />
      </div>
      <div className="bottom-content">
        <div className="action-item" onClick={() => likeHandle(fed?._id)}>
         
        </div>
        <div className="action-item" >
          <span>
            <FontAwesomeIcon icon={faComment} /> {fed?.commentCount} Comment
          </span>
        </div>
        <div className="action-item">
          <span>
            <FontAwesomeIcon icon={faShare} />  Share
          </span>
        </div>
        <div className="action-item">
          <span>
            <BsSave /> Save
          </span>
        </div>
      </div>
      {/* {openComment && <Comments postId={fed?._id} />} */}
    </div>
  );
};

export default Feed;
import React, { useState, useContext } from "react";
import "./feeds.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { BsSave } from "react-icons/bs";
import {
  faComment,
  faListDots,
  faShare,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../Utils/MyContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Comments from "../Comment/Comment";

const Feed = ({ fed }) => {
  const {
    login,
    setLogin,
    setShowForm,
    theme,
    setTheme,
    setNavMenu,
    userId,
    setUserId,
  } = useContext(MyContext);
  const [openComment, setOpenComment] = useState(false);
  const [likeCount, setLikeCount] = useState(
    Math.floor(Math.random() * 1000)
  ); 
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const navigate = useNavigate();

  const commentHandler = (e) => {
    e.stopPropagation();
    if (!login) {
      navigate('/signin')
      return;
    }

    setOpenComment(!openComment);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (!login) {
      navigate('/signin')
      return;
    }
    if (!liked) {
      setLikeCount(likeCount + 1); 
      setLiked(true);
      setDisliked(false);
    }
  };

  const handleDislike = (e) => {
    e.stopPropagation();
    if (!login) {
      navigate('/signin')
      return;
    }
    if (!disliked  && likeCount > 0) {
      setLikeCount(likeCount - 1); 
      setDisliked(true);
      setLiked(false);
    }
  };
  // const likeHandle = async (postId) => {
  //   const token =  window.sessionStorage.getItem("jwt");
  //   const id = postId;
  //   console.log("id", id);
  //   try {
  //     const liked = await fetch(
  //       `https://academics.newtonschool.co/api/v1/reddit/like/${postId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           projectID: "f104bi07c490",
  //         },
  //       }
  //     );
  //     // if (liked.status === "success") {
  //     const res = await liked.json();
  //     console.log("liked", res);

  //     if (res.status === "success") {
  //       alert("liked")
  //       toast.success(res.message, {
  //         position: toast.POSITION.TOP_CENTER,
  //       });
  //     } else {
  //       toast.error(res.message, {
  //         position: toast.POSITION.TOP_CENTER,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error while liking:", error);
  //     toast.error("An error occurred while processing your request.", {
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //   }
  // };

  return (
    <div className="feed" key={fed?._id}>
      <div className="top-content">
       
          <div className="user">
          <div className="vote-like">
          <div className="action-item" onClick={handleLike} >
          <ImArrowUp
                style={liked ? {color:"orangered"} : ""}
              />
            </div>
            {likeCount}
            <div className="action-item" onClick={handleDislike} >
            <ImArrowDown
                style={disliked ? {color:"blue"} : ""}
              />
            </div>
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
        
        <div className="action-item" onClick={commentHandler} >
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
      {openComment && <Comments fed={fed} postId={fed?._id}/>}
    </div>
  );
};

export default Feed;
import React, { useState, useContext, useEffect, useRef } from "react";
import "./feeds.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { BsSave } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faComment,
  faListDots,
  faShare,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../Utils/MyContext";
import { Link, useNavigate } from "react-router-dom";
import Comments from "../Comment/Comment";

const Feed = ({ fed }) => {
  const [likeColor, setLikeColor] = useState('#e6e6e6'); 
  const [dislikeColor, setDislikeColor] = useState('#e6e6e6');
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
  const [save, setSave] = useState(false);
  const navigate = useNavigate();
  const commentBoxRef = useRef(null);
   
  const handleShare = (e) => {
    if (!login) {
      navigate('/signin')
      return;
    }
    e.stopPropagation();
    const postLink = `https://academics.newtonschool.co/api/v1/reddit/post/${fed?._id}`;

    navigator.clipboard.writeText(postLink).then(() => {
      toast.success("Link copied to clipboard", {
        position: toast.POSITION.TOP_CENTER,
        progress: undefined,
        hideProgressBar: false,
        theme: "light",
      });
    }).catch((err) => {
      console.error('Failed to copy: ', err);
      toast.error("Failed to copy link to clipboard", {
        position: toast.POSITION.TOP_CENTER,
        progress: undefined,
      hideProgressBar: false,
      theme: "light",
      });
    });
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (!login) {
      navigate('/signin')
      return;
    }
    toast.success("Post saved successful", {
      position: toast.POSITION.TOP_CENTER,
      progress: undefined,
      hideProgressBar: false,
      theme: "light",
    });
  };
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (commentBoxRef.current && !commentBoxRef.current.contains(event.target)) {
        setOpenComment(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      setLikeColor('#D93A00'); 
      setDislikeColor('#e6e6e6');
    }
  };

  const handleDislike = (e) => {
    e.stopPropagation();
    if (!login) {
      navigate('/signin')
      return;
    }
    if (!disliked && likeCount > 0) {
      setLikeCount(likeCount - 1); 
      setDisliked(true);
      setLiked(false);
      setLikeColor('#e6e6e6'); 
      setDislikeColor('#6A5CFF'); 
    } else if (disliked) {
      setLikeCount(likeCount + 1);
      setLiked(true);
      setDisliked(false);
      setLikeColor('#6A5CFF'); 
      setDislikeColor('#e6e6e6'); 
    }
  };
 

  return (
    <div className="feed" key={fed?._id}>
      <div className="top-content">
       
          <div className="user">
         
            <img src={fed?.author?.profileImage} alt="" />
            <div>
              <h4 style={{paddingTop:"7px"}}>r/{fed?.author?.name}</h4>
            </div>
          </div>
       
      
      </div>
      <div className="mid-content">
        <p>{fed?.content}</p>
        <img src={fed?.channel?.image} alt="" />
      </div>
      <div className="bottom-content">
      <div className="vote-like" style={{ backgroundColor: likeColor }}>
          <div className="action-item" onClick={handleLike} >
          <svg rpl="" fill="currentColor" height="16" icon-name="upvote-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"> 
          <path d="M12.877 19H7.123A1.125 1.125 0 0 1 6 17.877V11H2.126a1.114 1.114 0 0 1-1.007-.7 1.249 1.249 0 0 1 .171-1.343L9.166.368a1.128 1.128 0 0 1 1.668.004l7.872 8.581a1.25 1.25 0 0 1 .176 1.348 1.113 1.113 0 0 1-1.005.7H14v6.877A1.125 1.125 0 0 1 12.877 19ZM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8ZM2.227 9.784l-.012.016c.01-.006.014-.01.012-.016Z"></path> </svg>
            </div>
            {likeCount}
            <div className="action-item" onClick={handleDislike} >
            <svg rpl="" fill="currentColor" height="16" icon-name="downvote-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
             <path d="M10 20a1.122 1.122 0 0 1-.834-.372l-7.872-8.581A1.251 1.251 0 0 1 1.118 9.7 1.114 1.114 0 0 1 2.123 9H6V2.123A1.125 1.125 0 0 1 7.123 1h5.754A1.125 1.125 0 0 1 14 2.123V9h3.874a1.114 1.114 0 0 1 1.007.7 1.25 1.25 0 0 1-.171 1.345l-7.876 8.589A1.128 1.128 0 0 1 10 20Zm-7.684-9.75L10 18.69l7.741-8.44H12.75v-8h-5.5v8H2.316Zm15.469-.05c-.01 0-.014.007-.012.013l.012-.013Z"></path> </svg>
            </div>
          </div>
        <div className="action-item" onClick={commentHandler} >
          <span>
            <GoComment icon={faComment} /> 
            {fed?.commentCount} Comment
          </span>
        </div>
        <div className="action-item">
          <span onClick={handleShare}>
            <FontAwesomeIcon icon={faShare} />  Share
          </span>
        </div>
        <div className="action-item">
          <span onClick={handleSave}>
            <BsSave />  Save
          </span>
        </div>
      </div>
      <div ref={commentBoxRef}>
      {openComment && <Comments fed={fed} postId={fed?._id}/>}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
export default Feed;
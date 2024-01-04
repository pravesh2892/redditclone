import React, { useState, useContext, useEffect, useRef } from "react";
import "./feeds.css";
import { BsSave, BsTrash } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyContext } from "../../Utils/MyContext";
import { Link, useNavigate } from "react-router-dom";
import Comments from "../Comment/Comment";

const Feed = ({ fed, removePost }) => {
  const [likeColor, setLikeColor] = useState("#e6e6e6");
  const [dislikeColor, setDislikeColor] = useState("#e6e6e6");
  const {
    login,
    userName,
    userPhoto,
    setLogin,
    setShowForm,
    theme,
    setTheme,
    setNavMenu,
    userId,
    setUserId,
  } = useContext(MyContext);
  const [openComment, setOpenComment] = useState(false);
  const [likeCount, setLikeCount] = useState(fed?.likeCount);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const navigate = useNavigate();
  const commentBoxRef = useRef(null);
  const token = localStorage.getItem("jwt");

  const handleShare = (e) => {
    if (!login) {
      navigate("/signin");
      return;
    }
    e.stopPropagation();
    const postLink = `https://academics.newtonschool.co/api/v1/reddit/post/${fed?._id}`;

    navigator.clipboard
      .writeText(postLink)
      .then(() => {
        toast.success("Link copied to clipboard", {
          position: toast.POSITION.TOP_CENTER,
          progress: undefined,
          hideProgressBar: false,
          theme: "light",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
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
      navigate("/signin");
      return;
    }
    toast.success("Post saved successful", {
      position: toast.POSITION.TOP_CENTER,
      progress: undefined,
      hideProgressBar: false,
      theme: "light",
    });
  };

  const handleDeletePost = (e) => {
    e.stopPropagation();
    if (!login) {
      navigate("/signin");
      return;
    }

    fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${fed?._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        projectID: "f104bi07c480",
      },
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Post deleted successfully", {
            position: toast.POSITION.TOP_CENTER,
            progress: undefined,
            hideProgressBar: false,
            theme: "light",
          });
          removePost(fed._id);
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Failed to delete post");
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error.message);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        commentBoxRef.current &&
        !commentBoxRef.current.contains(event.target)
      ) {
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
      navigate("/signin");
      return;
    }

    setOpenComment(!openComment);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (!login) {
      navigate("/signin");
      return;
    }
    if (!liked) {
      fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${fed._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: "f104bi07c480",
        },
      })
        .then((response) => {
          if (response.ok) {
            if (disliked) {
              setDisliked(false);
              if (likeCount === 0) {
                setLikeCount(1);
              } else {
                setLikeCount(likeCount + 2);
              }
            } else {
              setLikeCount(likeCount + 1);
            }
            setLiked(true);
            setLikeColor("#D93A00");
            setDislikeColor("#e6e6e6");
          } else {
            throw new Error("Failed to upvote post");
          }
        })
        .catch((error) => {
          console.error("Error upvoting post:", error.message);
        });
    }
  };

  const handleDislike = (e) => {
    e.stopPropagation();
    if (!login) {
      navigate("/signin");
      return;
    }
    if (!disliked) {
      fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${fed._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: "f104bi07c480",
        },
      })
        .then((response) => {
          if (response.ok) {
            if (liked) {
              setLiked(false);
              if (likeCount === 1) {
                setLikeCount(0);
              } else {
                setLikeCount(Math.max(0, likeCount - 2));
              }
            } else {
              setLikeCount(Math.max(0, likeCount - 1));
            }
            setDisliked(true);
            setLiked(false);
            setLikeColor("#6A5CFF");
            setDislikeColor("#6A5CFF");
          } else {
            throw new Error("Failed to downvote post");
          }
        })
        .catch((error) => {
          console.error("Error downvoting post:", error.message);
        });
    }
  };

  return (
    <div className="feed" key={fed?._id}>
      <div className="top-content">
        <div className="user">
          {fed?.author?.profileImage ? (
            <img src={fed?.author?.profileImage} alt="" />
          ) : (
            <img 
            style={{ height: "45px" }}
            src="https://reddit-clone-jishnu.vercel.app/static/media/User%20Logo%20Half.7fa3e6a6376757ebe020.png" alt="" />
          )}
          <div>
            <h4 style={{ paddingTop: "7px" }}>r/{fed?.author?.name}</h4>
          </div>
          {fed?.author?.name === userName && (
            <div className="delete-btn" onClick={handleDeletePost}>
              <BsTrash />
            </div>
          )}
        </div>
      </div>
      <div className="mid-content">
        <p>{fed?.content}</p>
        <img src={fed?.channel?.image} alt="" />
      </div>
      <div className="bottom-content">
        <div className="vote-like" style={{ backgroundColor: likeColor }}>
          <div className="action-item" onClick={handleLike}>
            <svg
              rpl=""
              fill="currentColor"
              height="16"
              icon-name="upvote-outline"
              viewBox="0 0 20 20"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.877 19H7.123A1.125 1.125 0 0 1 6 17.877V11H2.126a1.114 1.114 0 0 1-1.007-.7 1.249 1.249 0 0 1 .171-1.343L9.166.368a1.128 1.128 0 0 1 1.668.004l7.872 8.581a1.25 1.25 0 0 1 .176 1.348 1.113 1.113 0 0 1-1.005.7H14v6.877A1.125 1.125 0 0 1 12.877 19ZM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8ZM2.227 9.784l-.012.016c.01-.006.014-.01.012-.016Z"></path>{" "}
            </svg>
          </div>
          {likeCount}
          <div className="action-item" onClick={handleDislike}>
            <svg
              rpl=""
              fill="currentColor"
              height="16"
              icon-name="downvote-outline"
              viewBox="0 0 20 20"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 20a1.122 1.122 0 0 1-.834-.372l-7.872-8.581A1.251 1.251 0 0 1 1.118 9.7 1.114 1.114 0 0 1 2.123 9H6V2.123A1.125 1.125 0 0 1 7.123 1h5.754A1.125 1.125 0 0 1 14 2.123V9h3.874a1.114 1.114 0 0 1 1.007.7 1.25 1.25 0 0 1-.171 1.345l-7.876 8.589A1.128 1.128 0 0 1 10 20Zm-7.684-9.75L10 18.69l7.741-8.44H12.75v-8h-5.5v8H2.316Zm15.469-.05c-.01 0-.014.007-.012.013l.012-.013Z"></path>{" "}
            </svg>
          </div>
        </div>
        <div className="action-item comment-btn" onClick={commentHandler}>
          <svg
            rpl=""
            aria-hidden="true"
            class="icon-comment"
            fill="currentColor"
            height="20"
            icon-name="comment-outline"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "relative", top: "5px", left: "5px" }}
          >
            <path d="M7.725 19.872a.718.718 0 0 1-.607-.328.725.725 0 0 1-.118-.397V16H3.625A2.63 2.63 0 0 1 1 13.375v-9.75A2.629 2.629 0 0 1 3.625 1h12.75A2.63 2.63 0 0 1 19 3.625v9.75A2.63 2.63 0 0 1 16.375 16h-4.161l-4 3.681a.725.725 0 0 1-.489.191ZM3.625 2.25A1.377 1.377 0 0 0 2.25 3.625v9.75a1.377 1.377 0 0 0 1.375 1.375h4a.625.625 0 0 1 .625.625v2.575l3.3-3.035a.628.628 0 0 1 .424-.165h4.4a1.377 1.377 0 0 0 1.375-1.375v-9.75a1.377 1.377 0 0 0-1.374-1.375H3.625Z"></path>
          </svg>
          <span>{fed?.commentCount}</span>
        </div>
        <div className="action-item share-btn" onClick={handleShare}>
          <svg
            rpl=""
            aria-hidden="true"
            class="icon-share"
            fill="currentColor"
            height="20"
            icon-name="share-ios-outline"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "relative", top: "3px", left: "5px" }}
          >
            <path d="M19 11v5.378A2.625 2.625 0 0 1 16.378 19H3.622A2.625 2.625 0 0 1 1 16.378V11h1.25v5.378a1.373 1.373 0 0 0 1.372 1.372h12.756a1.373 1.373 0 0 0 1.372-1.372V11H19ZM9.375 3.009V14h1.25V3.009l2.933 2.933.884-.884-4-4a.624.624 0 0 0-.884 0l-4 4 .884.884 2.933-2.933Z"></path>{" "}
          </svg>
          <span>Share</span>
        </div>
        <div className="action-item save-btn">
          <span
            onClick={handleSave}
            style={{ paddingTop: "5px", paddingLeft: "5px" }}
          >
            <BsSave /> Save
          </span>
        </div>
      </div>
      <div ref={commentBoxRef}>
        {openComment && <Comments fed={fed} postId={fed?._id} />}
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

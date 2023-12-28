import React, { useState, useContext, useEffect, useRef } from "react";
import "./Comment.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { BsSave } from "react-icons/bs";
import { MyContext } from "../../Utils/MyContext";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState();
  const {
    login,
    setLogin,
    setShowForm,
    theme,
    userName,
    setTheme,
    setNavMenu,
    userId,
    setUserId,
  } = useContext(MyContext);
 

  var key = "content";

  var obj = {};

  obj[key] = commentText;

  useEffect(() => {
    const token =localStorage.getItem("jwt");
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/reddit/post/${postId}/comments`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              projectID: "f104bi07c480",
              "Content-Type": "application/json",
            },
          }
        );
        const res = await response.json();
        if (res.status === "success") {
          const commentsWithTime = res.data.map(comment => ({
            ...comment,
            time: comment.createdAt 
          }));
          setComments(commentsWithTime);
        }
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };
    fetchComments();
  }, [postId]);

  const commentSend = () => {
    const token = localStorage.getItem("jwt");
    var myHeaders = new Headers();
    myHeaders.append("projectID", "f104bi07c490");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      content: commentText,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://academics.newtonschool.co/api/v1/reddit/comment/${postId}`,
      requestOptions
    )
      .then((response) => {
        
        if (response.ok) {
          setComments(...Comments, response.data);
          console.log("comment data", response.data)
          toast.success(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        return response.text();
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const deleteComment = async (commentId) => {
    const token = localStorage.getItem("jwt");
  
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "3ggih9l8ac0f",
            "Content-Type": "application/json",
          },
        }
      );
  
      const res = await response.json();
      console.log("comment data", res);
      if (response.ok) {
        const updatedComments = comments.filter(
          (comment) => comment.id !== commentId
        );
        setComments(updatedComments);
        toast.success("Comment deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(res.message || "Failed to delete comment", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error deleting comment: ", error);
      toast.error("Failed to delete comment", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <div className="comments" key={postId}>
      <div className="writebox">
        <form action="#">
          <div className="user">
            <img
              style={{ width: "5%", height: "5%" }}
              src="https://reddit-clone-jishnu.vercel.app/static/media/User%20Logo%20Half.7fa3e6a6376757ebe020.png"
              alt="userlogo"
            />
            <input
              type="text"
              style={{backgroundColor:"white"}}
              placeholder="Write a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "orangered",
                color: "white",
                borderRadius: "12px",
                border:"transparent",
              }}
              onClick={(e) => {
                e.preventDefault();
                commentSend();
              }}
            >
              comment
            </button>
          </div>
        </form>
      </div>
      {comments.map((comment) => (
        <div className="user-comment user" key={comment.id}>
          <img
            style={{ width: "5%", height: "5%" }}
            src="https://reddit-clone-jishnu.vercel.app/static/media/User%20Logo%20Half.7fa3e6a6376757ebe020.png"
            alt="userlogo"
          />
          <div>
            <h5>{comment.userName}</h5>
            <p>{comment.content}</p>
          </div>
          <small>{new Date(comment.time).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}</small>
         
        </div>
      ))}
    </div>
  );
};

export default Comments;

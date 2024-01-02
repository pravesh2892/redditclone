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

  const commentSend = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const myHeaders = new Headers();
      myHeaders.append("projectID", "f104bi07c490");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
  
      const raw = JSON.stringify({
        content: commentText,
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/comment/${postId}`,
        requestOptions
      );
  
      if (response.ok) {
        const responseData = await response.json();
        const newComment = {
          id: responseData.data.id,
          userName: userName, 
          content: commentText,
          time: responseData.data.createdAt,
        };
        setComments([...comments, newComment]); 
        setCommentText(""); 
        toast.success(responseData.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        const errorRes = await response.json();
        toast.error(errorRes.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error sending comment: ", error);
      toast.error("Failed to send comment", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  



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
              className="btn btn-primary comment-button"
            
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

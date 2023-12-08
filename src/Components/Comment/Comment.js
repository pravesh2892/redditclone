import React, { useEffect, useState } from "react";
import "./Comment.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { BsSave } from "react-icons/bs";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState();

  const getCurrentTime = () => {
    const currentTime = new Date();
    return currentTime.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  var key = "content";

  var obj = {};

  obj[key] = commentText;

  useEffect(() => {
    const token = window.sessionStorage.getItem("jwt");
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/reddit/post/${postId}/comments`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              projectID: "f104bi07c490",
              "Content-Type": "application/json",
            },
          }
        );
        const res = await response.json();
        if (res.status === "success") {
          setComments(res.data);
        }
      } catch (error) {
        console.error("Error :", error);
      }
    };
    fetchComments();
  }, [postId, comments]);

  const commentSend = () => {
    const token = window.sessionStorage.getItem("jwt");
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
      `https://academics.newtonschool.co/api/v1/reddit/${postId}/comment`,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          setComments(...Comments, response.data);
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

  return (
    <div className="comments">
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
            <h5>{comment.name}</h5>
            <p>{comment.content}</p>
          </div>
          <small>{getCurrentTime()}</small>
        </div>
      ))}
    </div>
  );
};

export default Comments;

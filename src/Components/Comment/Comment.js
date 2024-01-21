import React, { useState, useContext, useEffect } from "react";
import "./Comment.css";
import { toast } from "react-toastify";
import { MyContext } from "../../Utils/MyContext";
import { HiDotsHorizontal } from "react-icons/hi";
import { HiDotsVertical } from "react-icons/hi";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [deletedCommentId, setDeletedCommentId] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [dropdownCommentId, setDropdownCommentId] = useState(null);
  const { userName } = useContext(MyContext);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
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
        console.log("comment data", res);
        if (res.status === "success") {
          const commentsWithTime = res.data.map((comment) => ({
            ...comment,
            time: comment.createdAt,
          }));
          setComments(commentsWithTime);
        }
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };
    fetchComments();
  }, [postId, deletedCommentId]);

  const commentSend = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const myHeaders = new Headers();
      myHeaders.append("projectID", "f104bi07c480");
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
        const newCommentId = responseData.data.id;
        const newComment = {
          id: newCommentId,
          userName: userName,
          content: commentText,
          time: responseData.data.createdAt,
        };
        setComments([...comments, newComment]);
        setCommentText("");
        toast.success(responseData.message, {
          position: toast.POSITION.TOP_CENTER,
        });

        // Set deletedCommentId using the new comment ID
        setDeletedCommentId(newCommentId);
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

  const deleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "f104bi07c480",
          },
        }
      );
  
      if (response.ok) {
        toast.success("Comment deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
  
        // Set deletedCommentId before setting it to null
        setDeletedCommentId(commentId);
        // Reset deletedCommentId after successful deletion
        setDeletedCommentId(null);
      } else {
        const errorRes = await response.json();
        toast.error(errorRes.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error deleting comment: ", error);
      toast.error("Failed to delete comment", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  

  const editComment = async (commentId, updatedComment) => {
    try {
      const token = localStorage.getItem("jwt");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      myHeaders.append("projectID", "f104bi07c480");
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        content: updatedComment,
      });

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/comment/${commentId}`,
        requestOptions
      );

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message, {
          position: toast.POSITION.TOP_CENTER,
        });

        // Trigger a refetch of comments after editing
        setDeletedCommentId(commentId);
      } else {
        const errorRes = await response.json();
        toast.error(errorRes.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error editing comment: ", error);
      toast.error("Failed to edit comment", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleEditComment = (commentId, currentContent) => {
    setEditCommentId(commentId);
    setEditedCommentText(currentContent);
  };

  const saveEditedComment = () => {
    if (editedCommentText.trim() !== "") {
      editComment(editCommentId, editedCommentText);
      setEditCommentId(null);
      setEditedCommentText("");
    }
  };

  const cancelEditComment = () => {
    setEditCommentId(null);
    setEditedCommentText("");
  };

  const handleDropdownToggle = (commentId) => {
    setDropdownCommentId(commentId === dropdownCommentId ? null : commentId);
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
              style={{ backgroundColor: "white" }}
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
        <div className="user-comment user" key={comment._id}>
          <img
            style={{ width: "5%", height: "5%" }}
            src="https://reddit-clone-jishnu.vercel.app/static/media/User%20Logo%20Half.7fa3e6a6376757ebe020.png"
            alt="userlogo"
          />
          <div>
            <h5>{comment.userName}</h5>
            {editCommentId === comment._id ? (
              <>
                <input
                  type="text"
                  value={editedCommentText}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                />
                <button
                  className="btn btn-success save-edit-button"
                  onClick={saveEditedComment}
                >
                  Save
                </button>
               
              </>
            ) : (
              <p>{comment.content}</p>
            )}
          </div>
          <small>
            {new Date(comment.time).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}
          </small>
          <div className="dropdown">
            <HiDotsVertical onClick={() => handleDropdownToggle(comment._id)} />
            {dropdownCommentId === comment._id && (
              <div className="dropdown-content">
                <button
                  className="btn btn-warning edit-comment-button"
                  onClick={() => handleEditComment(comment._id, comment.content)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger delete-comment-button"
                  onClick={() => deleteComment(comment._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;



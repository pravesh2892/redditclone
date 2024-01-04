import React, { useContext, useEffect, useRef, useState } from "react";
import { GrCircleInformation } from "react-icons/gr";
import { MyContext } from "../../Utils/MyContext";
import "./PostText.css";
import { ToastContainer, toast } from "react-toastify";

const PostText = () => {
  const { userName, userPhoto } = useContext(MyContext);
  const [textValue, setTextValue] = useState("");
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();
  const inpRef = useRef();

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log("file", file);
    setImageURL(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const addPost = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt");
    const myHeaders = new Headers();
    myHeaders.append("projectID", "f104bi07c480");
    myHeaders.append("Authorization", "Bearer " + token);

    if (userPhoto) {
      myHeaders.append("profileImage", userPhoto);
    }

    const formdata = new FormData();
    formdata.append("content", textValue);
    formdata.append("images", image);
    console.log("image", image);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/reddit/post",
        requestOptions
      );
      const res = await response.json();

      if (res.status === "success") {
        setTextValue("");
        setImage(null);
        setImageURL(null);
        toast.success(res.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while posting", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const isDataEntered = () => {
    return textValue.trim().length > 0 || image;
  };

  return (
    <div className="reddit_clone-post_type">
      <div className="reddit_clone-post_image">
        {image ? (
          <div>
            <img src={image} style={{ maxWidth: "50%" }}></img>
          </div>
        ) : (
          <div>
            <button onClick={() => inpRef.current.click()}> Upload</button>
            <input type="file" onChange={handleImageChange} ref={inpRef} />
          </div>
        )}
      </div>

      <textarea
        name="textArea"
        id=""
        cols="30"
        rows="5"
        value={textValue}
        onChange={(e) => {
          e.preventDefault();
          setTextValue(e.target.value);
        }}
      ></textarea>

     {isDataEntered() ? (
        <div className="reddit_clone-post_type_save">
          <button
            onClick={(e) => addPost(e)}
            style={{
              backgroundColor: "#0079D3",
              borderColor: "#0079D3",
              color: "white",
            }}
          >
            Post
          </button>
        </div>
      ) : (
        <div className="reddit_clone-post_type_save">
          <button
            disabled
            style={{
              backgroundColor: "#dddddd",
              borderColor: "#dddddd",
              color: "#888888",
            }}
          >
            Add text or image to post
          </button>
        </div>
      )}
      <div className="reddit_clone-post_type_notification">
        <div className="reddit_clone-post_type_checkbox">
          <input type="checkbox" id="notification" checked />
          <label htmlFor="notification">Send me post reply notifications</label>
        </div>
        <p>
          Connect Accounts to share your post{" "}
          <GrCircleInformation style={{ color: "black" }} />
        </p>
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

export default PostText;

import React, { useContext, useEffect, useRef, useState } from "react";
import { GrCircleInformation } from "react-icons/gr";
import { MyContext } from "../../Utils/MyContext";
import "./PostText.css";
import { ToastContainer, toast } from "react-toastify";


const PostText = () => {
  const {
    update,
    setUpdate,
    setNewPost,
    userName,
    userPhoto,
    login,
    userId,
    setLoading,
  } = useContext(MyContext);
  const [title, setTitle] = useState("");
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
    var myHeaders = new Headers();
    myHeaders.append("projectID", "f104bi07c490");
    myHeaders.append("Authorization", "Bearer " + token);
    
    var formdata = new FormData();
    formdata.append("title", "title");
    formdata.append("content", textValue);
    formdata.append("images", image);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    const resp = await fetch(
      "https://academics.newtonschool.co/api/v1/reddit/post",
      requestOptions
    )
      .then(async (response) => {
        const res = await response.json();
        console.log("status", res);
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
        return response;
      })
      .then((result) => {
        console.log("result", result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div className="reddit_clone-post_type">
     
     
        <div className="reddit_clone-post_image">
          {image ? (
            <div>
              <img src={image} style={{ maxWidth: "50%" }}></img>
              <br />
              <button style={{ margin: "1rem 0" }} onChange={handleImageChange}>
                Delete
              </button>
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
        rows= "5" 
       
        value={textValue}
          onChange={(e) => {
            e.preventDefault();
            setTextValue(e.target.value);
          }}
      ></textarea>
      
      <div className="reddit_clone-post_type_save">
       
        <button
           onClick={(e) => addPost(e)}
          style={{backgroundColor: "#0079D3", borderColor: "#0079D3", color: "white",}}  
        > 
        Post
        </button>
      </div>
      <div className="reddit_clone-post_type_notification">
        <div className="reddit_clone-post_type_checkbox">
          <input type="checkbox" id="notification" checked />
          <label htmlFor="notification">Send me post reply notifications</label>
        </div>
        <p>
          Connect Accounts to share your post <GrCircleInformation style={{color:"black"}}/>
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




import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { GrCircleInformation } from "react-icons/gr";
import { MyContext } from "../../Utils/MyContext";
import "./PostText.css";



const ImageUpload = ({ setImg, setNormalImage, image }) => {
  const handleChange = (e) => {
    setNormalImage(e.target.files[0]);
    setImg(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div className="reddit_clone-createpost_img">
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          style={{ maxWidth: "100%" }}
        ></img>
      ) : (
        <input type="file" name="" id="" onChange={handleChange} />
      )}
    </div>
  );
};
const PostText = (props) => {
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
  const [normalImage, setNormalImage] = useState("");
  const [wait, setWait] = useState();
  const inpRef = useRef();
  const [image, setImage] = useState();
  const [inp, setInp] = useState({
    title: "",
    textArea: "",
  });
  const { post } = props;
  const handleChange = (e) => {
    setInp({ ...inp, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    setNormalImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handlePost = async () => {
    if (!login) return;
    setWait("Please Wait...");
    setLoading(true);

    const token = localStorage.getItem("facebook-token");
    var myHeaders = new Headers();
    myHeaders.append("projectID", "f104bi07c490");
    myHeaders.append("Authorization", "Bearer " + token);
    const data = {
      userName: userName,
      userPhoto,
      title: inp?.title,
      image: image,
      vote: 0,
      textArea: inp?.textArea,
    };
    // setUpdate([data, ...update]);
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("userPhoto", userPhoto);
    formData.append("title", inp?.title);
    formData.append("image", normalImage);
    formData.append("textArea", inp?.textArea);
    formData.append("user", userId);

    

    console.log(normalImage);
    try {
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
          };
      
          const res = await fetch(
            "https://academics.newtonschool.co/api/v1/facebook/post",
            requestOptions
          )
      const postData = res.data;
      if (postData.status == "success") {
        setUpdate([postData.data, ...update]);
        console.log(postData.data, "post upload successful");
      }
    } catch (error) {
      console.log(error);
    }

    // ************************************work in progress...
    setWait(null);
    setLoading(false);
    setNewPost((p) => !p);
  };
  useEffect(() => {
    return () => {
      window.location.reload();
      setLoading(true);
    };
  }, []);
  return (
    <div className="reddit_clone-post_type">
      <input
        type="text"
        placeholder="Title"
        name="title"
        maxLength={300}
        onChange={handleChange}
        value={inp.title}
      />
      {post == "img_video" && (
        <div className="reddit_clone-post_image">
          {image ? (
            <div>
              <img src={image} style={{ maxWidth: "100%" }}></img>
              <br />
              <button style={{ margin: "1rem 0" }} onClick={() => setImage("")}>
                Delete
              </button>
            </div>
          ) : (
            <div>
              <button onClick={() => inpRef.current.click()}> Upload</button>
              <input type="file" onChange={handleImage} ref={inpRef} />
            </div>
          )}
        </div>
      )}
      <textarea
        name="textArea"
        id=""
        cols="30"
        rows={post == "link" ? "5" : post === "img_video" ? "5" : "10"}
        placeholder={post == "link" ? "Url" : "Text(Optional)"}
        onChange={handleChange}
        value={inp.textArea}
      ></textarea>
      <div className="reddit_clone-post_type_buttons">
        <button className="">
          <AiOutlinePlus />
          type
        </button>
        <button>
          <AiOutlinePlus /> Spoiler
        </button>
        <button>
          <AiOutlinePlus /> NFW
        </button>
      </div>
      <div className="reddit_clone-post_type_save">
        <button
          style={
            inp.title.length == 0
              ? {
                  backgroundColor: "var(--color-border)",
                  borderColor: "var(--color-border)",
                  color: "gray",
                }
              : {}
          }
        >
          SaveDraft
        </button>
        <button
          onClick={handlePost}
          style={
            inp.title.length == 0
              ? {
                  backgroundColor: "var(--color-border)",
                  borderColor: "var(--color-border)",
                  color: "gray",
                }
              : {}
          }
          disabled={inp.title.length == 0}
          method="POST"
        >
          {wait || "Post"}
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
    </div>
  );
};

export default PostText;

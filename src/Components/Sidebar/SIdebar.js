import React, { useContext } from "react";
import "./Sidebar.css";
import { AiFillHome, AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { BsArrowUpRightCircle, BsFileBarGraph, BsShield } from "react-icons/bs";
import { CiCoinInsert } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoShirtOutline } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../Utils/MyContext";
import { arr } from "../NavMenuArray";
const darkModeStyle = {
  backgroundColor: "var(--color-lightDark)",
  color: "white",
};


const Sidebar = () => {
    const navigate = useNavigate();
    const {
    login,
    setNewPost,
    setIsAllPage,
    setIsPopularPage,
    menu,
    setNavMenu,
    setMenu,
    setRedditIndex,
    setFilterPost,
    setTop,
    } = useContext(MyContext);

    const handleCreatePost = () => {
      if (!login) {
        navigate("/signin");
      } else {
        navigate("/createpost");
        setNewPost(true);
        
      }
    };
    return (
      <div
        className="reddit_clone-nav_menu_item"
        style={{ width: "16rem" }}
        onClick={(e) => {
          const val = arr[parseInt(e.target.id) - 1];
          setNavMenu(val);
        }}
      >
        <p style={{ fontSize: "0.8rem" }}>FEEDS</p>
        <button
          id="1"
          onClick={() => {
           
            navigate("/");
           
          }}
        >
          {" "}
          <AiFillHome className="reddit_clone-nav_menu_icons" /> Home
        </button>
        <button
          id="2"
          onClick={() => {
            navigate("/popular");
            setIsAllPage(false);
            setIsPopularPage(true);
          }}
        >
          <BsArrowUpRightCircle className="reddit_clone-nav_menu_icons" /> Popular
        </button>
        
        <hr />
        <p style={{ fontSize: "0.8rem", paddingTop:"15px" }}>OTHER</p>
        <button id="4" onClick={() => navigate("/comingpage")}>
          <RiUserSettingsLine className="reddit_clone-nav_menu_icons" /> User
          Setting
        </button>
        <button
          id="5"
          onClick={() => {
            navigate("/message");
          }}
        >
          <AiOutlineMessage className="reddit_clone-nav_menu_icons" /> Message
        </button>
        <button
          id="6"
          onClick={handleCreatePost}
        >
          <AiOutlinePlus className="reddit_clone-nav_menu_icons" /> Create Post
        </button>
        
        <button id="8"  onClick={() => navigate("/coins")}>
          <CiCoinInsert className="reddit_clone-nav_menu_icons" /> Coins
        </button>
        <button id="9" onClick={() => navigate("/premium")} >
          <BsShield className="reddit_clone-nav_menu_icons" /> Premium
        </button>
        <button id="10" onClick={() => navigate("/comingpage")}>
          <IoShirtOutline className="reddit_clone-nav_menu_icons" /> Avatar
        </button>
      </div>
    );
  };
export default Sidebar;
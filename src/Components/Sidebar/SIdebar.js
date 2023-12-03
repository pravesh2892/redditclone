import React, { useContext } from "react";
import "./Sidebar.css";
import { AiFillHome, AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { BsArrowUpRightCircle, BsFileBarGraph, BsShield } from "react-icons/bs";
import { CiCoinInsert } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoShirtOutline } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";


const darkModeStyle = {
  backgroundColor: "var(--color-lightDark)",
  color: "white",
};


const Sidebar = () => {
    // const navigate = useNavigate();
    // const {
    //   setNewPost,
    //   setIsAllPage,
    //   setIsPopularPage,
    //   setRedditIndex,
    //   setNavMenu,
    // } = useContext(MyContext);
    return (
      <div
        className="reddit_clone-nav_menu_item"
        style={{ width: "16rem" }}
        // onClick={(e) => {
        //   const val = arr[parseInt(e.target.id) - 1];
        //   setNavMenu(val);
        // }}
      >
        <p style={{ fontSize: "0.8rem" }}>FEEDS</p>
        <button
          id="1"
        //   onClick={() => {
        //     setNewPost(false);
        //     navigate("/");
        //     setIsPopularPage(false);
        //   }}
        >
          {" "}
          <AiFillHome className="reddit_clone-nav_menu_icons" /> Home
        </button>
        <button
          id="2"
        //   onClick={() => {
        //     navigate("/popular");
        //     setIsAllPage(false);
        //     setIsPopularPage(true);
        //   }}
        >
          <BsArrowUpRightCircle className="reddit_clone-nav_menu_icons" /> Popular
        </button>
        <button
          id="3"
        //   onClick={() => {
        //     setIsAllPage(true);
        //     setRedditIndex((p) => p + 1);
  
        //     navigate("/popular");
        //   }}
        >
          <BsFileBarGraph className="reddit_clone-nav_menu_icons" /> All
        </button>
        <hr />
        <p style={{ fontSize: "0.8rem", paddingTop:"15px" }}>OTHER</p>
        <button id="4">
          <RiUserSettingsLine className="reddit_clone-nav_menu_icons" /> User
          Setting
        </button>
        <button
          id="5"
        //   onClick={() => {
        //     navigate("/messages");
        //   }}
        >
          <AiOutlineMessage className="reddit_clone-nav_menu_icons" /> Message
        </button>
        <button
          id="6"
        //   onClick={() => {
        //     setNewPost(true);
        //     navigate("/");
        //   }}
        >
          <AiOutlinePlus className="reddit_clone-nav_menu_icons" /> Create Post
        </button>
        <button id="7" >
          <IoIosNotificationsOutline className="reddit_clone-nav_menu_icons" />{" "}
          Notifications
        </button>
        <button id="8" >
          <CiCoinInsert className="reddit_clone-nav_menu_icons" /> Coins
        </button>
        <button id="9" >
          <BsShield className="reddit_clone-nav_menu_icons" /> Premium
        </button>
        <button id="10" >
          <IoShirtOutline className="reddit_clone-nav_menu_icons" /> Avatar
        </button>
      </div>
    );
  };
export default Sidebar;
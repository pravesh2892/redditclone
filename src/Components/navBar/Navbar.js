import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { FaEllipsisVertical } from "react-icons/fa6";
import {
  BsArrowBarLeft,
  BsArrowUpRightCircle,
  BsQrCodeScan,
  BsQuestionLg,
  BsShield,
} from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { CiCircleMore, CiCoinInsert } from "react-icons/ci";
import { FaReddit } from "react-icons/fa";
import { FcAdvertising } from "react-icons/fc";
import { FiFileText } from "react-icons/fi";
import NavMenu from "../NavMenu/NavMenu";
import { IoIosNotificationsOutline, IoIosLogOut } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../Utils/MyContext";
import { arr } from "../NavMenuArray";
import "./Navbar.css";

const style = {
  border: "1px solid #343536",
  borderRadius: " 3px",
  cursor: "pointer",
};

const Option = () => {
  const { login, setLogin, setNavMenu } = useContext(MyContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLogin(false);
    navigate("/signin");
  };

  return (
    <div className="reddit_clone-nav_option">
      <button
        onClick={() => {
          navigate("/coins");
          setNavMenu(arr[7]);
        }}
      >
        <CiCoinInsert className="reddit_clone-nav_menu_icons" /> Coins
      </button>
      <button
        onClick={() => {
          navigate("/premium");
          setNavMenu(arr[8]);
        }}
      >
        <BsShield className="reddit_clone-nav_menu_icons" /> Premium
      </button>
      <button onClick={() => navigate("/comingpage")}>
        <BsQuestionLg /> Help Center
      </button>
      <button onClick={() => navigate("/comingpage")}>
        <CiCircleMore /> More
      </button>
      <button onClick={() => navigate("/comingpage")}>
        <FiFileText /> Terms And Policies
      </button>
      <button onClick={() => navigate("/comingpage")}>
        <FcAdvertising /> Advertise on Reddit
      </button>
      {login && ( 
        <button onClick={handleLogout}>
          <IoIosLogOut /> LogOut
        </button>
      )}
    </div>
  );
};

const NavIcon = ({ userName, option, setOption }) => {
  const navigate = useNavigate();
  const optionRef = useRef();
  const { setNavMenu } = useContext(MyContext);

  const { userPhoto, setNewPost } = useContext(MyContext);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (optionRef.current && !optionRef.current.contains(e.target)) {
        setOption(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleOptions = () => {
    setOption((p) => !p);
  };
  return (
    <div className="reddit_clone-nav_icons">
      <div className="reddit_clone-nav_icons_item">
        <button
          onClick={() => {
            navigate("/message");
            setNavMenu(arr[4]);
          }}
        >
          <AiOutlineMessage />
        </button>
        <button
          onClick={() => {
            navigate("/createpost");
            setNavMenu(arr[5]);

            setNewPost(true);
          }}
        >
          <AiOutlinePlus />{" "}
        </button>
        <button
          onClick={() => {
            navigate("/comingpage");
            setNavMenu(arr[6]);
          }}
        >
          <IoIosNotificationsOutline />
        </button>

        <button onClick={() => navigate("/comingpage")}>
          <FcAdvertising /> <p>Advertise</p>
        </button>
      </div>
      <div
        className="reddit_clone-nav_username"
        onClick={handleOptions}
        ref={optionRef}
      >
        <div className="reddit_clone-nav_username_item">
          <div className="reddit_clone-nav_username_userphoto">
            {userPhoto ? (
              <img
                src={userPhoto}
                alt=""
                style={{
                  maxWidth: "2rem",
                  maxHeight: "2rem",
                }}
              />
            ) : (
              <img
                style={{ height: "25px" }}
                src="https://reddit-clone-jishnu.vercel.app/static/media/User%20Logo%20Half.7fa3e6a6376757ebe020.png"
                alt="userlogo"
              />
            )}
          </div>
          <div className="reddit_clone-nav_username_user">
            {" "}
            <p>{userName ? userName : ""}</p>
            <p>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                class="NavBar_karmaLogo__5wCDe"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="red"
                  d="M53.813 48.094c69.06 40.8 122.263 96.67 124.937 153.312-49.83.664-72.508-14.408-101.97-51 17.725 93.07 55.393 143.855 100.72 156.563-22.006 26.968-60.902 30.456-97.625 25.342 35.897 33.924 95.12 70.913 149.094 84.75-17.05 15.34-38.742 24.516-68 29.157 269.316 114.287 386.556 10.27 295.217-277.376-12.035 25.526-29.11 41.112-60.343 57.5-7.906-55.298-31.41-152.12-95.656-171.75 24.362 41.713 21.98 99.445-4 138.937C268.363 122.72 161.85 54.283 53.813 48.095zm308.28 236.656c26.127-.13 52.073 11.014 70.157 32.72 32.15 38.584 26.96 95.63-11.625 127.78-38.586 32.15-95.632 26.96-127.78-11.625-32.15-38.586-26.962-95.632 11.624-127.78 16.88-14.067 37.303-20.994 57.624-21.095z"
                ></path>
              </svg>
              1 karma
            </p>
          </div>
        </div>
        <FaEllipsisVertical className="reddit_clone-contact_icon" />
        {option && <Option />}
      </div>
    </div>
  );
};
const Navbar = () => {
  const [option, setOption] = useState(false);
  const navigate = useNavigate();
  const [navMenuWidth, setNavMenuWidth] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth > 1200);
  const [border, setBorder] = useState();
  const [searchText, setSearchText] = useState();
  const [posts, setPosts] = useState({});
  const [searchResultExists, setSearchResultExists] = useState(false);
  const {
    login,
    setShowForm,
    theme,
    setTheme,
    userName,
    setIsAllPage,
    menu,
    setMenu,
    navMenu,
    setNavMenu,
    setNewPost,
    setQr,
    apiPosts,
    setApiPosts,
    update,
    filterPost,
    setFilterPost,
    search,
    setSearch,
    pseudoPost,
  } = useContext(MyContext);
  const optionRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (optionRef.current && !optionRef.current.contains(e.target)) {
        setOption(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const getSearchResult = async () => {
    try {
      let response = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/post?search={"author.name":"${searchText}"}`,
        {
          headers: {
            projectID: "f104bi07c480",
          },
        }
      );
      const res = await response.json();
      console.log("search result", res);
      if (res.length === 0) {
        setSearchResultExists(false);
      } else {
        setPosts(res);
        setSearch(res);
        setSearchResultExists(true);
        navigate("/search");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const clearSearchResults = () => {
    setSearchResultExists(false);
    setSearchText("");
  };

  const handleGetAppClick = () => {
    navigate("/redditqr");
  };

  const handleLogin = () => {
    navigate("/signin");
  };
  const handleMouseIn = () => {
    if (!menu) {
      setBorder(style);
    }
  };
  const handleLeave = () => {
    if (border) {
      setBorder();
    }
  };
  return (
    <>
      <div className="reddit_clone-nav_fixed">
        <div className="reddit_clone-nav">
          <div className="reddit_clone-nav_icon">
            <div className="reddit_clone-nav_reddit_name">
              <FaReddit className="reddit_clone-nav_reddit_icon" />

              <svg
                className="reddit-logo"
                viewBox="0 0 57 18"
                height="72"
                width="72"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="currentColor">
                  <path d="M54.63,16.52V7.68h1a1,1,0,0,0,1.09-1V6.65a1,1,0,0,0-.93-1.12H54.63V3.88a1.23,1.23,0,0,0-1.12-1.23,1.2,1.2,0,0,0-1.27,1.11V5.55h-1a1,1,0,0,0-1.09,1v.07a1,1,0,0,0,.93,1.12h1.13v8.81a1.19,1.19,0,0,0,1.19,1.19h0a1.19,1.19,0,0,0,1.25-1.12A.17.17,0,0,0,54.63,16.52Z"></path>
                  <circle fill="#FF4500" cx="47.26" cy="3.44" r="2.12"></circle>
                  <path d="M48.44,7.81a1.19,1.19,0,1,0-2.38,0h0v8.71a1.19,1.19,0,0,0,2.38,0Z"></path>
                  <path d="M30.84,1.19A1.19,1.19,0,0,0,29.65,0h0a1.19,1.19,0,0,0-1.19,1.19V6.51a4.11,4.11,0,0,0-3-1.21c-3.1,0-5.69,2.85-5.69,6.35S22.28,18,25.42,18a4.26,4.26,0,0,0,3.1-1.23,1.17,1.17,0,0,0,1.47.8,1.2,1.2,0,0,0,.85-1.05ZM25.41,15.64c-1.83,0-3.32-1.77-3.32-4s1.48-4,3.32-4,3.31,1.78,3.31,4-1.47,3.95-3.3,3.95Z"></path>
                  <path d="M43.28,1.19A1.19,1.19,0,0,0,42.09,0h0a1.18,1.18,0,0,0-1.18,1.19h0V6.51a4.15,4.15,0,0,0-3-1.21c-3.1,0-5.69,2.85-5.69,6.35S34.72,18,37.86,18A4.26,4.26,0,0,0,41,16.77a1.17,1.17,0,0,0,1.47.8,1.19,1.19,0,0,0,.85-1.05ZM37.85,15.64c-1.83,0-3.31-1.77-3.31-4s1.47-4,3.31-4,3.31,1.78,3.31,4-1.47,3.95-3.3,3.95Z"></path>
                  <path d="M17.27,12.44a1.49,1.49,0,0,0,1.59-1.38v-.15a4.81,4.81,0,0,0-.1-.85A5.83,5.83,0,0,0,13.25,5.3c-3.1,0-5.69,2.85-5.69,6.35S10.11,18,13.25,18a5.66,5.66,0,0,0,4.39-1.84,1.23,1.23,0,0,0-.08-1.74l-.11-.09a1.29,1.29,0,0,0-1.58.17,3.91,3.91,0,0,1-2.62,1.12A3.54,3.54,0,0,1,10,12.44h7.27Zm-4-4.76a3.41,3.41,0,0,1,3.09,2.64H10.14A3.41,3.41,0,0,1,13.24,7.68Z"></path>
                  <path d="M7.68,6.53a1.19,1.19,0,0,0-1-1.18A4.56,4.56,0,0,0,2.39,6.91V6.75A1.2,1.2,0,0,0,0,6.75v9.77a1.23,1.23,0,0,0,1.12,1.24,1.19,1.19,0,0,0,1.26-1.1.66.66,0,0,0,0-.14v-5A3.62,3.62,0,0,1,5.81,7.7a4.87,4.87,0,0,1,.54,0h.24A1.18,1.18,0,0,0,7.68,6.53Z"></path>
                </g>
              </svg>
            </div>
            <div className="reddit_clone-nav_menu">
              <button
                className="reddit_clone-nav_menu_btn"
                onClick={() => {
                  if (menu === false) {
                    setShowMenu((p) => !p);
                  }
                }}
                onMouseEnter={handleMouseIn}
                onMouseLeave={handleLeave}
                style={border}
              >
                {navMenu ? navMenu : false}{" "}
                <div>
                  {menu === false && showMenu && windowWidth && (
                    <BsArrowBarLeft onClick={() => setMenu(true)} />
                  )}
                </div>
              </button>
              {showMenu && (
                <div>{menu ? <></> : <NavMenu width={navMenuWidth} />}</div>
              )}
            </div>
          </div>

          <div className="reddit_clone-nav_input">
            <div className="reddit_clone-nav_input_item">
              <input
                type="text"
                placeholder="🔍 Search Reddit"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    getSearchResult();
                  }
                }}
              />
              {searchResultExists && (
                <MdOutlineCancel
                  className="cancel-icon"
                  style={{ color: "black" }}
                  onClick={clearSearchResults}
                />
              )}
            </div>
            {login && (
              <div className="reddit_clone-mid_icons">
                <button
                  onClick={() => {
                    navigate("/popular");
                    setNavMenu(arr[1]);
                    setIsAllPage(false);
                  }}
                >
                  <BsArrowUpRightCircle />{" "}
                </button>
                <button
                  onClick={() => {
                    navigate("/coins");
                    setNavMenu(arr[7]);
                  }}
                >
                  <CiCoinInsert />{" "}
                </button>
              </div>
            )}
          </div>
          {login ? (
            <NavIcon
              userName={userName}
              option={option}
              setOption={setOption}
            />
          ) : (
            <div className="reddit_clone-nav_login_part">
              <button
                className="reddit_clone-nav_getapp"
                onClick={handleGetAppClick}
              >
                {" "}
                <BsQrCodeScan /> Get App
              </button>
              <button className="reddit_clone-nav_login" onClick={handleLogin}>
                <BiLogIn /> Login
              </button>
              <div
                className="reddit_Clone-nav_before_login"
                onClick={() => setOption((p) => !p)}
                ref={optionRef}
              >
                <HiDotsHorizontal className="reddit_clone-contact_icon" />
                {/* <BsChevronDown /> */}
                {option && <Option />}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
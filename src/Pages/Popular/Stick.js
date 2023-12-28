import React, { useContext, useState } from "react";
import { BsFileBarGraph } from "react-icons/bs";
import { CiSun } from "react-icons/ci";
import { FaHotjar } from "react-icons/fa";
// import { initialPosts } from "../../Components/initialPosts";
import { MyContext } from "../../Utils/MyContext";
import "./Stick.css";


const Stick = () => {
  const { update, apiPosts, filterPost, setFilterPost } = useContext(MyContext);
  const [active, setActive] = useState("");


  return (
    <div className="reddit_clone-popular_stick" >
      <div
        className="reddit_clone-popular_stick_item"
        style={{
          color: active === "Hot" ? "var(--color-a)" : "var(--color-text)",
        }}
        // onClick={handleHot}
      >
        <FaHotjar
          style={{
            color: active === "Hot" ? "var(--color-a)" : "var(--color-text)",
          }}
        />
        <a
          style={{
            color: active === "Hot" ? "var(--color-a)" : "var(--color-text)",
          }}
        >
          {" "}
          Hot{" "}
        </a>
      </div>
     
      <div
        className="reddit_clone-popular_stick_item"
        style={{
          color: active === "New" ? "var(--color-a)" : "var(--color-text)",
        }}
        // onClick={handleNew}
      >
        <CiSun
          style={{
            color: active === "New" ? "var(--color-a)" : "var(--color-text)",
          }}
        />
        <a
          style={{
            color: active === "New" ? "var(--color-a)" : "var(--color-text)",
          }}
        >
          New
        </a>
      </div>
      <div
        className="reddit_clone-popular_stick_item"
        style={{
          color: active === "Top" ? "var(--color-a)" : "var(--color-text)",
        }}
        // onClick={handleTop}
      >
        <BsFileBarGraph
          style={{
            color: active === "Top" ? "var(--color-a)" : "var(--color-text)",
          }}
        />
        <a
          style={{
            color: active === "Top" ? "var(--color-a)" : "var(--color-text)",
          }}
        >
          Top
        </a>
      </div>
    </div>
  );
};

export default Stick;

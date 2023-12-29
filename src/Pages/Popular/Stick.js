import React, { useState } from "react";
import { BsFileBarGraph } from "react-icons/bs";
import { CiSun } from "react-icons/ci";
import { FaHotjar } from "react-icons/fa";
import "./Stick.css";

const Stick = ({ filterHot, filterNew, filterTop, showAll }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="reddit_clone-popular_stick">
      <div
        className={`reddit_clone-popular_stick_item ${activeFilter === "Hot" ? "active" : ""}`}
        onClick={() => {
          setActiveFilter("Hot");
          filterHot();
        }}
      >
        <FaHotjar
          style={{ color: activeFilter === "Hot" ? "#6A5CFF" : "#0c0c0c" }}
        />
        <a style={{ color: activeFilter === "Hot" ? "#6A5CFF" : "#0c0c0c" }}>
          Hot
        </a>
      </div>
      <div
        className={`reddit_clone-popular_stick_item ${activeFilter === "New" ? "active" : ""}`}
        onClick={() => {
          setActiveFilter("New");
          filterNew();
        }}
      >
        <CiSun
          style={{ color: activeFilter === "New" ? "#6A5CFF" : "#0c0c0c" }}
        />
        <a style={{ color: activeFilter === "New" ? "#6A5CFF" : "#0c0c0c" }}>
          New
        </a>
      </div>
      <div
        className={`reddit_clone-popular_stick_item ${activeFilter === "Top" ? "active" : ""}`}
        onClick={() => {
          setActiveFilter("Top");
          filterTop();
        }}
      >
        <BsFileBarGraph
          style={{ color: activeFilter === "Top" ? "#6A5CFF" : "#0c0c0c" }}
        />
        <a style={{ color: activeFilter === "Top" ? "#6A5CFF" : "#0c0c0c" }}>
          Top
        </a>
      </div>
      <div
        className={`reddit_clone-popular_stick_item ${activeFilter === "All" ? "active" : ""}`}
        onClick={() => {
          setActiveFilter("All");
          showAll();
        }}
      >
        <span style={{ color: activeFilter === "All" ? "#6A5CFF" : "#0c0c0c" }}>
          All
        </span>
      </div>
    </div>
  );
};

export default Stick;


 

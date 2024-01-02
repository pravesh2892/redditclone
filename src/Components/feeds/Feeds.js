import React, { useEffect, useState } from "react";
import "./feeds.css";
import Feed from "./Feed";
import Stick from "../../Pages/Popular/Stick";

const Feeds = ({ showStick = true }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://academics.newtonschool.co/api/v1/reddit/post?limit=100", {
        method: 'GET',
        headers: {
          projectID: "f104bi07c480",
        },
      });
      const data = await response.json();
      console.log("api data", data)
      setPosts(data?.data || []);
      setFilteredPosts(data?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const removePost = (postId) => {
    const updatedPosts = posts.filter((post) => post._id !== postId);
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts); 
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const showAllPosts = () => {
    setFilter("All");
    setFilteredPosts(posts);
  };

  const filterPosts = (type) => {
    setFilter(type);
    let filtered = [];

    if (type === 'Hot' || type === 'New' || type === 'Top') {
      filtered = shuffleArray(posts).slice(0, 10); 
    }

    setFilteredPosts(filtered);
  };

  return (
    <div>
      {showStick && (
        <Stick
          filterHot={() => filterPosts("Hot")}
          filterNew={() => filterPosts("New")}
          filterTop={() => filterPosts("Top")}
          showAll={showAllPosts}
        />
      )}
      <div className="feeds">
        {filteredPosts.map((fed) => (
          <Feed fed={fed} key={fed._id} removePost={removePost} />
        ))}
      </div>
    </div>
  );
};

export default Feeds;


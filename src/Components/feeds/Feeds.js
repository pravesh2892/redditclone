import React, { useEffect, useState } from "react";
import "./feeds.css";

import Feed from "./Feed";

const Feeds = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://academics.newtonschool.co/api/v1/reddit/post?limit=100", {
          method: 'GET',
          headers: {
            projectID: "f104bi07c480",
          },
        });
        const data = await response.json();
        setPosts(data?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const removePost = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  return (
    <div className="feeds">
      {posts.map((fed) => (
        <Feed fed={fed} key={fed._id} removePost={removePost} /> 
      ))}
    </div>
  );
};

export default Feeds;

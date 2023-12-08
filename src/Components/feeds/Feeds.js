import React, { useEffect, useState } from "react";
import "./feeds.css";

import Feed from "./Feed";

const Feeds = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://academics.newtonschool.co/api/v1/reddit/post?limit=100", {
          method: 'GET',
            headers: {
              projectID: "f104bi07c490",
            },
          }
        );
        const data = await response.json();
        console.log(data)
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="feeds">
      {posts?.data?.map((fed) => (
       <Feed fed={fed} key={fed._id}/> 
      ))}
    </div>
  );
};

export default Feeds;
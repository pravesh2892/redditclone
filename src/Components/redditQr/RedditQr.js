import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Reddit.css";


const RedditQr = () => {
    const navigate = useNavigate();

    const handleClose = () => {
     navigate("/");
    };
  
  return (
   
    <div className="reddit_clone-redditQr">
      <div className="reddit_clone-redditQr_container">
        <div className="reddit_clone-RedditQr_get_app">
          <h1>Get the Reddit app </h1>
          <button onClick={handleClose}>X</button>
        </div>
        <div className="reddit_clone-RedditQr_scan">
          <p>Scan this QR code to download the app now</p>
          <img src="https://www.redditstatic.com/shreddit/assets/shreddit-qr-code.svg" alt="" />
        </div>
        <div className="reddit_clone-RedditQr_footer">
          <p>Or Check it out in App Store</p>
          <div className="reddit_clone-RedditQr_button">
          <a href="https://play.google.com/store/apps/details?id=com.reddit.frontpage" target="_blank">
            <img  src="https://www.redditstatic.com/shreddit/assets/google-play.svg" alt="Get it on Google Play" />
          </a>
          <a href="https://apps.apple.com/US/app/id1064216828" target="_blank">
            <img  src="https://www.redditstatic.com/shreddit/assets/app-store.svg" alt="Download on the App Store" />
          </a>
        </div>
        </div>
      </div>
    </div>
  );
};

export default RedditQr;
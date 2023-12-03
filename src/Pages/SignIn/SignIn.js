
import React, { useContext, useEffect, useState } from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

import "./SignIn.css";


const SignIn = () => {
    const navigate = useNavigate();

    const handleClosepage = () => {
     navigate("/");
    };
  return (
    <div className="reddit_clone-login">
      <div className="reddit_clone-login_close">
        <button onClick={handleClosepage}>X</button>
      </div>
      <div className="reddit_clone-login_container">
        <div className="reddit_clone-login_heading">
          <h3>Log In</h3>
          <p>
            By continuing, you are setting up a Reddit account and agree to our{" "}
            <a href=""> User Agreement </a>
            and <a href=""> Privacy Policy.</a>
          </p>
        </div>
        <div className="reddit_clone-login_shortcut">
          <button >
            <FcGoogle style={{ fontSize: "1.2rem" }} />{" "}
            Continue with Google
          </button>
          <button>
            {" "}
            <FaApple style={{ fontSize: "1.2rem" }} />{" "}
            Continue with Apple
          </button>
        </div>
        
         <hr  style={{width:"70%", marginLeft:"65px"}} />
      
        <p style={{ color: "green" }}>{}</p>
        <form className="reddit_clone-login_input" >
          <input
            type="email"
            placeholder="Email"
            name="email"
            // onChange={handleChange}
            required
            // value={inp.username}
          />
          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            // onChange={handleChange}
            // value={inp.password}
          />
          <p>
            Forgot your <a href="">username</a> of <a href="">password </a> ?
          </p>
          <button>Login</button>
        </form>
        <Link to="/signup">
        <p>
          New to Reddit?{" "}
          <a
            href=""
            // onClick={(e) => {
            //   e.preventDefault();
            //   setShowForm("Signup");
            // }}
          >
            signup
          </a>{" "}
        </p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    const navigate = useNavigate();

    const handleClosepage = () => {
     navigate("/");
    };


  return (
    <div className="reddit_clone-signup">
      <div className="reddit_clone-signup_close">
        <button onClick={handleClosepage}>X</button>
      </div>
      <div className="reddit_clone-signup_container">
        <div className="reddit_clone-signup_heading">
          <h3>Sign Up</h3>
          <p>
            By continuing, you are setting up a Reddit account and agree to our{" "}
            <a href=""> User Agreement </a>
            and <a href=""> Privacy Policy.</a>
          </p>
        </div>
        <div className="reddit_clone-signup_shortcut">
          <button>
            <FcGoogle style={{ fontSize: "1rem", marginRight: "2rem" }} />{" "}
            Continue with Google
          </button>
          <button>
            {" "}
            <FaApple style={{ fontSize: "1rem", marginRight: "2rem" }} />{" "}
            Continue with Apple
          </button>
        </div>
        <hr />
        <form className="reddit_clone-signup_input" >
          <input
            type="email"
            placeholder="Email"
            // value={email}
            required
            // onChange={(e) => setEmail(e.target.value)}
          />
          <p>
            Forgot your <a href="">username</a> of <a href="">password </a> ?
          </p>
          <button style={{ letterSpacing: "1px" }}>Continue</button>
        </form>
        <Link to="/signin">
        <p>
          Already a Redditor?{" "}
          <a
            href=""
            // onClick={(e) => {
            //   e.preventDefault();
            //   setShowForm("Login");
            // }}
          >
            Login
          </a>{" "}
        </p>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
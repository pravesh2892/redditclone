import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { TextField, Button, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { MyContext } from "../../Utils/MyContext";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    setLogin,
    setUserName,
    setUserPhoto,
    setUserId,
    message,
    setMessage,
  } = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(""); 
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const getUserData = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });

    // Reset email error message when the user types in the email field
    if (name === "email") {
      setEmailError("");
    }
  };

  const postData = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (email && password) {
      const data = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectId: "f104bi07c480",
          },
          body: JSON.stringify({
            email,
            password,
            appType: "reddit",
          }),
        }
      );

      if (data) {
        setUser({
          email: "",
          password: "",
        });
        let json = await data.json();
       

        if (json.status === "fail") {
          setError(json.message); 
          if (json.error === "invalid_email_or_password") {
            setEmailError("Invalid email or password"); 
          }
        } else {
          setError("");
          localStorage.setItem("jwt", json.token);
          const userName = json.data.name;
          setUserName(userName);
          setLogin(true);
          const userPhotoUrl =
            "https://reddit-clone-jishnu.vercel.app/static/media/User%20Logo%20Half.7fa3e6a6376757ebe020.png";
          setUserPhoto(userPhotoUrl);

          alert("Login Successfully");
          navigate("/");
        }
      }
    } else {
      alert("Please fill all the data");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

        <p style={{ color: "green" }}>{}</p>
        <form className="reddit_clone-login_input">
          {error && <Alert variant="danger" style={{color:"red"}}>{error}</Alert>}
          <TextField
            placeholder="Enter your email"
            type="text"
            name="email"
            fullWidth
            value={user.email}
            onChange={getUserData}
            sx={{
              marginBottom: 2,
              borderRadius: "1.5rem",
            }}
          />
          {emailError && (
            <p style={{ color: "red", marginBottom: "5px" }}>{emailError}</p>
          )}
          <TextField
            placeholder="Enter your Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={user.password}
            fullWidth
            onChange={getUserData}
            sx={{
              marginBottom: 2,
              borderRadius: "1.5rem",
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  size="small"
                  style={{ padding: 0 }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
         
          <button onClick={postData} className="login-button">
            Login
          </button>
        </form>
        <Link to="/signup">
          <p>
            New to Reddit? <a href="">signup</a>{" "}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;

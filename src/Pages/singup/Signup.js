import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, TextField, Button, IconButton, FormHelperText } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {  Alert } from "react-bootstrap";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const getUserData = (event) => {
    let name, value;
    name = event.target.name;
    value = event.target.value;

    if (name === "age") {
      const ageValue = parseInt(value);
      if (!isNaN(ageValue) && ageValue >= 0) {
        setUser({ ...user, [name]: ageValue });
      } else {
        alert("Please enter a valid age, and it should be a number");
      }
    } else {
      setUser({ ...user, [name]: value });

      // Email validation
      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setError("Please enter a valid email address");
        } else {
          setError("");
        }
      }
    }
  };

    const postData = async (e) => {
      e.preventDefault();
  
      const { name, email, password } = user;
  
      if (name && email && password) {
        const data = await fetch("https://academics.newtonschool.co/api/v1/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectId: "f104bi07c480",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            appType: "reddit",
          }),
        });
        if (data) {
          setUser({
            name: "",
            email: "",
            password: "",
          });
          let json = await data.json();
          console.log(json);
          if (json.status === "fail") {
            alert(json.message);
          } else {
            alert("Signup Succesfully");
            navigate("/signin");
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
        <form className="reddit_clone-signup_input" >
       
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={user.name}
            onChange={getUserData}
            sx={{ marginBottom: 2 }}
          >
            Name
          </TextField>
          <TextField
          label="Email"
          type="text"
          name="email"
          value={user.email}
          fullWidth
          onChange={getUserData}
          error={error ? true : false} // Set error state for red border
          helperText={error} // Display error message
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: "red",
            },
          }}
        />
          <TextField
            label="Password"
            name="password"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={user.password}
            onChange={getUserData}
            sx={{ marginBottom: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  size="small"
                  style={{ padding: 0 }}
                >
                  {showPassword ? <VisibilityOffIcon  /> : <VisibilityIcon  />}
                </IconButton>
              ),
            }}
          />
          
          <button 
          className="submit-button" 
          onClick={postData}
          style={{ letterSpacing: "1px" }}>Continue</button>
        </form>
        <Link to="/signin">
        <p>
          Already a Redditor?{" "}
          <a
            href=""
           style={{color:"#0079ff"}}
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
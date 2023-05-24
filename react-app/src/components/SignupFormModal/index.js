import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom";
import SignupFormCSS from "./SignupForm.module.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {}
    if(password.length < 6) errors.password = "Password must be at least 6 characters long"
    if(username.length < 4) errors.username = "Username must be at least 4 characters long"
    if(username.length > 20) errors.username = "Username can not be greater than 20 characters"
    if(!email.includes("@") || email.length < 4) errors.email = "Please enter a vaild email"
    if(Object.values(errors).length > 0) {
      setErrors([...Object.values(errors)])
      return
    } 

    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password))
      if (data) {
        setErrors(data);
      } else {
        closeModal();
        return history.push("/feed");
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div className={SignupFormCSS["container"]}>
      <h1>Sign Up</h1>
      <form 
     
      onSubmit={handleSubmit}>
        <div style={{listStyle: "none", color: "red", margin: "20px"}}>
          {errors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
        </div>
        <label>
          Email
        </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label>
          Username
        </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        <label>
          Password
        </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <label>
          Confirm Password
        </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        <button style={{backgroundColor: "black", color: "white", padding: "7px", marginBottom: "10px"}} type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;

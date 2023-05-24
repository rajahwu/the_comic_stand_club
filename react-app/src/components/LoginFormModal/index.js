import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import LoginFormCSS from "./LoginForm.module.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(["Credential invalid"]);
    } else {
      closeModal();
      return history.push("/feed");
    }
  };

  return (
    <div className={LoginFormCSS["container"]}>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ listStyle: "none", color: "red", margin: "20px" }}>
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
          Password
        </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button
          style={{ backgroundColor: "black", color: "white", padding: "10px", marginBottom: "10px"}}
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;

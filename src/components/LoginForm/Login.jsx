import { useState } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState({});
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );

  const users = [{ username: "arya@gmail.com", password: "test123" }];

  const validate = () => {
    let tempErrors = {};
    tempErrors.username = username ? "" : "Email is required";
    if (username) {
      tempErrors.username = /\S+@\S+\.\S+/.test(username) ? "" : "Username is not valid";
    }
    tempErrors.password = password ? "" : "Password is required";
    if (password) {
      tempErrors.password = password.length >= 6 ? "" : "Password must be at least 6 characters long";
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const account = users.find((user) => user.username === username);

    if (validate() && (account.username === username && account.password === password)) {
      localStorage.setItem("authenticated", true);
      navigate("/Home");
    }
  };



  return (
    <div className="loginContainer">
      <form className="formLogin" onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              name="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          {errors.username && <p className="errorMsg">{errors.username}</p>}
          <div className="input">
            <input
              type="password"
              name="Password"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          {errors.password && <p className="errorMsg">{errors.password}</p>}
        </div>
        <div className="submit">
          <input className="loginBtn" type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
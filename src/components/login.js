import { useState } from "react";
import service from "../service";
import { useNavigate } from "react-router-dom";
import "../App.css";
const Login = () => {
  const navigate = useNavigate();
  const [loginMobile, setloginMobile] = useState("");
  const [loginEmail, setloginEmail] = useState("");
  const loginSubmit = (event) => {
    event.preventDefault();
    const bodyData = {
      mobile: loginMobile,
      email: loginEmail,
    };
    if (bodyData.mobile && bodyData.email !== 0) {
      service
        .login(bodyData)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/user_form");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      alert("Email and Mobile Number cannot be empty");
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-center mt-2">
        <h3>LOGIN PAGE</h3>
      </div>
      <div className="d-flex justify-content-center maindiv">
        <div className="card shadow-lg p-3 mb-5 bg-body rounded cardheight">
          <form>
            <div className="mb-3 ps-4 pe-4">
              <strong>Mobile Number</strong>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={loginMobile}
                onChange={(e) => setloginMobile(e.target.value)}
              />
            </div>
            <div className="mb-3 ps-4 pe-4">
              <strong>Email address</strong>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your Email"
                value={loginEmail}
                onChange={(e) => setloginEmail(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary buttonwidth"
                onClick={loginSubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

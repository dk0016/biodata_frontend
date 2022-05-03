import { useState, useRef } from "react";
import service from "../service";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Tostification from "../helper/toast";

const Login = () => {
  const navigate = useNavigate();
  const [loginMobile, setloginMobile] = useState("");
  const [loginEmail, setloginEmail] = useState("");
  const myRef = useRef();
  //If we remove the [] in useEffect it will runs the code in runtime

  // useEffect(()=>{
  //   myRef.current.toastSuccess("Success");
  //   myRef.current.toastError("something went wrong")
  //   myRef.current.toastWarning("warning")
  // },[])

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
          myRef.current.toastSuccess("Login Successfully");
        })
        .catch((err) => {
          myRef.current.toastError("Invalid credentials");
        });
    } else {
      myRef.current.toastError("Mobile & E-mail can't be empty");
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
          <Tostification ref={myRef}></Tostification>
        </div>
      </div>
    </div>
  );
};

export default Login;

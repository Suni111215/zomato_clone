import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

export default function Header(props) {
  let onSuccess = (Response) => {
    let token = Response.credential;
    console.log(token);
    localStorage.setItem("Zomatoclone", token);
    alert("Login successful");
    window.location.assign("/");
  };
  let onError = () => {
    console.log("Login Failed");
  };
  let logout = () => {
    let dologout = window.confirm("Are you sure?");
    if (dologout === true) {
      localStorage.removeItem("Zomatoclone");
      window.location.assign("/");
    }
  };
  let getlogindata = () => {
    let token = localStorage.getItem("Zomatoclone");
    if (token === null) {
      return false;
    } else {
      try {
        let resultlogin = jwtDecode(token);
        console.log(resultlogin);
        return resultlogin;
      } catch (error) {
        //remove toekn from local storage
        localStorage.removeItem("Zomatoclone");
        return false;
      }
    }
  };
  let [User, setUser] = useState(getlogindata());
  return (
    <GoogleOAuthProvider clientId="604505327139-hkqk530qokaued33tc1m4h5uuonn7561.apps.googleusercontent.com">
      <div>
        {" "}
        <div className="modal" tabIndex="-1" id="google-login">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <GoogleLogin onSuccess={onSuccess} onError={onError} />;
              </div>
            </div>
          </div>
        </div>
        <header id="header ">
          <div className={`row m-auto ${props.bg}`}>
            <div className="col-4 col-sm-5 col-md-5 col-lg-1 my-3 ">
              {/* {props.bg ? ( */}
              <a id="e" href="/">
                e!
              </a>
              {/* ) : null} */}
            </div>
            <div className=" col-1 col-sm-1 col-md-3 col-lg-8  "></div>
            <div className="col-7 col-sm-6 col-md-4 col-lg-3 my-3 text-center ">
              {User === false ? (
                <button
                  id="bbtn1"
                  className="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#google-login"
                >
                  Login
                </button>
              ) : (
                <>
                  <span className="fw-bold text-white">
                    Welcome, {User.name.toUpperCase()}
                  </span>
                  <button
                    onClick={logout}
                    id="bbtn1"
                    className="btn btn-outline-light ms-3 sm"
                  >
                    Logout
                  </button>
                </>
              )}
              ;
            </div>
          </div>
        </header>
      </div>
    </GoogleOAuthProvider>
  );
}

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function LandingPage() {
  const router = useNavigate();
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Apna Video Call</h2>
        </div>
        <div className="navList">
          <p
            onClick={() => {
              router("/ahgaha");
            }}
          >
            Join as guest
          </p>
          <p
            onClick={() => {
              router("/auth");
            }}
          >
            Register
          </p>
          <div role="button">
            <p
              onClick={() => {
                router("/auth");
              }}
            >
              Login
            </p>
          </div>
        </div>
      </nav>

      <div className="landingPageMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect </span>with your loved
            ones
          </h1>
          <p>cover a distance by apna video call</p>
          <div role="button">
            <Link to={"/auth"}>Get started</Link>
          </div>
        </div>
        <div>
          <img src="/mobile.png" alt="mobile_png" />
        </div>
      </div>
    </div>
  );
}

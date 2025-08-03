import React, { use, useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import "../App.css";
import HistoryIcon from "@mui/icons-material/History";
import { Button, IconButton, TextField } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  let navigate = useNavigate();

  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      <div className="navbar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>Apna Video Call</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => {
              navigate("/history");
            }}
          >
            <HistoryIcon />
          </IconButton>
          <p style={{ fontSize: "medium" }}>History</p>
          <Button
            style={{ color: "red" }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="meetContainer">
        <div className="left-Pannel">
          <h3>Providing Quality Video Calls</h3>
          <TextField
            variant="outlined"
            label="meeting code"
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value)}
            style={{ marginTop: "20px" }}
          />
          <Button
            variant="contained"
            style={{ marginTop: "22px", marginLeft: "10px", height: "50px" }}
            onClick={handleJoinVideoCall}
          >
            Join
          </Button>
        </div>
        <div className="rightPannel">
          <img src="\logo3.png" alt="meeting_img" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);

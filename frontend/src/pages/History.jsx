import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../contexts/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);
  let [open, setOpen] = React.useState(false);

  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const History = await getHistoryOfUser();
        setMeetings(History);
      } catch (e) {
        //implement Snackbar
        console.log(e);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <IconButton
        onClick={() => {
          routeTo("/home");
        }}
      >
        <HomeIcon />
      </IconButton>
      {meetings.map((e, i) => {
        return (
          <>
            <Card key={i} variant="outlined">
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  {e.meetingCode}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  {formatDate(e.date)}
                </Typography>
              </CardContent>
            </Card>
          </>
        );
      })}
    </div>
  );
}

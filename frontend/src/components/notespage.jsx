import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Sidebar from "./sidebar";
import Notecard from "./notecard";
import Header from "./header";

function Notespage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [newnote, setNewNote] = useState(false);
  const [deleteNote, setDeleteNote] = useState(false);

  useEffect(() => {
    fetchData();
  }, [newnote, deleteNote]);

  const fetchData = async () => {
    try {
      const url = "http://localhost:8080/getnotes";
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }
      const response = await axios({
        url: url,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        method: "GET",
      });

      if (response.status === 200) {
        setNotes(response.data.notes);
        setNewNote(false);
      } else {
        setError(response.data);
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="notespage" style={{
      overflow: "hidden",
      background: "linear-gradient(to bottom, #333333, #111111)",
      height: "100vh",
    }} >
      <Grid container >
        <Grid item xs={12} ml={12}>
          <Sidebar setNewNote={setNewNote} />
        </Grid>
      </Grid>

      <Grid container spacing={2} ml={10}>
      <Grid item xs={12} >
          <Header />
        </Grid>
      </Grid>
      <Grid container spacing={2} ml={3} mt={1}>
        <Grid item xs={6} md={12} ml={12} >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px", // Adjust as needed
              minWidth: "300px", // Set a minimum width
            }}
          >
            {notes.map((note) => (
              <Notecard
                key={note.id}
                note={note}
                setNewnote={setNewNote}
                setdeleteNote={setDeleteNote}
              />
            ))}
          </div>
          <Typography>{error}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Notespage;

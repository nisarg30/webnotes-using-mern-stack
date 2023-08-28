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
    <div className="notespage">
      <Grid container spacing={2}>
      <Grid item xs={12} ml={12}>
          <Header />
        </Grid>
        <Grid item xs={1} md={1}>
          <Sidebar setNewNote={setNewNote} />
        </Grid>
        <Grid item xs={3} md={9} mt={2}>
          <Grid container spacing={1} >
            {notes.map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note.id}>
                <Notecard
                  note={note}
                  setNewnote={setNewNote}
                  setdeleteNote={setDeleteNote}
                />
              </Grid>
            ))}
          </Grid>
          <Typography>{error}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Notespage;

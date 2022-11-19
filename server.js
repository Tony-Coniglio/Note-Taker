const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");

const uuid = require("uuid");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

app.post("/api/notes", (req, res) => {
    // get current notes
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    // get new note
    const newNotes = req.body;
    // add a new porp called id to new note
    newNotes.id = uuid.v4(); //uuid gens a unique id 
    // add new note to array of notes
    notes.push(newNotes); 
    // overite old file w/ new info
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    // send back all notes
    res.json(notes);
})

app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync(".db/db.json"));
    const deleteNote = notes.filter((removeNote) => removeNote.id !== req.params.id);
    fs.writeFileSync("/db/db.json", JSON.stringify(deleteNote));
    res.json(deleteNote)
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, function () {
    console.log("Listening on Port " + PORT);
});
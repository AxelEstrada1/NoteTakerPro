const express = require("express");
const path = require("path");
// Helper method for generating unique ids
const uuid = require("uuid");
const fs = require("fs").promises;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json()); //understand content-type : application/json
app.use(express.urlencoded({ extended: true })); // understands content that is urlencoded

app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
  req.body.id = uuid.v4();
  fs.readFile("./db/db.json")
    .then((data) => {
      let newNotes = JSON.parse(data); //store parsed JSON into a new variable
      newNotes.push(req.body); //push new notes into the req.body
      return newNotes;
    })
    .then((notes) => {
      return fs.writeFile(`./db/db.json`, JSON.stringify(notes)); //object Object without stringify
    })
    .then(() => res.json(req.body));
});

// app.delete("/api/notes", (req, res) => {
//   //pull from url
//   // remove item from array
//   // write to file
// });

//Delete button
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("./db/db.json")
    .then((data) => {
      let notes = JSON.parse(data);
      let index = notes.findIndex((note) => note.id === id);
      if (index !== -1) {
        notes.splice(index, 1);
        return fs.writeFile(`./db/db.json`, JSON.stringify(notes));
      } else {
        throw new Error("Note not found");
      }
    })
    .then(() => res.status(204).send())
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server error");
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
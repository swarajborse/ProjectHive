import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

const PORT = 3000;


app.get("/notes", (req, res) => {
  const data = JSON.parse(fs.readFileSync("notes.json", "utf-8"));
  res.json(data);
});


app.post("/notes", (req, res) => {
  const data = JSON.parse(fs.readFileSync("notes.json", "utf-8"));
  const newNote = { id: Date.now(), text: req.body.text };
  data.push(newNote);
  fs.writeFileSync("notes.json", JSON.stringify(data, null, 2));
  res.status(201).json({ message: "Note added", note: newNote });
});


app.delete("/notes/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync("notes.json", "utf-8"));
  data = data.filter((note) => note.id != req.params.id);
  fs.writeFileSync("notes.json", JSON.stringify(data, null, 2));
  res.json({ message: "Note deleted" });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

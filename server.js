// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


//Routes
// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
  });
  
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Create New Note - takes in JSON input
app.post("/api/notes", function(req, res) {
    var new_notes = req.body;
    var notes = fs.readFileSync("./db/db.json");
    new_notes.id = String(notes.length);
    notes = JSON.parse(notes);
    notes.push(new_notes);
    fs.writeFileSync("./db/db.json",JSON.stringify(notes));
    res.json(notes);
});

// app.delete("/api/notes/:id", function(req, res){
//     var noteId = req.params.id;
//     notes = fs.readFileSync("./db/db.json");
//     notes = JSON.parse(notes);
//     notes = notes.filter(function(note){
//         if (noteId === note.id){
//             return false;
//         }else{
//             return true;
//         }
//     })
//     fs.writeFileSync("./db/db.json", JSON.stringify(notes));
//     res.json(notes);
// });
  
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
console.log("App listening on PORT " + PORT);
});

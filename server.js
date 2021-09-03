// load up the express framework and body-parser helper
const express = require('express');
const path = require('path');
const { notes } = require('./data/db')

//===============================================================================
// create an instance of express to serve our end points
const app = express();

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require('fs');

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
//===============================================================================

const hide = (elem) => {
  elem.style.display = 'none';
};






//===============================================================================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  console.log(notes)
  return res.json(notes)
});

app.get('/api/notes/:id', (req, res) => {
  const note = req.params.id;

  console.log(note);

  for (let i = 0; i < notes.length; i++) {
    if (note === notes[i].id) {
      return res.json(notes[i]);
    }
  }

  return res.json(false);
});

app.post('/api/notes', (req, res) => {
  req.body.id = notes.length.toString();
  const newNote = req.body;
  console.log(newNote);
  notes.push(newNote);
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res)  => {
  const note = req.params.id;

  console.log(note);

  for (let i = 0; i < notes.length; i++) {
    if (note === notes[i].id) {
      notes.splice(note, 1)
    }
  }

  return res.json(false);
})



// finally, launch our server on port 3001.
const server = app.listen(3001, () => {
  console.log('listening on port %s...', server.address().port);
});


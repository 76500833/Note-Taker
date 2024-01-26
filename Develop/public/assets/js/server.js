// const getNotes = () =>
//   fetch('/api/notes', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

// const saveNote = (note) =>
//   fetch('/api/notes', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(note)
//   });

// const deleteNote = (id) =>
//   fetch(`/api/notes/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

const express = require('express');
const fs = require('fs');
const path = require('path');


const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static(path.join(__dirname, '../../../public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/notes.html'));
  });



  //TODO make post work by using fs to write notes to db.json
  app.post('/api/notes', (req, res) => {
    // Read the existing notes
    fs.readFile(path.join(__dirname, '../../../db/db.json'), 'utf8', (err, data) => {
      if (err) throw err;
  
      const notes = JSON.parse(data);
  
      // Create a new note with a unique id and add it to the notes array
      const newNote = { ...req.body, id: Date.now() };
      notes.push(newNote);
  
      // Write the updated notes array back to the file
      fs.writeFile(path.join(__dirname, '../../../db/db.json'), JSON.stringify(notes, null, 2), (err) => {
        if (err) throw err;
        res.json(newNote);
      });
    });
  });
  //* `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
  app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../../../db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to read notes' });
      }
  
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });


//   app.delete('/api/notes', (req, res) => {
//     res.json({
//       term: 'api',
//       description:
//         'An application programming interface, is a computing interface that defines interactions between multiple software intermediaries',
//     });
//   });
  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
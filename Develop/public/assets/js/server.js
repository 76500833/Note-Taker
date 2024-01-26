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
const path = require('path');


const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static(path.join(__dirname, '../../../public')));

//TODO Make route handlers for hese requests. 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/notes.html'));
  });

//   app.post('/api/notes', (req, res) => {
//     res.json({
//       term: 'api',
//       description:
//         'An application programming interface, is a computing interface that defines interactions between multiple software intermediaries',
//     });
//   });

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
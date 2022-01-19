module.exports = (app) => {
    const note = require('../controllers/notes.controller.js');

    // create note
    app.post('/notes', note.create);

    // retreive all notes
    app.get('/notes', note.findAll);

    // Retreve single note with given ID
    app.get('/notes/:noteId', note.findOne);

    // Update a note with given ID
    app.put('/notes/:noteId', note.update)

    // Delete a node with given ID
    app.delete('/notes/:noteId', note.delete);
}
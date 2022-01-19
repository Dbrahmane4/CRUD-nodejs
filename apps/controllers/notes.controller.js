const Note = require('../models/notes.model');

// Create and save notes

exports.create = (req, res) => {
    // Validating a note request
    if(!req.body.content){
        return res.status(400).send({
            message: "Note cannot be empty"
        })
    }

    // Create a note
    const note = new Note({
        title: req.body.title || "Untitled note",
        content: req.body.content
    });

    // Save a note in database
    note.save().then((data) => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message ||"Some error occured while creating a note"
        })
    })
};

// Read all notes
exports.findAll = (req, res) => {
    // Retreiving all the notes from the database
    Note.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured by Retrieving notes"
        })
    })
};

// Read single note by ID
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId).then(data => {
        if(!data){
            return res.status(404).send({
                message: "Note not found" + req.params.noteId
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Note not found" + req.params.noteId
            })
        }
        return res.status(500).send({
            message: err.message || "Some error occured by Retrieving note"
        })
    })
};

// Update a note using ID
exports.update = (req, res) => {
    // Validate request
    if(!req.body.content){
        return res.status(400).send({
            message: "Note cannot be empty"
        })
    }

    // Find a note and update it
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitles note",
        content: req.body.content
    }, {new: true}).then(data => {
        if(!data){
            return res.status(404).send({
                message: "Note not found with given ID" + req.params.noteId
            })
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Note not found" + req.params.noteId
            })
        }
        return res.status(500).send({
            message: err.message || "Some error occured by Updating note"
        })
    })

};

exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId).then(data => {
        if(!data){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }
        res.send({
            message: "Note successfully deleted"
        })
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};


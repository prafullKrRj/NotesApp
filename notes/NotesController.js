// NotesController.js
import mongoose from 'mongoose';
import Note from './NoteModel.js';

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({
            title,
            content,
            user: req.user._id
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// deleteNote function
export const deleteNote = async (req, res) => {
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send("No note with that id");
        }
        const note = await Note.findById(id);
        if (!note || note.user.toString() !== req.user._id.toString()) {
            return res.status(404).send("No note with that id");
        }
        await note.deleteOne();
        res.json({message: "Note deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
// getNotes function
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({user: req.user._id});
        res.json(notes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
// updateNote function
export const updateNote = async (req, res) => {
    try {
        const {id} = await req.params;
        const {title, content} = await req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send("No note with that id");
        }
        console.log(req.body)
        const newTitle = title + " updated";
        const updatedNote = {newTitle, content, _id: id};
        const note = Note.findById(id);
        if (!note || note.user.toString() !== req.user._id.toString()) {
            return res.status(404).send("No note exists");
        }
        await note.updateOne(updatedNote, {new: true});
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
// getNote by id function
export const getNote = async (req, res) => {
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send("No note with that id");
        }
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).send("No note with that id");
        }
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).send("Not authorized to access this note");
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
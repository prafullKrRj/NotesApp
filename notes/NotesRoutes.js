// NotesRoutes.js
import express from 'express';
import {createNote, deleteNote, getNote, getNotes, updateNote, deleteManyNotes} from './NotesController.js';
import authMiddleware from '../AuthMiddleware.js';

const notesRouter = express.Router();

notesRouter.get('/getAll', authMiddleware, getNotes);
notesRouter.post('/create', authMiddleware, createNote);
notesRouter.delete('/delete/:id', authMiddleware, deleteNote);
notesRouter.put('/update/:id', authMiddleware, updateNote);
notesRouter.get('/get/:id', authMiddleware, getNote);
notesRouter.delete('/deleteMany', authMiddleware, deleteManyNotes);
export default notesRouter;
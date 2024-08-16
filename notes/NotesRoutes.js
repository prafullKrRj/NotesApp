// NotesRoutes.js
import express from 'express';
import {createNote, deleteNote, getNote, getNotes, updateNote, deleteManyNotes} from './NotesController.js';
import authMiddleware from '../AuthMiddleware.js';

const notesRouter = express.Router();

notesRouter.get('/getAll', authMiddleware, getNotes);
notesRouter.post('/create', authMiddleware, createNote);
notesRouter.delete('/delete/:id', authMiddleware, deleteNote);
notesRouter.put('/update', authMiddleware, updateNote);
notesRouter.get('/get/:id', authMiddleware, getNote);
notesRouter.post('/deleteMany', authMiddleware, deleteManyNotes);
export default notesRouter;
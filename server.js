import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './auth/AuthRoutes.js';
import notesRouter from './notes/NotesRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
    dbName: 'notesApp'
})
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
    console.log(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
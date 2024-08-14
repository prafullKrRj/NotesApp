import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './auth/AuthRoutes.js';
import notesRouter from './notes/NotesRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

app.get('/', (req, res) => {
    res.send(`
        <html lang="">
            <head>
                <title>Notes App API Documentation</title>
            </head>
            <body>
                <h1>Notes App API Documentation</h1>
                <h2>Authentication Endpoints</h2>
                <ul>
                    <li><strong>POST /api/auth/login</strong>: Login and receive a token</li>
                    <li><strong>POST /api/auth/register</strong>: Register a new user</li>
                </ul>
                <h2>Notes Endpoints</h2>
                <ul>
                    <li><strong>GET /api/notes/getAll</strong>: Get all notes (requires token)</li>
                    <li><strong>GET /api/notes/get/:id</strong>: Get a note by ID (requires token)</li>
                    <li><strong>POST /api/notes</strong>: Create a new note (requires token)</li>
                    <li><strong>PUT /api/notes/update/:id</strong>: Update a note by ID (requires token)</li>
                    <li><strong>DELETE /api/notes/delete/:id</strong>: Delete a note by ID (requires token)</li>
                </ul>
                <h2>How to Use</h2>
                <p>To use the API, you need to include the token in the Authorization header as follows:</p>
                <pre>
                    Authorization: Bearer &lt;your_token_here&gt;
                </pre>
            </body>
        </html>
    `);
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
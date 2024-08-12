import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from "./auth/AuthRoutes.js";
import notesRouter from "./notes/NotesRoutes.js";

dotenv.config()
const app = express()

app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/notes", notesRouter)

mongoose.connect("mongodb://localhost:27017/notesApp")
    .then(() => {
        console.log("Connected to MongoDB")
    }).catch(err => {
    console.log(err)
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
import User from './UserModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import userModel from "./UserModel.js";
import NoteModel from "../notes/NoteModel.js";
import Note from "../notes/NoteModel.js";

dotenv.config()
const secret = process.env.JWT_SECRET

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email: email})
        if (!user) {
            return res.status(404).send("User Not Found")
        }
        const pass = await bcrypt.compare(password, user.password)
        if (!pass) {
            return res.status(500).send("Wrong password")
        }
        const token = jwt.sign({userId: user._id}, secret); // Generate JWT token
        res.send({
            token: token,
            user: user
        });
    } catch (err) {
        res.send("Something went wrong login").status(500)
        console.log("err")
    }
}
export const register = async (req, res) => {
    try {
        const {email, password, name} = req.body
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            email: email,
            password: hashedPassword,
            name: name
        })
        await user.save()
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send("Something went wrong")
    }
}
export const deleteProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (user) {
            const notes = await Note.find({user: req.user._id});
            await Note.deleteMany({user: req.user._id});
            await user.deleteOne()
            return res.send("User deleted successfully").status(200)
        }
        return res.send("No user with that id").status(404)
    } catch (err) {
        console.log(err)
        res.send("Something went wrong").status(500)
    }


}
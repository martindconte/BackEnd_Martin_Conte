import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'fist name is required',
        trim: true,
        lowercase: true,
    },
    last_name: {
        type: String,
        required: 'last name is required',
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: 'email is required',
        trim: true,
        lowercase: true,
        unique: true
    },
    age: {
        type: Number,
        required: 'The age is required',
        trim: true,
        min: 18
    },
    password: {
        type: String,
        required: 'Password is required',
        trim: true,
        lowercase: true,
    },
    role: {
        type: String,
        trim: true,
        default: "user"
    }
})

const userModel = mongoose.model('users', userSchema)

export {
    userModel
}
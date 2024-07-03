import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'fist name is required',
        trim: true,
    },
    last_name: {
        type: String,
        required: 'last name is required',
        trim: true,
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
        trim: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        trim: true,
        default: "user"
    },
    documents: {
        type: [{
            name: String,
            reference: String,
        }],
        default: []
    },
    last_connection: {
        type: Date,
        default: null,

    },
    profile_image: {
        type: String,
        default: ''
    }
})

userSchema.pre('save', async function(next) {

    if (!this.isModified('password')) {
        next();
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.checkPassword = async function(pass) {
    return await bcrypt.compare(pass, this.password)
}

const userModel = mongoose.model('users', userSchema)

export {
    userModel
}
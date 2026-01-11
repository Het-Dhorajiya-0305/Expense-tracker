import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken:{
        type:String,
    },
    imcome:{
        type:Number,
        default:0,
    },
    expense:{
        type:Number,
        default:0
    }
}, { timestamps: true })
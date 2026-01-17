import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema =new mongoose.Schema({
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
    profileImage:{
        type:String,
        default:null
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return 
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        // next();
    }
    catch (err) {
        console.log("error in hashing password", err)
        next(err)
    }

})


userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;
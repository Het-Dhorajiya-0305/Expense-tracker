import jwt from 'jsonwebtoken';
import validator from 'validator';
import User from '../models/useModel.js';


const generateToken = async (user) => {

    try {
        const token = await jwt.sign(
            {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            },
            process.env.REFERSH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )

        user.refreshToken = token;
        user.save({ validateBeforeSave: false })

        return token;
    } catch (error) {
        return error;
    }
}

const registerUser = async (req, res) => {
    try {

        const { fullName, email, password, profileImageUrl } = req.body;

        console.log("profileImageUrl:", profileImageUrl);

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email"
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            })
        }

        const existedUser = await User.findOne({
            $or: [{ email, fullName }]
        })

        if (existedUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }

        const newUser = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        })

        const user = await User.findById(newUser._id).select('-password');

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "Failed to create user"
            })
        }

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email"
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        const token = await generateToken(user);

        const loginedUser = await User.findById(user._id).select('-password -refreshToken');

        const option = {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000
        }

        return res.status(200).cookie("refreshToken", token, option).json({
            success: true,
            user: loginedUser,
            token,
            message: "login successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export { registerUser, loginUser }
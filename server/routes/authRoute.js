import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";


const authRoute=Router();

authRoute.post('/signup',registerUser);
authRoute.post('/login',loginUser);


export default authRoute;   
import { Router } from "express";
import { checkAuth, getUserInfo, loginUser, logoutUser, registerUser, uploadProfileImage } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";


const authRoute=Router();

authRoute.post('/signup',upload.single('profileImage'),registerUser);
authRoute.post('/login',loginUser);
authRoute.post('/logout',authMiddleware,logoutUser);
authRoute.get('/user-info',authMiddleware,getUserInfo);
authRoute.get('/',authMiddleware,checkAuth);




export default authRoute;   
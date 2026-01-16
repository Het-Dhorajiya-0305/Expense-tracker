import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controllers/dashboardController.js";


const dashboardRoute=Router()

dashboardRoute.get('/',authMiddleware,getDashboardData)

export default dashboardRoute;
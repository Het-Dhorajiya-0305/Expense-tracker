import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addIncome, deleteIncome, downloadIncomeExcel, getAllIncome } from "../controllers/incomeController.js";



const incomeRoute=Router();

incomeRoute.post('/add',authMiddleware,addIncome)
incomeRoute.delete('/:id',authMiddleware,deleteIncome)
incomeRoute.get('/getall',authMiddleware,getAllIncome)
incomeRoute.get('/downloadExcel',authMiddleware,downloadIncomeExcel)


export default incomeRoute;
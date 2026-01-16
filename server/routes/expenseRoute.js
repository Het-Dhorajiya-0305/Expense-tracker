import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addExpense, deleteExpense, downloadExpensesExcel, getExpenses } from "../controllers/expenseController.js";


const expenseRoute=Router();


expenseRoute.post('/add',authMiddleware,addExpense);
expenseRoute.delete('/:id',authMiddleware,deleteExpense);
expenseRoute.get('/getall',authMiddleware,getExpenses);
expenseRoute.get('/downloadExcel',authMiddleware,downloadExpensesExcel);


export default expenseRoute;
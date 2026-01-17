import Expense from "../models/expenseModel.js";
import xlsx from "xlsx";

const addExpense = async (req, res) => {
    try {
        const userId = req.user._id;
        const { amount, category, date } = req.body;

        if (!amount || !category || !date) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        const newExpense = await Expense.create({
            userId,
            amount,
            category,
            date
        })

        if (!newExpense) {
            return res.status(500).json({
                message: "Failed to add expense",
                success: false
            })
        }

        return res.status(201).json({
            message: "Expense added successfully",
            success: true,
            data: newExpense
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        })
    }
}

const getExpenses = async (req, res) => {
    try {
        const userId = req.user._id;

        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        if (!expenses) {
            return res.status(404).json({
                message: "No expenses found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Expenses fetched successfully",
            success: true,
            data: expenses
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
        })
    }
}

const deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;

        const deletedExpense = await Expense.findByIdAndDelete(expenseId);

        if (!deletedExpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
            data: deletedExpense
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const downloadExpensesExcel = async (req, res) => {
    try {
        const userId = req.user._id;

        const expenses = await Expense.find({ userId }).sort({ date: -1 })

        if (!expenses) {
            return res.status(404).json({
                success: false,
                message: "No expenses found"
            })
        }

        const data = expenses.map((expenes) => (
            {
                Amount: expenes.amount,
                Category: expenes.category,
                Date: expenes.date.toISOString().split('T')[0],
            }
        ))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb, ws, "Expenses")
        xlsx.writeFile(wb, `Expenses_details.xlsx`);

        return res.status(200).download(`Expenses_details.xlsx`);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export { addExpense, getExpenses, deleteExpense, downloadExpensesExcel }
import mongoose from "mongoose";
import Income from "../models/incomeModel.js";
import Expense from "../models/expenseModel.js";


const getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        const userObjectId = new mongoose.Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            {
                $match: { userId: userObjectId }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: {
                        $sum: "$amount"
                    }
                }
            }
        ])


        const totalExpense = await Expense.aggregate([
            {
                $match: { userId: userObjectId }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: {
                        $sum: "$amount"
                    }
                }
            }
        ])


        const last50DaysIncomeTransactions = await Income.find({
            userId: userObjectId,
            date: {
                $gte: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000)
            }
        }).sort({ date: -1 });

        const last20DaysExpenseTransactions = await Expense.find({
            userId: userObjectId,
            date: {
                $gte: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
            }
        }).sort({ date: -1 });

        const incomeLast50Days = last50DaysIncomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        const expenseLast20Days = last20DaysExpenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        const last5Income = await Income.find({ userId }).sort({ date: -1 }).limit(5)
        const last5Expense = await Expense.find({ userId }).sort({ date: -1 }).limit(5)

        const last5transaction = [
            ...(last5Income.map(item => ({ ...item.toObject(), type: 'income' }))),
            ...(last5Expense.map(item => ({ ...item.toObject(), type: 'expense' })))
        ].sort((a, b) => b.date - a.date)


        return res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",
            totalBalance: (totalIncome[0]?.totalAmount || 0) - (totalExpense[0]?.totalAmount || 0),
            totalIncome: totalIncome[0]?.totalAmount || 0,
            totalExpense: totalExpense[0]?.totalAmount || 0,
            last50daysincome: {
                amount: incomeLast50Days,
                transactions: last50DaysIncomeTransactions
            },
            last20daysexpense: {
                amount: expenseLast20Days,
                transactions: last20DaysExpenseTransactions
            },
            recentTransactions: last5transaction
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export { getDashboardData };
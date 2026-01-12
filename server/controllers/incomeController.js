import Income from "../models/incomeModel.js";
import xlsx from "xlsx";

const addIncome = async (req, res) => {
    try {
        const userId = req.user._id;
        const { amount, date, source } = req.body;

        if (!amount || !date || !source) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const newIncome = await Income.create({
            userId,
            amount,
            date: new Date(date),
            source
        })

        return res.status(200).json({
            success: true,
            message: "Income added successfully",
            income: newIncome
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const deleteIncome = async (req, res) => {
    try {
        const incomeId = req.params.id;

        const deletedIncome = await Income.findByIdAndDelete(incomeId);

        if (!deletedIncome) {
            return res.status(404).json({
                success: false,
                message: "Income not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Income deleted successfully",
            income: deletedIncome
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllIncome = async (req, res) => {
    try {
        const userId = req.user._id;

        const incomes = await Income.find({ userId }).sort({ date: -1 });

        return res.status(200).json({
            success: true,
            incomes
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const downloadIncomeExcel = async (req, res) => {
    try {
        const userId = req.user._id;

        const incomes = await Income.find({ userId }).sort({ date: -1 });

        const data = incomes.map((income) => ({
            Amount: income.amount,
            Source: income.source,
            Date: income.date.toISOString().split('T')[0],
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "Incomes")
        xlsx.writeFile(wb, "income_details.xlsx")

        return res.download("income_details.xlsx");
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// const downloadIncomeExcel = async (req, res) => {
//   try {
//     
//     const userId = req.user._id;

//    
//     const incomes = await Income.find({ userId }).sort({ date: -1 });

//     
//     const data = incomes.map((income) => ({
//       Amount: income.amount,
//       Source: income.source,
//       Date: income.date.toISOString().split('T')[0],
//     }));

//     // 4. Create workbook & worksheet
//     const workbook = xlsx.utils.book_new();
//     const worksheet = xlsx.utils.json_to_sheet(data);

//     xlsx.utils.book_append_sheet(workbook, worksheet, 'Incomes');

//     // 5. Convert workbook to buffer (NO file system write)
//     const buffer = xlsx.write(workbook, {
//       type: 'buffer',
//       bookType: 'xlsx',
//     });

//     // 6. Set headers for download
//     res.setHeader(
//       'Content-Disposition',
//       'attachment; filename="income_details.xlsx"'
//     );
//     res.setHeader(
//       'Content-Type',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     );

//     
//     return res.status(200).send(buffer);

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export default downloadIncomeExcel;



export { addIncome, deleteIncome, getAllIncome, downloadIncomeExcel };
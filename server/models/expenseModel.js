import mongoose from "mongoose";


const expenseSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
},{timestamps:true})


const Expense=mongoose.model('Expense',expenseSchema);

export default Expense;
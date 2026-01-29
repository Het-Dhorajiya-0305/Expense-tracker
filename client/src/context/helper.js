import moment from "moment";

function isValidEmail(email) {
    if (typeof email !== "string") return false;

    const trimmed = email.trim();

    // Basic, practical email validation regex
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    return emailRegex.test(trimmed);
}


function formatBalance(balance,) {
    if (balance == null || isNaN(balance)) return "0";
    const currency = "INR"
    return Number(balance).toLocaleString("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0
    });
}

const expenseBarChartData=(data=[])=>{
    const expenseData=data.map((item)=>(
        {
            category:item?.category,
            amount:item?.amount
        }
    ))

    return expenseData
}
const incomeBarChartData=(data=[])=>{
    const sortedData=[...data].sort((a,b)=>new Date(a.data)-new Date(b.data));


    const incomedata=sortedData.map((item)=>({
        month:moment(item?.data).format("Do MMM"),
        amount:item?.amount,
        source:item?.source
    }))

    return incomedata
}



export { isValidEmail, formatBalance,expenseBarChartData,incomeBarChartData };
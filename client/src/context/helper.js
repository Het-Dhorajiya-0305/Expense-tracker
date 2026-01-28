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



export { isValidEmail, formatBalance };
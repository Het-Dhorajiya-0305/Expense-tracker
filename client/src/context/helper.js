function isValidEmail(email) {
    if (typeof email !== "string") return false;

    const trimmed = email.trim();

    // Basic, practical email validation regex
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    return emailRegex.test(trimmed);
}

export { isValidEmail };
import jwt from "jsonwebtoken";


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        const user = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
}

export default authMiddleware;
import jwt from "jsonwebtoken";


const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.refreshToken;
    
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access - no token found"
            });
        }

        const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        req.user = user;
        next();

    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid token: " + error.message
        });
    }
}

export default authMiddleware;
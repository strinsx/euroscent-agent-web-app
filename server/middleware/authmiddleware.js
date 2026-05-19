
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next)=> {
    try {
        
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({
                message: "No Token Provided"
            })
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message: "Invalid Token"
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET

        )

        req.admin = decoded;
        
    } catch (error) {

        return res.status(401).json({
            message: "Unauthorized"
        })
        
    }
}
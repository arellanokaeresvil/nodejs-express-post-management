import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError";

interface JwtPayload {
    userId: number;
}

const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError('No token provided', 401)
        // return res.status(401).json({
        //     error: "No token provided"
        // });
    }

    const token = authHeader.split(" ")[1];

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new AppError('JWT secret is not configured', 500)
        // return res.status(500).json({
        //     error: "JWT secret is not configured"
        // });
    }

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;

        // req.userId = decoded.userId;

        console.log(`Authenticated user `);

        next();
    } catch (error) {
        throw new AppError('Unauthorized: Invalid token',401)
        // return res.status(401).json({
        //     error: "Invalid token"
        // });
    }
};

export default authMiddleware;
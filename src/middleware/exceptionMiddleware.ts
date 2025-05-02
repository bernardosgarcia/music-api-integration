import { NextFunction, Request, Response } from 'express';

interface ApiError extends Error {
    statusCode?: number;
}

export const exceptionMiddleware = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    console.error(err);
    res.status(statusCode).json({
        name: err.name,
        message: err.message,
        stack: err.stack
    });
};

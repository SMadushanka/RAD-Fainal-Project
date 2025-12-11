import type { NextFunction, Request, Response } from 'express';
export interface AppError extends Error {
    statusCode?: number;
}
export declare const errorHandler: (err: AppError, req: Request, res: Response, next: NextFunction) => void;
export declare const asyncHandler: (fn: Function) => (req: Request, res: Response, next: NextFunction) => void;

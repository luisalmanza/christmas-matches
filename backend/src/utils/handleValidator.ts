import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

function validateResults(req: Request, res: Response, next: NextFunction): void {
    try {
        validationResult(req).throw();
        return next();
    } catch (error: any) {
        res.status(403);
        res.send({ errors: error.array() });
    }
}

export default validateResults;
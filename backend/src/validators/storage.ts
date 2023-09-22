import { check } from "express-validator";
import validateResults from "../utils/handleValidator";
import { NextFunction, Request, Response } from "express";

const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
]

export default validatorGetItem;
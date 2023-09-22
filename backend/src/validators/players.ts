import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import validateResults from "../utils/handleValidator";


const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

const validatorCreateItem = [
    check("mediaId").exists().notEmpty(),
    check("name").exists().notEmpty(),
    check("nickname").exists(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

export { validatorGetItem, validatorCreateItem };
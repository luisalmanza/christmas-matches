import { Response } from "express";

function handleHttpError(res: Response, message: string = "Something went wrong", code: number = 403) {
    res.status(code);
    res.send({ error: message });
}

export default handleHttpError;
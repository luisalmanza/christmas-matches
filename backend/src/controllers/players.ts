import { Request, Response } from "express";
import { matchedData } from "express-validator";
import models from "../models";
import handleHttpError from "../utils/handleError";


async function getItems(req: Request, res: Response): Promise<void> {
    try {
        const data = await models.playerModel.findAllData();
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "Error getting players", 500);
    }
}

async function getItem(req: Request, res: Response): Promise<void> {
    try {
        const { id } = matchedData(req);
        const data = await models.playerModel.findOneItem(id);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "Error getting player");
    }
}

async function createItem(req: Request, res: Response): Promise<void> {
    try {
        const body = matchedData(req);
        const data = await models.playerModel.create(body);
        res.status(201);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "Error creating player");
    }
}

async function deleteItem(req: Request, res: Response): Promise<void> {
    try {
        const { id } = matchedData(req);
        const deleteResponse = await models.playerModel.delete({ _id: id });

        const data = {
            deleted: deleteResponse.deletedCount
        };

        res.send({ data });
    } catch (error) {
        handleHttpError(res, "Error deleting player");
    }
}

async function updateItem(req: Request, res: Response): Promise<void> {
    try {
        const { id, ...body } = matchedData(req);
        const data = await models.playerModel.findOneAndUpdate({
            _id: id
        }, body);

        res.send({ data });
    } catch (error) {
        handleHttpError(res, "Error updating player");
    }
}

export { getItems, getItem, createItem, deleteItem, updateItem };
import models from "../models";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import StorageInterface from "../interfaces/storage.interface";
import handleHttpError from "../utils/handleError";

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

async function getItems(req: Request, res: Response): Promise<void> {
    try {
        const data = await models.storageModel.find({});
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "Error getting items from storage", 500);
    }
}

async function getItem(req: Request, res: Response): Promise<void> {
    try {
        const { id } = matchedData(req);
        const data = await models.storageModel.findById(id);
        res.send(data);
    } catch (error) {
        handleHttpError(res, "Error getting item from storage");
    }
}

async function createItem(req: Request, res: Response): Promise<void> {
    try {
        const { file } = req;
        const fileData = {
            filename: file?.filename,
            url: `${PUBLIC_URL}/${file?.filename}`
        }
        const data = await models.storageModel.create(fileData);

        res.status(201);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "Error creating item on storage");
    }
}

async function deleteItem(req: Request, res: Response): Promise<void> {
    try {
        const { id } = matchedData(req);
        const dataFile: StorageInterface | null = await models.storageModel.findById(id);

        const deleteResponse = await models.storageModel.delete({ _id: id });

        const filename = dataFile?.filename;

        const filePath = `${MEDIA_PATH}/${filename}`;

        const data = {
            filePath,
            deleted: deleteResponse.deletedCount
        }

        res.send({ data });
    } catch (error) {
        handleHttpError(res, "Error deleting item");
    }
}

export { getItems, getItem, createItem, deleteItem };
import models from "../models";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import StorageInterface from "../interfaces/storage.interface";

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

async function getItems(req: Request, res: Response): Promise<void> {
    try {
        const data = await models.storageModel.find({});
        res.send({ data });
    } catch (error) {
        res.status(500);
        res.send({ error: "Error getting items from storage" });
    }
}

async function getItem(req: Request, res: Response): Promise<void> {
    try {
        const { id } = matchedData(req);
        const data = await models.storageModel.findById(id);
        res.send(data);
    } catch (error) {
        res.status(403);
        res.send({ error: "Error getting an item from storage" });
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
        res.status(403);
        res.send({ error: "Error creating an item on storage" });
    }
}

async function deleteItem(req: Request, res: Response): Promise<void> {
    try {
        const { id } = matchedData(req);
        const dataFile: StorageInterface | null = await models.storageModel.findById(id);

        const deleteResponse = await models.storageModel.deleteOne({ _id: id });

        const filename = dataFile?.filename;

        const filePath = `${MEDIA_PATH}/${filename}`;

        const data = {
            filePath,
            deleted: deleteResponse.deletedCount
        }

        res.send({ data });
    } catch (error) {
        res.status(403);
        res.send({ error: "Error deleting an item" });
    }
}

export { getItems, getItem, createItem, deleteItem };
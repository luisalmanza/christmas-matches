import models from "../models";
import request, { Response } from "supertest";
import app from "../app";
import dbConnect from "../config/mongo";
import mongoose from "mongoose";

const filePath = `${__dirname}/dump/photo.jpg`;

describe("[STORAGE] Photos test", () => {
    beforeAll(async () => {
        await dbConnect();
        await models.storageModel.deleteMany({});
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test("Upload a file", async () => {
        const response: Response = await request(app)
            .post("/api/storage")
            .attach("file", filePath);

        const { body } = response;
        expect(response.statusCode).toEqual(201);
        expect(body).toHaveProperty("data");
        expect(body).toHaveProperty("data.url");
        expect(body).toHaveProperty("data.filename");
    });

    test("Get all files", async () => {
        const response: Response = await request(app)
            .get("/api/storage");

        const { body } = response;
        expect(response.statusCode).toEqual(200);
        expect(body).toHaveProperty("data");
    });

    test("Get one file", async () => {
        const file = await models.storageModel.findOne();
        const id = file?._id.toString();

        const response: Response = await request(app)
            .get(`/api/storage/${id}`);

        const { body } = response;
        expect(response.statusCode).toEqual(200);
        expect(body).toHaveProperty("data");
        expect(body).toHaveProperty("data.url");
        expect(body).toHaveProperty("data.filename");
    });

    test("Delete one file", async () => {
        const file = await models.storageModel.findOne();
        const id = file?._id.toString();

        const response: Response = await request(app)
            .delete(`/api/storage/${id}`);

        const { body } = response;
        expect(response.statusCode).toEqual(200);
        expect(body).toHaveProperty("data");
        expect(body).toHaveProperty("data.filePath");
        expect(body).toHaveProperty("data.deleted", 1);
    });
});
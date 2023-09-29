import mongoose from "mongoose";
import dbConnect from "../config/mongo";
import models from "../models";
import request, { Response } from "supertest";
import app from "../app";

let STORAGE_ID: string = "";

describe("[PLAYERS] Players test", () => {
    beforeAll(async () => {
        await dbConnect();
        await models.playerModel.deleteMany({});
        await models.storageModel.deleteMany({});

        const storage = await models.storageModel.create({
            url: "http://localhost:3001/photo.jpg",
            filename: "photo.jpg"
        });

        STORAGE_ID = storage._id.toString();
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test("Create one player", async () => {
        const newPlayerData = {
            name: "Luis",
            nickname: "Luisanhello",
            mediaId: STORAGE_ID
        };

        const response: Response = await request(app)
            .post("/api/players")
            .send(newPlayerData);

        const { body } = response;
        expect(response.statusCode).toEqual(201);
        expect(body).toHaveProperty("data");
        expect(body).toHaveProperty("data.name");
        expect(body).toHaveProperty("data.nickname");
        expect(body).toHaveProperty("data.mediaId");
    });

    test("[Fail] Create one player", async () => {
        const newPlayerData = {
            test: "Luis"
        };

        const response: Response = await request(app)
            .post("/api/players")
            .send(newPlayerData);

        expect(response.statusCode).toEqual(403);
    });

    test("Get all players", async () => {
        const response: Response = await request(app)
            .get("/api/players");

        const { body } = response;
        expect(response.statusCode).toEqual(200);
        expect(body).toHaveProperty("data");
    });

    test("Get one player", async () => {
        const player = await models.playerModel.findOne();
        const id = player?._id.toString();

        const response: Response = await request(app)
            .get(`/api/players/${id}`);

        const { body } = response;
        expect(response.statusCode).toEqual(200);
        expect(body).toHaveProperty("data");
        expect(body).toHaveProperty("data.name");
        expect(body).toHaveProperty("data.nickname");
        expect(body).toHaveProperty("data.mediaId");
        expect(body).toHaveProperty("data.photo");
    });

    test("[Fail] Get one player", async () => {
        const response: Response = await request(app)
            .get(`/api/players/0`);

        expect(response.statusCode).toEqual(403);
    });

    test("Update one player", async () => {
        const player = await models.playerModel.findOne();
        const id = player?._id.toString();
        const updatedPlayerData = {
            name: "Luis Angel",
            nickname: player?.nickname,
            mediaId: player?.mediaId
        };

        const response: Response = await request(app)
            .put(`/api/players/${id}`)
            .send(updatedPlayerData);

        const { body } = response;
        expect(response.statusCode).toEqual(200);
        expect(body).toHaveProperty("data");
    });

    test("Delete one player", async () => {
        const player = await models.playerModel.findOne();
        const id = player?._id.toString();

        const response: Response = await request(app)
            .delete(`/api/players/${id}`);

        const { body } = response;
        expect(response.statusCode).toEqual(200);
        expect(body).toHaveProperty("data");
        expect(body).toHaveProperty("data.deleted", 1);
    })
});
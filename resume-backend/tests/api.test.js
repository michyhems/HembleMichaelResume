const request = require("supertest");
const app = require("../app");
const db = require("../config/DBconnection");
const project = require("../models/project");
require("dotenv").config();
const API_SECRET = process.env.API_SECRET;

afterAll(async () => {
    await db.close();
});

describe("API endpoints", () => {
    describe("Test get requests", () => {
        it("should return all projects and all the fields", async () => {
            const res = await request(app).get("/api/");
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it("should return all projects but only the id, title and thumbnail", async () => {
            const res = await request(app).get("/api/titles");
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            res.body.forEach((project) => {
                expect(project).toEqual({
                    _id: expect.any(String),
                    thumbnail: expect.any(String),
                    title: expect.any(String),
                });
            });
        });

        it("should return an error 404 when a bad request is used", async () => {
            const res = await request(app).get("/bad-request");
            expect(res.statusCode).toBe(404);
        });
    });
});

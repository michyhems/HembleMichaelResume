const request = require("supertest");
const app = require("../app");
const Model = require("../models/project");
require("dotenv").config();
const API_SECRET = process.env.API_SECRET;

jest.mock("../models/project");

describe("API endpoints", () => {
    describe("Test get requests", () => {
        it("should return all projects and all the fields", async () => {
            Model.find.mockResolvedValue([
                {
                    _id: "1",
                    title: "title",
                    repo: "repo",
                    description: ["description"],
                    thumbnail: "img",
                    readmeHtml: "html",
                    lastUpdated: "2026-10-01",
                },
            ]);

            const res = await request(app).get("/api/");
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it("should return all projects but only the id, title and thumbnail", async () => {
            Model.find.mockReturnValue({
                select: jest.fn().mockResolvedValue([
                    {
                        _id: "1",
                        title: "project",
                        thumbnail: "img",
                    },
                ]),
            });
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
            const res = await request(app).get("/api/bad-request");
            expect(res.statusCode).toBe(404);
        });
    });

    describe("test post requests", () => {
        it("should return an error as no header is given to the request", async () => {
            const res = await request(app).post("/api/");
            expect(res.statusCode).toBe(400);
        });
        it("should return an error as the header form is incorrect", async () => {
            const res = await request(app)
                .post("/api/")
                .set("Authorization", `${API_SECRET}`);
            expect(res.statusCode).toBe(400);
        });
        it("should return result in creation of project", async () => {
            Model.create.mockResolvedValue({
                _id: "1",
                title: "title",
                repo: "repo",
                description: ["description"],
                thumbnail: "img",
                readmeHtml: "html",
                lastUpdated: "2026-10-01",
            });
            const res = await request(app)
                .post("/api/")
                .set("Authorization", `Bearer ${API_SECRET}`)
                .send({
                    title: "title",
                    repo: "repo",
                    description: ["description"],
                    thumbnail: "img",
                    repo: "title",
                });
            expect(res.statusCode).toBe(201);
        });
    });
});

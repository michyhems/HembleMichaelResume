const request = require("supertest");
const app = require("../app");
const Model = require("../models/project");
const project = require("../models/project");
require("dotenv").config();
jest.mock("../models/project");

//mock authentication and fetching middleware
jest.mock("../middleware/authenticate", () => (req, res, next) => next());
jest.mock("../middleware/authenticateGitHub", () => (req, res, next) => next());
jest.mock("../middleware/fetchRepo", () => (req, res, next) => {
    req.html = "<h1>Project Title</h1>";
    next();
});
jest.mock("../middleware/getEntry", () => (req, res, next) => {
    req.entry = {
        _id: "1",
        title: "title",
        repo: "repo",
        description: ["description"],
        thumbnail: "img",
        readmeHtml: "html",
        lastUpdated: "2026-10-01",
    };
    next();
});

describe("test api endpoints", () => {
    describe("test get endpoints", () => {
        it("should return all projects and all the fields", async () => {
            const project = {
                _id: "1",
                title: "title",
                repo: "repo",
                description: ["description"],
                thumbnail: "img",
                readmeHtml: "html",
                lastUpdated: "2026-10-01",
            };
            Model.find.mockResolvedValue([project]);
            const res = await request(app).get("/api/");
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body).toEqual([project]);
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
        it("should return result in creation of project", async () => {
            const project = {
                _id: "1",
                title: "title",
                repo: "repo",
                description: ["description"],
                thumbnail: "img",
                readmeHtml: "html",
                lastUpdated: "2026-10-01",
            };
            Model.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(project),
            }));
            const res = await request(app)
                .post("/api/")
                .send({
                    title: "title",
                    repo: "repo",
                    description: ["description"],
                    thumbnail: "img",
                    repo: "title",
                });
            expect(res.status).toBe(201);
            expect(res.body).toMatchObject(project);
        });
    });
});

const request = require("supertest");
const app = require("../app");
const Model = require("../models/project");
require("dotenv").config();
const API_SECRET = process.env.API_SECRET;
const GIT_HUB_API_KEY = process.env.GIT_HUB_API_KEY;

//middleware
const authenticate = require("../middleware/authenticate");
const authenticateGitHub = require("../middleware/authenticateGitHub");
const fetchRepo = require("../middleware/fetchRepo");
const getEntry = require("../middleware/getEntry");
jest.mock("../models/project");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("Testing middleware", () => {
    describe("test standard authentication middleware", () => {
        it("should return error of 400 and a message saying the authentication token was not provided", async () => {
            const req = { headers: { "Content-Type": "application/json" } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();
            authenticate(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "No token provided.",
            });
            expect(next).not.toHaveBeenCalled();
        });

        it("should return error of 400 and a message saying invalid request", async () => {
            const req = {
                headers: {
                    authorization: `${API_SECRET}`,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();
            authenticate(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Invalid request.",
            });
            expect(next).not.toHaveBeenCalled();
        });

        it("should return error of 403 as authentication key is wrong and a message of unauthorised entry", async () => {
            const req = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer 7`,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();
            authenticate(req, res, next);
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({
                message: "Unauthorised entry.",
            });
            expect(next).not.toHaveBeenCalled();
        });

        it("should call next as authentication code passes", async () => {
            const req = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${API_SECRET}`,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();
            authenticate(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe("testing github secret key used by GitHub Actions", () => {
        it("should return error of 400 and a message saying the authentication token was not provided", async () => {
            const req = { headers: { "Content-Type": "application/json" } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();
            authenticateGitHub(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "No token provided.",
            });
            expect(next).not.toHaveBeenCalled();
        });

        it("should return error of 400 and a message saying invalid request", async () => {
            const req = {
                headers: {
                    authorization: `${API_SECRET}`,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();
            authenticateGitHub(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Invalid request.",
            });
            expect(next).not.toHaveBeenCalled();
        });

        it("should return error of 403 as authentication key is wrong and a message of unauthorised entry", async () => {
            const req = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer 7`,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();
            authenticateGitHub(req, res, next);
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({
                message: "Unauthorised entry.",
            });
            expect(next).not.toHaveBeenCalled();
        });

        it("should return error of 403 as authentication key is for standard authentication wrong and a message of unauthorised entry", async () => {
            const req = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${API_SECRET}`,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();
            authenticateGitHub(req, res, next);
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({
                message: "Unauthorised entry.",
            });
            expect(next).not.toHaveBeenCalled();
        });
        it("should call next as authentication code passes", async () => {
            const req = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${GIT_HUB_API_KEY}`,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();
            authenticateGitHub(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe("testing fetch repository middleware", () => {
        it("should return error for not finding a readme", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            const req = {
                body: {
                    repo: "testRepo",
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();
            const expectedURL = `https://api.github.com/repos/michyhems/testRepo/readme`;
            const header = {
                headers: { Accept: "application/vnd.github.v3.raw" },
            };
            await fetchRepo(req, res, next);
            console.log(res.status.mock.calls);
            expect(fetch).toHaveBeenCalledWith(expectedURL, header);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Failed to fetch repo",
            });
            expect(next).not.toHaveBeenCalled();
        });

        it("should all pass", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                text: () => Promise.resolve("# Mocked markdown"),
            });
            const req = {
                body: {
                    repo: "testRepo",
                },
            };
            const res = {
                status: jest.fn(),
            };
            const next = jest.fn();
            const expectedURL = `https://api.github.com/repos/michyhems/testRepo/readme`;
            const header = {
                headers: { Accept: "application/vnd.github.v3.raw" },
            };
            await fetchRepo(req, res, next);
            expect(fetch).toHaveBeenCalledWith(expectedURL, header);
            expect(req.html).toContain(
                '<h1 id="mocked-markdown">Mocked markdown</h1>',
            );
            expect(next).toHaveBeenCalled();
        });
    });

    describe("testing get entry middleware", () => {
        it("should return error 404 saying the entry was not found", async () => {
            const spy = jest.spyOn(Model, "findById").mockResolvedValue(null);
            const req = {
                params: {
                    is: "7",
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();
            await getEntry(req, res, next);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Cannot find entry",
            });
            expect(next).not.toHaveBeenCalled();
        });

        it("should return project", async () => {
            const project = { id: "7", title: "myProject" };
            const spy = jest
                .spyOn(Model, "findById")
                .mockResolvedValue(project);
            const req = {
                params: {
                    is: "7",
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();
            await getEntry(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    /*

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
    });*/
});

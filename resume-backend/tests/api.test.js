const request = require("supertest");
const app = require("../app");
const db = require("../config/DBconnection");
require("dotenv").config();
const API_SECRET = process.env.API_SECRET;

afterAll(async () => {
    await db.close();
});

describe("API endpoints", () => {
    describe("Authentication via secret key", () => {
        it("should return invalid request error", async () => {
            const res = await request(app).get("/api/");
            expect(res.statusCode).toBe(400);
        });

        it("should return invalid request error", async () => {
            const res = await request(app)
                .get("/api/")
                .set("Authorization", "7");
            expect(res.statusCode).toBe(400);
        });

        it("should return authentication error", async () => {
            const res = await request(app)
                .get("/api/")
                .set("Authorization", "Bearer 7");
            expect(res.statusCode).toBe(401);
        });

        it("should return all projects", async () => {
            const res = await request(app)
                .get("/api/")
                .set("Authorization", `Bearer ${API_SECRET}`);
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe("Testing get methods", () => {
        it("should return all projects but only the id, title and thumbnail fields", async () => {
            const res = await request(app)
                .get("/api/titles")
                .set("Authorization", `Bearer ${API_SECRET}`);
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });
});

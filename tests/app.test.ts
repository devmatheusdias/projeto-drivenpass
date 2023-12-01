import app from "../src/app"
import supertest from "supertest";
import prisma from "@/config/database";

const server = supertest(app);

beforeEach(async () => {
    await prisma.user.deleteMany();
})


describe("api", () => {
    it("/health", async () => {


        const result = await server.get("/health")
        const {statusCode} = result;
        expect(statusCode).toBe(200); 

    })
})

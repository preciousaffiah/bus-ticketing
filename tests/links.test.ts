import mongoose from "mongoose";
import request from "supertest";
import app from "../src/index";
require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI || "");
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("Create shortURL endpoint", () => {
  it("should create a shortURL", async () => {
    const res = await request(app).post("/api/link").send({
      longURL: "https://twitter.com/Precious_theDev",
    });
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

describe("Find shortURL endpoint", () => {
  it("should redirect user to the longURL assigned to the shortURL", async () => {
    const res = await request(app).get("/api/link/2dbc");
    expect(res.status).toBe(302);
  });
});

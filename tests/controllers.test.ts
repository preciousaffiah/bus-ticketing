import request from "supertest";

const app = 'http://localhost:4000/api'

let authToken: string;

describe("Register user endpoint", () => {
  it("should create new user in database", async () => {
    const res = await request(app).post("/auth/register").send({
      fullname: "test user2",
      email: "test2@user.com",
      mobile: "1234567899",
      password: "1234678",
    });
    authToken = res.body.data.token;
    expect(res.status).toBe(200);
  });
});

describe("Login user endpoint", () => {
  it("should login existing user", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "test2@user.com",
      password: "1234678",
    }); 
    authToken = res.body.data.token; 
    expect(res.status).toBe(200);
  });
});

describe("Create bus ticket account endpoint", () => {
  it("should create bus ticket account for existing user", async () => {
    const res = await request(app).post("/auth/create-ticket-account").send({}).set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200)
  });
});

describe("Fund your bus ticket account endpoint", () => {
  it("should fund users bus ticket account", async () => {
    const res = await request(app).post("/transaction/fund").send({ amount: 6000 }).set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200)   
  });
});

describe("Pay ticket fare endpoint", () => {
    it("should remove money from users account for ticket fare", async () => {
      const res = await request(app).post("/transaction/ticket-pay").send({ amount: 2000, destination: "lagos" }).set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(200)   
    });
});

describe("Transfer funds endpoint", () => {
    it("should transfer money from users account to another user", async () => {
      const res = await request(app).post("/transaction/transfer").send({ amount: 1000, to: "replace-with-existing-ticket-account-id" }).set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(200)   
    });
});

describe("get balance endpoint", () => {
    it("should get users balance", async () => {
      const res = await request(app).get("/transaction/balance").set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(200)   
    });
});

describe("get transactions endpoint", () => {
    it("should get users transactions", async () => {
      const res = await request(app).get("/transaction/get-transactions").set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(200)   
    });
});
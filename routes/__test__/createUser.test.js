const supertest = require("supertest");
const app = require("../../app");

describe("Create user post request", ()=>{
  it("Returns 400 if authorization is found",async ()=>{
    await supertest(app).post("/v1/user").auth('username','password').send({
      "first_name": "John",
      "last_name": "Smith",
      "password": "qwerty",
      "username": "johnsmith69@example.com"
    }).expect(400)
  }),
  it("Create account and get account", async ()=>{
    await supertest(app).post("/v1/user").send({
      "first_name": "Walter",
      "last_name": "White",
      "password": "icookmeth",
      "username": "heisenberg@example.com"
    }).expect(201).then((res)=>{
      expect(res.body.first_name).toBe("Walter");
      expect(res.body.last_name).toBe("White");
      expect(res.body.username).toBe("heisenberg@example.com");
    })
    await supertest(app).get("/v1/user/self").auth('heisenberg@example.com','icookmeth').expect(200)
  }),
  it("Update account and verify", async ()=>{
    await supertest(app).put("/v1/user/self").auth('heisenberg@example.com','icookmeth').send({
      "first_name": "Jessie",
      "last_name": "Pinkman"
    }).expect(204)
    await supertest(app).get("/v1/user/self").auth('heisenberg@example.com','icookmeth').expect(200).then((res)=>{
      expect(res.body.first_name).toBe("Jessie");
      expect(res.body.last_name).toBe("Pinkman");
    })
  });
});

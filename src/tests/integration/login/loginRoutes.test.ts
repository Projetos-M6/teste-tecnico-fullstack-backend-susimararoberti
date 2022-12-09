import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedUser, mockedLogin } from "../../mocks";
import { routeUserRegister, routeLogin } from "../../mocks/routes";

describe("Rota de Login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post(routeUserRegister).send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /login - Must be able to login with the user", async () => {
    const response = await request(app).post(routeLogin).send(mockedLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  it("POST /login -  Should not be able to login with the user with incorrect password or email", async () => {
    const response = await request(app).post(routeLogin).send({
      email: "felipe@mail.com",
      password: "Abcletrinhas34@",
    });

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("statusCode");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
});

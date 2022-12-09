import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedUser, mockedLogin, mockedUserUpdate } from "../../mocks";
import {
  routeUserRegister,
  routeLogin,
  routeUserList,
  routeUserUpdate,
  routeUserDelete,
} from "../../mocks/routes";

describe("Rotas de Usuário", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /register - Must be able to create a user", async () => {
    const response = await request(app)
      .post(routeUserRegister)
      .send(mockedUser);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Fulano Silva");
    expect(response.body.email).toEqual("fulano@email.com");
    expect(response.body.phone).toEqual("9991929394");
    expect(response.status).toBe(201);
  });

  it("POST /register - Should not be able to create a user that already exists", async () => {
    const response = await request(app)
      .post(routeUserRegister)
      .send(mockedUser);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("statusCode");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  it("GET /users - Must be able to list a user", async () => {
    await request(app).post(routeUserRegister).send(mockedUser);

    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);

    const response = await request(app)
      .get(routeUserList)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("contacts");
    expect(response.body.name).toEqual("Fulano Silva");
    expect(response.body.email).toEqual("fulano@email.com");
    expect(response.body.phone).toEqual("9991929394");
    expect(response.status).toBe(200);
  });

  it("GET /users - Should not be able to list a user without token", async () => {
    const response = await request(app).get(routeUserList);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("statusCode");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH /users/update - Must be able to update a user", async () => {
    await request(app).post(routeUserRegister).send(mockedUser);

    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);

    const getUser = await request(app)
      .get(routeUserList)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    mockedUserUpdate.id = getUser.body.id;

    const response = await request(app)
      .patch(routeUserUpdate)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedUserUpdate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  it("PATCH /users/update - Should not be able to update a user without token", async () => {
    await request(app).post(routeUserRegister).send(mockedUser);

    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);

    const getUser = await request(app)
      .get(routeUserList)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    mockedUserUpdate.id = getUser.body.id;

    const response = await request(app)
      .patch(routeUserUpdate)
      .send(mockedUserUpdate);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("statusCode");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("DELETE /users/delete -  Must be able to delete user", async () => {
    await request(app).post(routeUserRegister).send(mockedUser);

    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);

    const response = await request(app)
      .delete(routeUserDelete)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(202);
  });

  it("DELETE /users/delete -  Should not be able to delete user without token", async () => {
    await request(app).post(routeUserRegister).send(mockedUser);

    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);

    const response = await request(app).delete(routeUserDelete);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("statusCode");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});

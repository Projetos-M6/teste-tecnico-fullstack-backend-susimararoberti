import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedUser,
  mockedLogin,
  mockedContact,
  mockedContactUpdate,
} from "../../mocks";
import {
  routeUserRegister,
  routeLogin,
  routeUserList,
  routeContact,
} from "../../mocks/routes";

describe("Rota de Contatos", () => {
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

  it("POST /contacts - Must be able to create a contact", async () => {
    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);
    const getUser = await request(app)
      .get(routeUserList)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    mockedContact.userId = getUser.body.id;
    const response = await request(app)
      .post(routeContact)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedContact);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toEqual("Sicrano Souza");
    expect(response.body.email).toEqual("sicrano@email.com");
    expect(response.body.phone).toEqual("9998979695");
    expect(response.status).toBe(201);
  });

  it("POST /contacts - Should not be able to create a contact without token", async () => {
    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);
    const getUser = await request(app)
      .get(routeUserList)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    mockedContact.userId = getUser.body.id;
    const response = await request(app).post(routeContact).send(mockedContact);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("statusCode");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("GET /contacts/:id - Must be able to list a contact", async () => {
    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);
    const getUser = await request(app)
      .get(routeUserList)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const response = await request(app)
      .get(`${routeContact}/${getUser.body.contacts[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toEqual("Sicrano Souza");
    expect(response.body.email).toEqual("sicrano@email.com");
    expect(response.body.phone).toEqual("9998979695");
    expect(response.status).toBe(200);
  });

  it("GET /contacts/:id - Should not be able to list a contact without token", async () => {
    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);
    const getUser = await request(app)
      .get(routeUserList)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const response = await request(app).get(
      `${routeContact}/${getUser.body.contacts[0].id}`
    );

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("statusCode");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("GET /contacts/:id - Should not be able to list a contact with a wrong id", async () => {
    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);
    const response = await request(app)
      .get(`${routeContact}/908352ff-a90c-4eb4-a3d6-158b2c2b7cf8`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("statusCode");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("PATCH /contacts/:id - Must be able to update a contact", async () => {
    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);
    const getUser = await request(app)
      .get(routeUserList)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    mockedContactUpdate.id = getUser.body.contacts[0].id;
    const response = await request(app)
      .patch(`${routeContact}/${getUser.body.contacts[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedContactUpdate);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toEqual("Sicrano Souza Barbosa");
    expect(response.body.email).toEqual("sicrano@email.com");
    expect(response.body.phone).toEqual("9990999298");
    expect(response.status).toBe(200);
  });

  it("PATCH /contacts/:id - Should not be able to update a contact without token", async () => {
    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);
    const getUser = await request(app)
      .get(routeUserList)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    mockedContactUpdate.id = getUser.body.contacts[0].id;
    const response = await request(app)
      .patch(`${routeContact}/${getUser.body.contacts[0].id}`)
      .send(mockedContactUpdate);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("statusCode");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH /contacts/:id - Should not be able to update a contact with a wrong id", async () => {
    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);
    const getUser = await request(app)
      .get(routeUserList)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    mockedContactUpdate.id = getUser.body.contacts[0].id;
    const response = await request(app)
      .patch(`${routeContact}/908352ff-a90c-4eb4-a3d6-158b2c2b7cf8`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedContactUpdate);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("statusCode");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("DELETE /contacts/:id - Should not be able to delete a contact without token", async () => {
    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);
    const getUser = await request(app)
      .get(routeUserList)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const response = await request(app).delete(
      `${routeContact}/${getUser.body.contacts[0].id}`
    );

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("statusCode");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("DELETE /contacts/:id - Must be able to delete a contact", async () => {
    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);
    const getUser = await request(app)
      .get(routeUserList)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const response = await request(app)
      .delete(`${routeContact}/${getUser.body.contacts[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(202);
  });

  it("DELETE /contacts/:id - Should not be able to delete a contact with a wrong id", async () => {
    const userLoginResponse = await request(app)
      .post(routeLogin)
      .send(mockedLogin);
    const response = await request(app)
      .delete(`${routeContact}/908352ff-a90c-4eb4-a3d6-158b2c2b7cf8`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("statusCode");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});

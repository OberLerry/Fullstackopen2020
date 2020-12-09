const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const test_helper = require("./test_helper");
const User = require("../models/user");

let token;
const blog = {
  title: "Go To Statement Considered Harmful",
  author: "Edsger W. Dijkstra",
  url:
    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
};
beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of test_helper.blogs) {
    const b = new Blog(blog);
    await b.save();
  }
});

describe("Test the Blog api", () => {
  beforeAll(async () => {
    await User.deleteMany({});
    const u = await api.post("/api/users/").send(test_helper.testUser);
    token = (
      await api.post("/api/login/").send({
        username: u.body.username,
        password: test_helper.testUser.password,
      })
    ).body;
  });
  test("Blogs are retrieved as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("Correct number of blogs is retrieved", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(test_helper.blogs.length);
  });

  test("Id is defined", async () => {
    const response = await api.get("/api/blogs");
    for (let blog of response.body) {
      expect(blog.id).toBeDefined();
    }
  });

  test("POST endpoint adds element to database", async () => {
    await api
      .post("/api/blogs/")
      .set({ Authorization: token.token })
      .send(blog)

      .expect(201)
      .expect("Content-Type", /application\/json/);
    // const response = await api.get("/api/blogs");
    // expect(response.body).toHaveLength(test_helper.blogs.length + 1);
    // expect(response.body.map((b) => b.url)).toContain(blog.url);
  });

  test("Likes are initialized with zero if empty", async () => {
    const result = await api
      .post("/api/blogs")
      .set({ Authorization: token.token })
      .send(blog);
    expect(result.body.likes).toBe(0);
  });

  test("Malformed request bodies get rejected", async () => {
    const blog = new Blog({});
    await api
      .post("/api/blogs")
      .set({ Authorization: token.token })
      .send(blog)
      .expect(400);
  });

  test("Delete works", async () => {
    const b = await api
      .post("/api/blogs/")
      .set({ Authorization: token.token })
      .send(blog);
    await api
      .delete(`/api/blogs/${b.body.id}`)
      .set({ Authorization: token.token })
      .expect(204);
  });

  test("Update works", async () => {
    const b = await api
      .post("/api/blogs/")
      .set({ Authorization: token.token })
      .send(blog);
    const result = await api
      .put(`/api/blogs/${b.body.id}`)
      .set({ Authorization: token.token })
      .send({ likes: 41 });
    expect(result.body.likes).toBe(41);
  });
  test("Unauthorized attempts fail", async () => {
    await api.post("/api/blogs").send(blog).expect(401);
  });
});

describe("Login and authentication", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  test("User creation works", async () => {
    const newUser = {
      username: "testUser",
      password: "12345",
      name: "test User",
    };
    const result = await api.post("/api/users/").send(newUser);
    expect(result.status).toBe(200);
    const users = await api.get("/api/users/");
    expect(users.body.length).toBe(1);
  });
  test("User creation password too short", async () => {
    const newUser = {
      username: "testUser",
      password: "12",
      name: "test User",
    };
    const result = await api.post("/api/users/").send(newUser);
    expect(result.status).toBe(400);
    expect(result.body.error).toEqual(
      "Password and username must be at least 3 characters long"
    );
    const users = await api.get("/api/users/");
    expect(users.body.length).toBe(0);
  });
  test("User creation username too short", async () => {
    const newUser = {
      username: "te",
      password: "12345",
      name: "test User",
    };
    const result = await api.post("/api/users/").send(newUser);
    expect(result.status).toBe(400);
    expect(result.body.error).toEqual(
      "Password and username must be at least 3 characters long"
    );
    const users = await api.get("/api/users/");
    expect(users.body.length).toBe(0);
  });
  test("Username is taken", async () => {
    const newUser = {
      username: "testUser",
      password: "12345",
      name: "test User",
    };
    let result = await api.post("/api/users/").send(newUser);
    expect(result.status).toBe(200);
    result = await api.post("/api/users/").send(newUser);
    expect(result.status).toBe(400);
    expect(result.body.error).toEqual("Username is already taken");
    const users = await api.get("/api/users/");
    expect(users.body.length).toBe(1);
  });
});
afterAll(() => {
  mongoose.connection.close();
});

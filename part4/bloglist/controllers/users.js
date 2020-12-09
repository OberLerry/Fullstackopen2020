const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (body.password.length < 3 || body.username.length < 3) {
    response
      .status(400)
      .send({
        error: "Password and username must be at least 3 characters long",
      })
      .end();
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    passwordHash: passwordHash,
    name: body.name,
  });
  try {
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    author: 1,
    title: 1,
    url: 1,
    likes: 1,
    id: 1,
  });
  response.json(users);
});

module.exports = usersRouter;

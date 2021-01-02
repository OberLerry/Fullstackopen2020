const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response
      .status(401)
      .json({ error: "token missing or invalid" })
      .end();
  } else {
    const user = await User.findById(decodedToken.id);
    blog.user = user._id;
    if (blog.title && blog.url) {
      const savedBlog = await blog.save();
      //user.blogs = user.blogs.concat(savedBlog._id);
      const result = await savedBlog.execPopulate("user");
      await user.save();
      response.status(201).json(result).end();
    } else {
      response.status(400).json("error: Title and URL missing").end();
    }
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token) {
    console.log("test");
    return response
      .status(401)
      .json({ error: "token missing or invalid" })
      .end();
  } else {
    if (blog.user.toString() === decodedToken.id.toString()) {
      const result = await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response.status(401).end();
    }
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const likes = request.body.likes;
  const result = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: likes },
    { new: true }
  );
  console.log(result);
  response.json(result);
});

module.exports = blogsRouter;

const express = require("express");

const router = express.Router();
const blogs = require("../fakeDatabase/fakeDatabase.js");

router.get("/", (req, res) => {
  res.send(blogs);
  res.status(200).end();
});

router.get("/:id", (req, res) => {
  const blog = blogs.find((blog) => blog.id === Number(req.params.id));
  if (!blog) {
    return res.status(404);
  }
  res.send(blog);
  res.status(200).end();
});

router.post("/", (req, res) => {
  const newBlog = req.body;
  const lastId = blogs
    .map((blog) => blog.id)
    .sort()
    .at(-1);
  const nextId = lastId ? lastId + 1 : 1;
  blogs.push({ ...newBlog, id: nextId });
  res.status(201).end();
});

router.put("/:id", (req, res) => {
  const updatedBlog = { ...req.body, id: Number(req.params.id) };
  const blogToUpdate = blogs.findIndex(
    (blog) => blog.id === Number(req.params.id)
  );
  if (blogToUpdate === -1) {
    return res.status(404).end();
  }
  blogs.splice(blogToUpdate, 1, updatedBlog);
  res.status(200).end();
});

router.delete("/:id", (req, res) => {
  const blogToDelete = blogs.findIndex(
    (blog) => blog.id === Number(req.params.id)
  );
  console.log(blogToDelete);
  if (blogToDelete === -1) {
    res.status(404).end();
  }
  blogs.splice(blogToDelete, 1);
  res.status(200).end();
});

module.exports = router;

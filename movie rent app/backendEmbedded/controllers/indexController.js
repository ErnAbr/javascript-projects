const express = require("express");
const User = require("../models/userModel.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    let allMovies = [];

    users.forEach((user) => {
      user.movies.forEach((movie) => {
        const movieWithUserID = {
          userId: user._id,
          ...movie,
        };
        allMovies.push(movieWithUserID);
      });
    });

    res.status(200).send(allMovies).end();
  } catch (error) {
    console.error(error);
    req.status(500).send(error);
  }
});

router.put("/rent", async (req, res) => {
  try {
    const filter = {
      _id: req.body.movieId,
      "movies.title": req.body.title,
      "movies.category": req.body.category,
      "movies.rentPrice": req.body.rentPrice,
    };
    const update = {
      $set: {
        "movies.$.status": req.body.status,
      },
    };
    const options = {
      new: true,
    };

    const rentedMovie = await User.findOneAndUpdate(filter, update, options);
    if (rentedMovie) {
      res.send({ message: "movie has been Rented" });
    } else {
      res.send({ message: "No matching movie was found." });
    }

    const order = {
      _id: req.body.movieId,
      title: req.body.title,
      category: req.body.category,
      rentPrice: req.body.rentPrice,
      status: req.body.status,
    };

    const rentUser = await User.findById(req.body.userId);
    rentUser.orders.push(order);
    await rentUser.save();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;

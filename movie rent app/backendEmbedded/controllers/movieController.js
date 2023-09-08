const express = require("express");
const User = require("../models/userModel.js");
const router = express.Router();

router.post("/addMovie", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.id,
    });

    if (!user) {
      return res.status(400).send({ message: "User Does Not Exists" });
    }

    const movieData = {
      title: req.body.title,
      category: req.body.category,
      rentPrice: req.body.rentPrice,
      status: "Available",
    };
    user.movies.push(movieData);
    await user.save();
    res
      .status(200)
      .send({ message: "Movie added successfully", movies: user.movies });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/userMovies", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).send(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.delete("/movieDelete", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.body.id,
        movies: {
          $elemMatch: {
            title: req.body.movieInfo.title,
            category: req.body.movieInfo.category,
            rentPrice: req.body.movieInfo.rentPrice,
          },
        },
      },
      {
        $pull: {
          movies: {
            title: req.body.movieInfo.title,
            category: req.body.movieInfo.category,
            rentPrice: req.body.movieInfo.rentPrice,
          },
        },
      },
      {
        new: true,
      }
    );
    res.status(200).send({ message: "movie deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.put("/movieUpdate", async (req, res) => {
  try {
    const filter = {
      _id: req.body.id,
      "movies.title": req.body.movieInfo.title,
      "movies.category": req.body.movieInfo.category,
      "movies.rentPrice": req.body.movieInfo.rentPrice,
    };

    const update = {
      $set: {
        "movies.$.title": req.body.title,
        "movies.$.category": req.body.category,
        "movies.$.rentPrice": req.body.rentPrice,
      },
    };

    const options = {
      new: true,
    };

    const updatedUser = await User.findOneAndUpdate(filter, update, options);

    if (updatedUser) {
      res.send({ message: "movie has been updated" });
    } else {
      res.send({ message: "No matching user found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;

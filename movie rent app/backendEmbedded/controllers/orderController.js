const express = require("express");
const User = require("../models/userModel.js");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    console.error(error);
    req.status(500).send(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const filter = {
      _id: req.params.id,
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

    const user = await User.findOneAndUpdate(
      {
        _id: req.body.movieTenantId,
        orders: {
          $elemMatch: {
            title: req.body.title,
            category: req.body.category,
            rentPrice: req.body.rentPrice,
          },
        },
      },
      {
        $pull: {
          orders: {
            title: req.body.title,
            category: req.body.category,
            rentPrice: req.body.rentPrice,
          },
        },
      },
      {
        new: true,
      }
    );

    res.status(200).send({ message: "movie has been returned" });
  } catch (error) {
    console.error(error);
    req.status(500).send(error);
  }
});

module.exports = router;

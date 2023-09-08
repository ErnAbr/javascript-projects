const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ernabr:SvUQJSKfEcd9egBL@cluster0.oeaasd3.mongodb.net/moviesRentalEmbedded"
    );
    console.log(`connected to database`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDb;

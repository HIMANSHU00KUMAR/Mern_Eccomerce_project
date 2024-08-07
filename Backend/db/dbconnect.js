
// external imports
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

async function dbConnect() {
  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  mongoose.connect(
        process.env.DB_URL
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

export default dbConnect;

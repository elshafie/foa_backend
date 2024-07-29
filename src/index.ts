import express, {Response, Request} from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import {v2 as cloudinary} from "cloudinary"

import usersRoute from './routes/usersRoute'
import myRestaurantRoute from "./routes/myRestaurantRoute";

import { jwtCheck } from "./middleware/auth"


mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => (console.log("Database Connected Successfully")));

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const app = express()

app.use(express.json())
app.use(cors());
app.use(jwtCheck);

//  /api/user
app.use("/api/user", usersRoute)
app.use("/api/restaurant", myRestaurantRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 7000")
})
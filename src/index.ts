import express, {Response, Request} from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"

import usersRoute from './routes/usersRoute'
import { jwtCheck } from "./middleware/auth"


mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => (console.log("Database Connected Successfully")));

const app = express()

app.use(express.json())
app.use(cors());
app.use(jwtCheck);

//  /api/user
app.use("/api/user", usersRoute)

app.listen(7000, () => {
  console.log("Server is running on port 7000")
})
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("cloudinary");
const usersRoute_1 = __importDefault(require("./routes/usersRoute"));
const myRestaurantRoute_1 = __importDefault(require("./routes/myRestaurantRoute"));
const auth_1 = require("./middleware/auth");
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => (console.log("Database Connected Successfully")));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(auth_1.jwtCheck);
//  /api/user
app.use("/api/user", usersRoute_1.default);
app.use("/api/restaurant", myRestaurantRoute_1.default);
app.listen(process.env.PORT, () => {
    console.log("Server is running");
});

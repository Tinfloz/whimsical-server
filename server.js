import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/error.middleware.js";
import userRouter from "./routes/users.routes.js";
import authRouter from "./routes/auth.routes.js";
import paintingRouter from "./routes/paintings.routes.js";

dotenv.config();

const app = express();

// generic middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Mongo up and running")).catch(err => console.error(err))

app.get("/", (_req, res) => {
    return res.status(200).json({
        message:"node server up and running!"
    })
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", paintingRouter);

app.use(errorHandler)
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
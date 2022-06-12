import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectMongo } from "./config";

dotenv.config();
connectMongo();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

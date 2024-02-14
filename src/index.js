import connectDB from "./db/dbIndex.js";

import dotenv from "dotenv";

dotenv.config({
    path: './env'
})

connectDB();
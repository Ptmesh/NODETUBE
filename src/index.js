import connectDB from "./db/dbIndex.js";

import dotenv from "dotenv";

dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`Server running on port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB Connection failed :-(",err);
})
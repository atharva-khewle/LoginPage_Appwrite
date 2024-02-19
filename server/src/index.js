import express from "express";
import cors from "cors";
import { UserInfoRouter } from "./routes/UserAuth.js";
import { UpdateDocRouter } from "./routes/UpdateDoc.js";
import { UserDataRouter } from "./routes/getUserData.js";

const app = express()
app.use(express.json())
app.use(cors())

app.use("/auth",UserInfoRouter)
app.use("/updateDoc",UpdateDocRouter)
app.use("/getDatabyId",UserDataRouter)


app.listen(3001, ()=>{console.log("Server Started at 3001. lets gooooooooooooooooo")});

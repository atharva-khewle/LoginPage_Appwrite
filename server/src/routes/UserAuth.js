import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkIfUserExists, createUserDocument, getDatabyUsername, getUserIdbyUsername } from "../AppWrite_functions.js";
import secrettoken from "../secret_info.js";


const router = express.Router()



router.post("/register", async (req, res) => {
    const { username, password } = req.query;
    


    try {
        const hashedPass = await bcrypt.hash(password, 10);

        if( await checkIfUserExists(username)){
            res.json({
                status:"0",
                message: "User already Registererd",
            })
            return
        }

        await createUserDocument(username,password,null,null)
        .then(response => {
        const token = jwt.sign({ id: response.$id }, secrettoken);

            console.log("d     1: ",response.$id)
            res.json({
                status:"1",
                message: "Registered successfully :)",
                token,
                userID: response.$id,
              });
        })
        .catch(error => console.error(error));
    
        
          } catch (error) {
        res.status(500).json({ 
            status:"0",
            message: "Internall server error :" ,
            error});
      }
  });



    
  router.post("/login", async (req, res) => {
    const { username, password } = req.query;

    try {
        const userData = await getDatabyUsername(username); 
        console.log(userData)
        if (userData === "-1") {
            // User does not exist
            return res.json({ 
                status:"0",
                message: "User does not exist :(" 
            });
        }
        const isPassValid = await bcrypt.compare(password, userData.password);
        if (!isPassValid) {
            return res.json({ 
                status:"0",
                message: "Incorrect Password or username :( " });
        }

        const token = jwt.sign({ id: userData.$id }, secrettoken);
        res.json({
            status:"1",
            message: "Logged In successfully :)",
            token,
            userID: userData.$id
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ 
            status:"0",
            message: "Internal server error" });
    }
});
    
    export {router as UserInfoRouter};
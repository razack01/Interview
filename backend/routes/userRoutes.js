
import {registerUser,getAllUsers} from '../controllers/Usercontroller.js'

import express from "express";
import upload from '../Middlewares/upload.js';
const router= express.Router();

// router.get("/allusers", allUsers)
router.post("/register",upload.array("profileImages", 5),registerUser)
router.get("/allusers" ,getAllUsers)


export default router;


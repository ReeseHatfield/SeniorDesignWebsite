import { Router } from 'express';
import { getImages, authUser, getServerState } from './handlers';
import express from 'express';
import { auth } from './middleware';
import path from "path";

// init express router
export const router = Router(); 
const imgDirPath = path.join(__dirname + "/../images");


// optional param here to like check for access or sum like that thru a header
router.use("/images/", auth,  express.static(imgDirPath));
router.get("/images/", auth, getImages); 
router.post("/auth", authUser);

router.get("/", getServerState)

// router.get("/getServerState", getServerState) // delete this, very insecure, used only for debugging


export default router;

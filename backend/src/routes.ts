import { Router } from 'express';
import { getImages } from './handlers';
import express, {Request, Response, NextFunction} from 'express';
import { auth } from './middleware';
import path from "path";

export const router = Router(); // express router
const imgDirPath = path.join(__dirname + "/../images");


// optional param here to like check for access or sum like that thru a header
router.use("/images", auth,  express.static(imgDirPath));
router.get("/images", auth, getImages);



export default router;

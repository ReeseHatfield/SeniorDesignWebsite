import { Request, Response } from "express";
import fs, { glob } from "fs";
import path from "path";
import { CORRECT_PW_HASH, genSessionID } from "./auth_constants";
import crypto from 'crypto';

const imgDirPath = path.join(__dirname + "/../images");

// return a comma separated list of all the images
export const getImages = (req: Request, res: Response) => {

    console.log("Got to img endpoint");

    let files: string[] = getImagesInDir(imgDirPath);

    return res.status(200).json({
        message: files,
    });
};

// separated for easier server state debugging
const getImagesInDir = (path: string) => {

    let files: string[] = fs.readdirSync(imgDirPath);

    const exts = [".jpg", ".png", ".jpeg"];

    const filterFiles = (files: string[], exts: string[]) => {
        return files.filter((file) => {
            const lastIndex = file.lastIndexOf(".");
            return lastIndex !== -1 && exts.includes(file.substr(lastIndex));
        });
    };

    files = filterFiles(files, exts);

    return files.map(filename => {
        return "/images/".concat(filename);
    })
} 


export const authUser = (req: Request, res: Response) => {
    const attemptedUsername = req.body.username;
    const attemptedPassword = req.body.password;

    console.log(req.body);

    if(attemptedUsername == undefined || attemptedPassword == undefined){
        return res.status(401).json({
            error: "No username or password provided"
        });
    }

    // Username: ObiWan
    // Password: highground
    const correctUserName = "ObiWan";
    const correctHashedPassword = CORRECT_PW_HASH;

    const hashedAttempedPassword = crypto.createHash('md5').update(attemptedPassword).digest('hex');

    if(attemptedUsername != correctUserName){
        return res.status(401).json({
            error: "Invalid username or password"
        });
    }

    if(hashedAttempedPassword != correctHashedPassword){
        return res.status(401).json({
            error: "Invalid username or password"
        })
    }

    const sessionID = genSessionID(16);

    global.sessionID = sessionID;

    return res.status(200).json({
        id: sessionID
    });

    /*

    curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"username":"ObiWan","password":"highground"}' \
    http://localhost:3001/auth

    */


}

// should never be hit by end user
export const getServerState = (req: Request, res: Response) => {
    return res.status(200).json({
        id: global.sessionID, 
        images: getImagesInDir(imgDirPath)
    });
}

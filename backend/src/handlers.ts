import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const imgDirPath = path.join(__dirname + "/../images");

// return a comma separated list of all the images
export const getImages = (req: Request, res: Response) => {
    // need to check auth, from params? headers?

    let files: string[] = fs.readdirSync(imgDirPath);

    const exts = [".jpg", ".png", ".jpeg"];

    const filterFiles = (files: string[], exts: string[]) => {
        return files.filter((file) => {
            const lastIndex = file.lastIndexOf(".");
            return lastIndex !== -1 && exts.includes(file.substr(lastIndex));
        });
    };

    files = filterFiles(files, exts);

    files = files.map(filename => {
        return "/images/".concat(filename);
    })

    return res.status(200).json({
        message: files,
    });
};

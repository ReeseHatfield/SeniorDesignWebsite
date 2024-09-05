import express, {Request, Response, NextFunction} from 'express';

export function auth(req: Request, res: Response, next: NextFunction) {
    const id = req.headers.id;

    console.log("hit auth middleware");

    if(id == undefined){
        return res.status(400).json({
            error: "No session ID provided"
        });
    }

    const ok = id == global.sessionID;
    console.log("Actual ID: " + global.sessionID);
    console.log("Attempted ID: " + id);
    console.log("Ok: " + ok);

    
    if(!ok){
        return res.status(401).json({
            error: "Unauthorized session id" 
        });
    }

    next();
}

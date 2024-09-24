import express, { Express, Application, NextFunction } from "express";
import cors from 'cors';
import routes from "./routes";
import helmet from "helmet";
import https from 'https';
import fs from 'fs';

const port = 3001;
let app: Application = express();


// used for user auth, add global state.
declare global {
  var sessionID: string;
}

const resetSessionID = () => {
  global.sessionID = "";
}

global.sessionID = "";


app = config(app)
app.use(routes)

const server = https.createServer({
  key:  fs.readFileSync(`/etc/ssl/private/apache_cert.key`, 'utf-8'),
  cert: fs.readFileSync(`/etc/ssl/certs/apache-ssl-selfsigned.crt`, 'utf-8')
}, app);


server.listen(443); /// this port might be broken


app.listen(port, '0.0.0.0', () => {
  console.log(`Backend TP server is running on http://localhost:${port}`);
});


/* Testing with curl

  
  curl --header "Content-Type: application/json" \
    --request POST \                           
    --data '{"username":"ObiWan","password":"[password]"}' \
    http://localhost:3001/auth


  curl -XGET -H 'id: dac49c32c123b4a7' -H "Content-type: application/json" --location 'http://localhost:3001/images'

 */

function config(app: Application): Application {
  app.use(cors())

  app.use(express.json());

  // some browsers really dislike serving that endpoint for some reason, need to loosen CSP
  app.use(helmet({
    contentSecurityPolicy: false
  }))

  return app;
}
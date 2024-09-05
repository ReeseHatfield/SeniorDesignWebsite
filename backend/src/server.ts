import express, { Express, Application, NextFunction } from "express";
import cors from 'cors';
import routes from "./routes";
import helmet from "helmet";

const port = 3001;
let app: Application = express();
const frontEndPoint = "http://localhost:5173"; // change in prod / when someone implements https


app = config(app)
app.use(routes)

app.listen(port, () => {
  console.log(`Backend TP server is running on http://localhost:${port}`);
});


function config(app: Application): Application {
  // allow cors from wherever the front end actually is
  app.use(cors({
    origin: frontEndPoint,
  }));
  
  // blanket allow all cors bc cors is hard
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(express.json());

  // some browsers really dislike serving that endpoint for some reason, need to loosen CSP
  app.use(helmet({
    contentSecurityPolicy: false
  }))

  return app;
}
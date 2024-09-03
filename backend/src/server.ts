import express, { Application } from "express";


const port = 3001;
let app: Application = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});


app.listen(port, () => {
  console.log(`Backend TP server is running on http://localhost:${port}`);
});

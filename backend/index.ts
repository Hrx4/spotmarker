import bodyParser from "body-parser";
import express from "express";
import userRoutes from "./routes/userRoutes"
import noteRoutes from "./routes/noteRoutes"
import labelRoutes from "./routes/labelRoutes"
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cookieParser());
app.use(cors())
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user" , userRoutes)
app.use("/note" , noteRoutes)
app.use("/label" , labelRoutes)

app.listen(8080, () => {
  console.log("Server is running on port 8000");
});
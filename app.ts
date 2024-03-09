import express from "express";
import { router as movie } from "./api/movie";
import { router as stars } from "./api/stars";
import { router as creators } from "./api/creators";
import { router as search } from "./api/search";

import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.json());

app.use("/movie",movie);
app.use("/stars",stars);
app.use("/creators",creators);
app.use("/search",search);

app.use((req,res)=>{
    res.status(404);
    res.send("Seviec not found");
});
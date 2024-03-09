import express, { query } from "express";
import { conn } from "../bdconnect";
import { Movie, creators, stars } from "../mobel/mobel_search";
import mysql from "mysql";
import util from "util";

export const router = express.Router();

export const queryAsync = util.promisify(conn.query).bind(conn);

router.get("/:input", async (req,res)=>{
    
let input = '%' + req.params.input + '%';

const sql = mysql.format('SELECT * FROM Movie WHERE Mo_name LIKE ?', [input]);
let result = await queryAsync(sql);

const rawData = JSON.parse(JSON.stringify(result));
console.log(rawData);

let data: (Movie & { stars: stars[], creators: creators[] })[] = [];

for (let i = 0; i < rawData.length; i++) {
    let movieData = rawData[i] as Movie;
    console.log(movieData.Mid);

    const sql_stars = mysql.format('SELECT * FROM MStars WHERE Mid = ?', [movieData.Mid]);
    let starsResult = await queryAsync(sql_stars);
    const starsData = JSON.parse(JSON.stringify(starsResult)) as stars[];
    
    const sql_creators = mysql.format('SELECT * FROM MCreator WHERE Mid = ?', [movieData.Mid]);
    let creatorsResult = await queryAsync(sql_creators);
    const creatorsData = JSON.parse(JSON.stringify(creatorsResult)) as creators[];

    data.push({ ...movieData, stars: starsData, creators: creatorsData });
}
    console.log(data);
    res.json(data);
    
});


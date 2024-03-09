import express from "express";
import { conn } from "../bdconnect";
import { Movie, creators, stars } from "../mobel/mobel_search";
import mysql from "mysql";
import util from "util";

export const router = express.Router();

export const queryAsync = util.promisify(conn.query).bind(conn);

router.get("/:input", async (req,res)=>{
    // let input = req.params.input;
    let input = '%' + req.params.input + '%';
    let data : Movie | undefined;

    const sql = mysql.format('SELECT * FROM Movie WHERE Mo_name LIKE ?', [input]);
    let result = await queryAsync(sql);
    const rawData = JSON.parse(JSON.stringify(result));
    console.log(rawData);
    data = rawData[0] as Movie;
    console.log(data.Mid);

    const sql_stars = mysql.format('SELECT * FROM MStars WHERE Mid = ?', [data.Mid]);
    let result2 = await queryAsync(sql_stars);
    const starsData = JSON.parse(JSON.stringify(result2)) as stars[];
    console.log(starsData);

    data.stars = starsData;
    console.log(data); 

    const sql_creators = mysql.format('SELECT * FROM MCreator WHERE Mid = ?', [data.Mid]);
    let result3 = await queryAsync(sql_creators);
    const creatorsData = JSON.parse(JSON.stringify(result3)) as creators[];
    console.log(creatorsData);
    data.creators = creatorsData;
    console.log(data);

    res.json(data);
  
 
});

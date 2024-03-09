import express from "express";
import { conn } from "../bdconnect";
import { Movie } from "../mobel/mobel_Movie";
import mysql from "mysql";
import util from "util";

export const router = express.Router();

export const queryAsync = util.promisify(conn.query).bind(conn);

router.get("/", (req, res) => {
    conn.query('select * from  Movie', (err, result, fields)=>{
    if(err) throw err;
      res.json(result);
    });
});
// เพิ่ม
router.post("/",(req,res)=>{
    let body : Movie = req.body;
    let sql = 'INSERT INTO `Movie`(`Mo_name`, `Mo_year`, `Mo_runtiem`, `Mo_plot`) VALUES(?,?,?,?)';
    sql = mysql.format(sql,[
        body.Mo_name,
        body.Mo_year,
        body.Mo_runtiem,
        body.Mo_plot
    ]);
    conn.query(sql,(err,result)=>{
        if(err) throw err;
        res
            .status(201)
            .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});
// ลบ
router.delete("/:del_id",(req,res)=>{
    let id = +req.params.del_id;
   // ลบข้อมูล person ที่เชื่อมโยงกับหนังด้วย mid
    conn.query("delete MCreator, MStars FROM MCreator, MStars, Movie WHERE Movie.Mid = MCreator.Mid AND Movie.Mid = MStars.Mid and Movie.Mid = ? ", [id], (err, personResult) => {
        if (err) throw err;
        // ตรวจสอบว่ามี person ถูกลบไปหรือไม่
        if (personResult.affectedRows > 0) {
            // ถ้ามีข้อมูล person ถูกลบไป ให้ลบข้อมูลหนังด้วย id ที่รับมา
            conn.query("DELETE FROM `Movie` WHERE Mid = ?", [id], (err, movieResult) => {
                if (err) throw err;
                res.status(200).json({ affected_row: movieResult.affectedRows });
            });
        } else {
            // ถ้าไม่มีข้อมูล person ถูกลบไป ให้แค่ลบข้อมูลหนังด้วย id ที่รับมา
            conn.query("DELETE FROM `Movie` WHERE Mid = ?", [id], (err, movieResult) => {
                if (err) throw err;
                res.status(200).json({ affected_row: movieResult.affectedRows  });
            });
        }
    });
});

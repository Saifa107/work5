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
    let del_id = req.params.del_id;
    let sql = 'DELETE FROM `Movie` WHERE Mid = ?'
    sql = mysql.format(sql,[del_id]);
    conn.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows == 1){
            res
                .status(200)
                .json({ message: "Delete success"});
        }else{
            res
                .status(400)
                .json({message: "Delete failed"});
        }
    });
});

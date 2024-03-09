import express from "express";
import { conn } from "../bdconnect";
import { Stars } from "../mobel/mobel_Stars";
import mysql from "mysql";
import util from "util";

export const router = express.Router();

export const queryAsync = util.promisify(conn.query).bind(conn);

router.get("/", (req, res) => {
    conn.query('select * from  `MStars` ', (err, result, fields)=>{
    if(err) throw err;
      res.json(result);
    });
});
// เพิ่ม
router.post("/",(req,res)=>{
    let body : Stars = req.body;
    let sql = 'INSERT INTO `MStars`(`S_name`, `S_born`, `Mid`) VALUES(?,?,?)';
    sql = mysql.format(sql,[
        body.S_name,
        body.S_born,
        body.Mid,
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
    let sql = 'DELETE FROM `MStars` WHERE M_sid = ?'
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
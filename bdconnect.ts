import mysql from "mysql";

// สามารถจองได้ 2 ตัว
export const conn = mysql.createPool({
  connectionLimit: 2,
  host: "202.28.34.197",
  user: "web66_65011212203",
  password: "65011212203@csmsu",
  database: "web66_65011212203",
});
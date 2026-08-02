const db=require("./db");

(async()=>{

const [rows]=await db.query("select * from employees");

console.log(rows);

})();
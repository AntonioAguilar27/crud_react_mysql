const express = require("express");
const cors = require("cors");
const mysql = require("mysql");


const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud",
    port: 3307
}) 

app.get("/", (req, res) => {
    const sql = "SELECT * FROM estudiante";
    db.query(sql , (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post('/create', (req,res) => {
    const sql = "INSERT INTO estudiante (`Nombre`, `Correo`) VALUES (?)";
    const values  = [
        req.body.nombre,
        req.body.correo
    ]
    db.query(sql, [values], (err,data) => {
        if(err)return res.json(err)
        return res.json(data);
    })
})

app.put('/update/:id', (req,res) => {
    const sql =  "update estudiante set `Nombre` = ?, `Correo` = ? where ID = ? ";
    const values  = [
        req.body.nombre,
        req.body.correo
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err,data) => {
        if(err)return res.json(err)
        return res.json(data);
    })
})

app.delete('/estudiante/:id', (req,res) => {
    const sql =  "DELETE from estudiante WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err,data) => {
        if(err)return res.json("Error")
        return res.json(data);
    })
})


app.listen(8081, () =>{
    console.log('listening');
})


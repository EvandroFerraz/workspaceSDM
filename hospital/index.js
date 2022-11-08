const express = require('express')
const app = express()
app.use(express.json())
const porta = 3000
const mysql = require('mysql2')

app.get('/medicos', (req,res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'hospital',
        password: '1234'
    })

    connection.query('SELECT * FROM tb_medico', (err, results, fields) => {
        console.log(results)
        res.json(results)
    })
})

app.get('/pacientes', (req,res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'hospital',
        password: '1234'
    })
    connection.query('SELECT * FROM tb_paciente',  (err, results, fields) =>{
        res.json(results)
    })
})

app.post('/medicos', (req, res) => {
    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hospital',
    password: '1234'
    })

    const crm = req.body.crm
    const nome = req.body.nome

    const sql = "INSERT INTO tb_medico (crm, nome) VALUES (?, ?)"
    connection.query(sql,[crm, nome], (err, results, fields) => {
    console.log (results)
     res.send('ok')
     })
})

app.listen(porta, () => console.log(`Executando. Porta ${porta}`))
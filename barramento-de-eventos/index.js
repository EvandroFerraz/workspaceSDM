const express = require('express');
const bodyParser = require('body-parser');
//para enviar eventos para os demais microsserviços
const axios = require('axios');

const eventos = []

const app = express();
app.use(bodyParser.json());

app.post('/eventos', (req, res) => {
 const evento = req.body;
 eventos.push(evento)
 //envia o evento para o microsserviço de lembretes
 axios.post('http://172.17.0.3:4000/eventos', evento);
 //envia o evento para o microsserviço de observações
 axios.post('http://0.0.0.0:5000/eventos', evento);
 //envia o evento para o microsserviço de consulta
 axios.post("http://0.0.0.0:6000/eventos", evento);
 //envia o evento para o microsservico de classificacao
 axios.post("http://0.0.0.0:7000/eventos", evento);
 
 res.status(200).send({ msg: "ok" });
 });

 app.get('/eventos', (req,res) =>{
    res.send(eventos)
 })

 app.listen(10000, () => {
 console.log('Barramento de eventos. Porta 10000.')
 })
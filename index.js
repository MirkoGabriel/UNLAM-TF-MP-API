const express = require('express');
const morgan = require('morgan');
const mercadopago = require('mercadopago');
const server = express();
require('dotenv').config();

var cors = require('cors');
const { response } = require('express');

server.use(express.json());
server.use(morgan('dev'))

server.use(cors());

mercadopago.configure({access_token: process.env.MERCADOPAGO_KEY});
server.post("/payment", (req,res) =>{
    const prod = req.body;

    let preference = {
        items: [{
            id : 123,
            title:prod.title,
            currency_id:'ARS',
            picture_url: prod.image,
            description: prod.description,
            category_id: 'art',
            quantity:1,
            unit_price:prod.price
        }],
        back_urls:{
            success:'https://localhost:3000',
            failure:'',
            pending:''
        },
        auto_return:'approved',
        binary_mode:true
    }
    mercadopago.preferences.create(preference).then((response) => res.status(200).send({response})).catch((error) => res.status(400).send({error:error.message}));
})

server.listen(3001, () => {
    console.log("Server is runing on port 3001..")
})
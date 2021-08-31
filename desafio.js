const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8080;
//CONSIGNA Nº 1
//Ruta get '/items' que responda un objeto con todos los productos y su 
//cantidad total en el siguiente formato: { items: [productos], cantidad: (cantidad productos) }

let data = fs.readFileSync('./productos.txt');

let productos = JSON.parse(data);
let cantidad = productos.length;

//CONSIGNA Nº 2
//Ruta get '/item-random' que devuelva un producto elegido al 
//azar desde un array de productos que se encuentran en el archivo 'productos.txt'.
const aleatorio = Math.floor(Math.random() * (cantidad - 1) + 1);

const prod = productos[aleatorio];

//CONSIGNA Nº 3
//La ruta get '/visitas' devuelve un objeto que indica cuantas veces se visitó la ruta del punto 1 y cuantas la ruta del punto 2. 
//Contestar con el formato:  { visitas : { items: cantidad, item: cantidad } }

let visitasItems = 0;
let visitasItemRandom = 0;

const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server.on('error', error=>console.log('Error en servidor', error));

app.get('/', (req,res)=>{
    res.send('<h1> Bienvenidos al Servidor Express </h1>');
});

app.get('/items', (req,res)=>{
    //Ruta get '/items' que responda un objeto con todos los productos y su 
    //cantidad total en el siguiente formato: { items: [productos], cantidad: (cantidad productos) }
    res.json({ items: [productos], cantidad: cantidad })
    res.send(`${visitasItems++}`);
    
});

app.get('/item-random', (req,res)=>{
    //El formato de respuesta será: { item: {producto} }
    res.json({ item: {prod} });
    res.send(`${visitasItemRandom++}`);
});

app.get('/visitas', (req,res)=>{
    //Contestar con el formato:  { visitas : { items: cantidad, item: cantidad } }
    res.json({ visitas : { items: visitasItems, itemRandom: visitasItemRandom }});
});

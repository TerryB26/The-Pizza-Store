const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//db Connection
const db = mysql.createConnection({
   host: "localhost",
   user: 'root',
   password: '',
   database: 'the-pizza-store'
})


app.get('/', (re, res) => {
    return res.json("Api Successful");
})

//get data from the pizza db
app.get('/pizzas', (req, res)=> {
    const sql = "SELECT * FROM pizzas";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/toppings', (req, res)=> {
    const sql = "SELECT * FROM toppings";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/sales', (req, res)=> {
    const sql = "SELECT SUM(orderTotal) AS totalMoney, COUNT(orderId) AS TotalOrders FROM orders \n" +
        "WHERE date = CURRENT_DATE";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})


app.get('/pizza-base', (req, res)=> {
    const sql = "SELECT * FROM pizzabase";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/orders', (req, res)=> {
    const sql = "SELECT O.orderId, P.name, P.ingredients, TP.name AS topName, TP.toppings, PB.type, O.orderRef, O.orderNote, O.orderTotal, O.custPhone, O.custName,  DATE_FORMAT(O.date, '%Y-%m-%d %H:%i:%s') AS date, S.statusType FROM orders AS O\n" +
        "JOIN pizzas AS P ON O.pizzaId = P.id\n" +
        "JOIN pizzabase AS PB ON PB.baseId = O.baseId\n" +
        "JOIN status AS S ON S.statusId = O.statusId\n" +
        "JOIN toppings TP  ON TP.toppingId = O.toppingId\n" +
        "ORDER BY O.date DESC";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post('/post', (req, res) => {
    console.log(req.body)
    res.json({"message":"sunmitted"})
});

app.post('/orders', (req, res) => {
    const { username, surname, phone, note, pizzaNum, baseNum, topNum, status,  totalPrice, refNumber } = req.body;

    // Inserting the order along with customer information directly into the orders table
    const orderQuery = "INSERT INTO orders (custName, custPhone, pizzaId, toppingId, baseId, statusId, orderTotal, orderNote, orderRef) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(orderQuery, [`${username} ${surname}`, phone, pizzaNum, topNum, baseNum, status, totalPrice, note, refNumber], (err, result) => {
        if (err) {
            console.error("Error inserting order:", err);
            return res.status(500).json({ error: "Error inserting order" });
        }

        return res.status(201).json({ message: "Order created successfully", orderId: result.insertId });
    });
});

app.listen(2663, ()=>{
    console.log("Port Running");
})
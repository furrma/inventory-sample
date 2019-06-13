const mysql =require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json)

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'inventory',
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('Database connection succeeded.');
    else
    console.log('Database connection failed \n Error: ' + JSON.stringify(err,undefined,2));
});


app.listen(3000,()=>console.log('Express server is running at port number: 3000'));

//get all items
app.get('/items',(req, res)=>{
    mysqlConnection.query('SELECT * FROM items',(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//get item
app.get('/items/:id',(req, res)=>{
    mysqlConnection.query('SELECT * FROM items WHERE id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//delete item
app.delete('/items/:id',(req, res)=>{
    mysqlConnection.query('DELETE FROM items WHERE id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send('Deleted successfully.');
        else
        console.log(err);
    })
});

//add item
app.post('/items',(req, res)=>{
    let emp = req.body;
    var sql = "SET @id = ?; SET @name = ?; SET @qty = ?; SET @amount = ?; \
    CALL ItemAddEdit(@id,@name,@qty,@amount);";
    mysqlConnection.query(sql,[emp.id,emp.name,emp.qty,emp.amount],(err, rows, fields)=>{
        if(!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted id: ' + element[0].id)
            });
        else
        console.log(err);
    })
});

//update item
app.put('/items',(req, res)=>{
    let emp = req.body;
    var sql = "SET @id = ?; SET @name = ?; SET @qty = ?; SET @amount = ?; \
    CALL ItemAddEdit(@id,@name,@qty,@amount);";
    mysqlConnection.query(sql,[emp.id,emp.name,emp.qty,emp.amount],(err, rows, fields)=>{
        if(!err)
            res.send('Updated successfully.')
        else
        console.log(err);
    })
});
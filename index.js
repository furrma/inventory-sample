const mysql =require('mysql');

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'inventory'
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('Database connection succeeded.');
    else
    console.log('Database connection failed \n Error: ' + JSON.stringify(err,undefined,2));
});
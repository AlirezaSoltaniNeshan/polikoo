const express = require('express');
const router = express.Router();
const mySql = require('mysql');
const dbConfig = require('../config/db');

// Create connection to db MySQL
const conn = mySql.createConnection(dbConfig);


router.get('/', (req, res, next)=>{
    const userId = req.params.userId;
    const username =  req.cookies.username;
    const password = req.cookies.password;
    if(userId === username){
            const cmd = `select * from accounts where username like "%${username}%" and password like "%${password}%"`;
            conn.query(cmd, (err, results)=>{
            if(err){
                res.redirect('login');
            }
            res.render('test', {results: results});
            })
        }else{
            res.redirect('login');
        }
});

module.exports = router;
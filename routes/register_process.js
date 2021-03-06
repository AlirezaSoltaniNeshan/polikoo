const express = require('express');
const router = express.Router();
const mySql = require('mysql');
const dbConfig = require('../config/db')
const publicIp = require('public-ip');
const bcrypt = require('bcrypt');
// Create connection to db MySQL
const conn = mySql.createConnection(dbConfig);

//register_process
router.post('/', (req, res, next)=>{
    const saltRounds = 10;
        const fullname = req.body.fullname;
        const username = req.body.username;
        const password = req.body.password;
        const ntCode = req.body.ntCode;
        const ipAddre = req.body.ipaddress;
        console.log(ipAddre);
        //hashing passwords
        bcrypt.genSalt(saltRounds, (err, salt)=>{
            bcrypt.hash(password, salt, (err, hash)=>{
                const usrData = {
                    fullname: fullname,
                    username: username,
                    password: hash,
                    naturalcode: ntCode,
                    ipaddress: ipAddre
                };
                
                if(fullname!=="" && username!=="" &&
                password!=="" && ntCode!==""){
                    if(password.length >= 8){
                        // SQL command
                        const cmd = 'insert into accounts set ?';
                        conn.query(cmd, usrData, (err, results)=>{
                            if(err) {
                                res.redirect('/signup?msg=dbFailure');
                            }else{
                                const data = {username: username, additionip: req.body.ipAddition}; 
                                const cmd = 'insert into restip set ?';
                                conn.query(cmd, data, (err, result)=>{
                                    if(err){
                                        res.redirect('/signup?msg=dbFailure');
                                    }else{
                                        res.redirect('login?msg=success');
                                    }
                                })
                            }
                        });
                    }else{
                        res.redirect('/signup?msg=lengthStricts');
                    }
                }else{
                    res.redirect('/signup?msg=failure');
                }
            });
        });
});


module.exports = router;
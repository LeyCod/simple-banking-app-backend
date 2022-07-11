//const mysqlConnection = require('../config/db.config');
const mongoose = require('../config/db.config');
const {Bank} = require('../models/bankModel.js')
const jwt = require('jsonwebtoken');


//Create User
const createUser = (req, res) => {

    let {firstname,lastname,age, bankbalance} = req.body;

    // create an username
    function toUsername(firstname, lastname) {
        return (firstname.toLowerCase() + lastname.toLowerCase()).replace(/\s+/g, "");
    }

    const name = toUsername(firstname, lastname);

    // Create Ramdon Number

    function getRandomNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    const accountnumber = getRandomNum(10000000, 99999999)

    Bank.findOne({username: name}, function(err, data){
        if (err) throw err;

        if (data !== null) {
            console.log("Account already exists");
            res.json({message: "Account already exists"});
        } else {

            const account = new Bank({
                username: name,
                firstname: firstname,
                lastname: lastname,
                age: age,
                balance: bankbalance,
                accountnum: accountnumber
            });

            // saves to mongodb
            account.save(function(err, data){
                res.json({message: "User Created"});
            });
        }
    })
    
  }


  //login 
  const login = (req, res)=>{

    let {username,password} = req.body;
    if (!username) return res.status(400).json({"msg":"Verifique el username"})
    if (!password) return res.status(400).json({"msg":"Verifique el password"})


        // searches mongodb for account

        Bank.findOne({username: username}, function(err, data){

            if (err) throw err;
            if (data == null) {
                res.json({status: "Account does not exist"});
            } else {
                res.json({account: data})
            }
        })

  }


//obtener datos
  const getData = (req, res) => {

    // mysqlConnection.query('SELECT * FROM `alumnos`', (err, rows) => {
    //     if(!err) {
    //         console.log(rows);
    //     res.json({"results":rows})
    //     } else {
    //       console.log(err);
    //     }
    //   }); 
  }

  //exportando los controladores
  exports.createUser = createUser;
  exports.getData = getData;
  exports.login = login;
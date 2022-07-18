const mongoose = require('../config/db.config');
const {Bank} = require('../models/bankModel.js')
const jwt = require('jsonwebtoken');


//Create User
const createUser = (req, res) => {

    let {firstname, lastname, age, balance} = req.body;

    // create an username
    function toUsername(firstname, lastname) {
    return (firstname + lastname).replace(/\s+/g, "");
}

    const name = toUsername(firstname, lastname);

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
                balance: balance
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

    let {username} = req.body;

    if (!username) return res.status(400).json({"msg":"Verifique el username"})

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

const getData = (req, res) => {

    }

  //exportando los controladores
    exports.getData = getData;
    exports.createUser = createUser;
    exports.login = login;
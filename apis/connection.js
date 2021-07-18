const mysql = require("mysql")

const connection = mysql.createConnection({
    host:"b0pvcyaxjphwkhrcfnkl-mysql.services.clever-cloud.com",
    user:"uelrcdmrmg8d8gnz",
    password:"SWoOWs0wmebIt2e7bg4n",
    //database:"b0pvcyaxjphwkhrcfnkl"
})

module.exports = connection
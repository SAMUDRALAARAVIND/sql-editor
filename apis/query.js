const connection = require("./connection")

class executeQuery {
    constructor(query){
        this.query = query 
    }
    analyseQuery(){
        let breaks = ["create", "drop"]
        let currentQuery = this.query.toLowerCase()
        let count = 0
        for(let i=0;i<currentQuery.length;i++){
            if(currentQuery[i] === ";") count++
        }
        let wordList = currentQuery.split(" ")
        let foundWord = false
        for(let i=0;i<2 && !foundWord ;i++){
            for(let j=0;j<wordList.length && !foundWord;j++){
                if(breaks[i] === wordList[j] ) foundWord = true
            }
        }
        return foundWord 
    }
    showTables(callBack){
        connection.query("show tables;",(err,result)=>{
            if(err) callBack({status:"error",message:err})
            else callBack({status:"success", data:result})
        })
    }
    execute(callBack) {
        let status = this.analyseQuery()
        if(status === true) callBack({status:"failed",type:"hacker", message:"Do not try to create a table (or) send multiple queries"})
        else{
            this.query = "use b0pvcyaxjphwkhrcfnkl;"+this.query ;
            connection.query(this.query , (err,result)=>{
                if(err) callBack({status:"failed",type:"error", message:err})
                else if(!Array.isArray(result)) callBack({status:"success", type:"update", message:result})
                else callBack({status:"success",type:"read", data:result })
            })
        }
    }

}
class fetchDatabases{
    
    getAllDatabases(callBack){
        let query = "show databases;"
        connection.query(query, (err, result)=>{
            if(err) callBack({status:"error", data:result})
            else callBack({status:"success", data:result})
        })
    }
}
module.exports  = {executeQuery, fetchDatabases}
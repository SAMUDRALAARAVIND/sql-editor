const express = require("express")
const app = express()
const mysql = require("mysql")
const bodyparser = require("body-parser")
const {executeQuery, fetchDatabases} = require("./apis/query")
const cors = require("cors")
app.use(cors())
const port = process.env.PORT || 8080
app.use(bodyparser.urlencoded({extended:true}))
app.listen(port, ()=>{
	console.log("app is listening on port 8080")
})

app.get("/", (req,resp)=>{
	resp.send("working")
})
app.get("/query", (req,resp)=>{
	let query = req.query.query;
	let handler = new executeQuery(query);
	handler.execute((data)=>{
		resp.send(data);
	})
})
app.get("/tables", (req,resp)=>{
	let handler = new executeQuery()
	handler.showTables((data)=>{
		resp.send(data)
	})
})
app.get("/databases" ,(req,resp)=>{
	console.log("requested")
	let handler = new fetchDatabases()
	handler.getAllDatabases((data)=>{
		resp.send(data)
	})
})

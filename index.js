const mongoose=require("mongoose")
const express=require("express")
const app=express()
const Point=require('./node')
console.dir(app)
mongoose.connect('mongodb://localhost:27017/MindMap',{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology:true})
.then(()=>{console.log("Connection open.")})
.catch((err)=>{
    console.log("OH,ERR!")
    console.log(err)
})

//const db=mongoose.connection;
//db.on("error",console.error.bind(console,"Connection Error:"))
//db.once("open",function(){
//    console.log("Connection Open!")
//})

app.get("/",async(req,res)=>{
    console.log("New request!")
    const user=new Point({title:'theme',parent:"Null",Children:["branch1","branch2","branch3"]})
    await user.save()
    res.sendFile('index.html', {root: __dirname})
})
app.get("/2.48a753dc.chunk.css",(req,res)=>{
    console.log("New request!")
    res.sendFile('build/static/css/2.48a753dc.chunk.css', {root: __dirname})
})
app.get("/main.ff8928ef.chunk.css",(req,res)=>{
    console.log("New request!")
    res.sendFile('build/static/css/main.ff8928ef.chunk.css', {root: __dirname})
})
app.get("/2.fad8162a.chunk.js",(req,res)=>{
    console.log("New request!")
    res.sendFile('build/static/js/2.fad8162a.chunk.js', {root: __dirname})
})
app.get("/main.1196e70d.chunk.js",(req,res)=>{
    
    console.log("New request!")
    res.sendFile('build/static/js/main.1196e70d.chunk.js', {root: __dirname})
})
app.post("/"),async(req,res)=>{
    console.log("New request!!!!!!!!!!!!!!!!!!!!!!!!")
    const new_node=req.new_node
    const point=new Point({title:new_node.new_node_id,content:"blank",parent:new_node.node_id,Children:[]})
    await point.save()
}
/*app.post("/editNodeInfo"),async(req,res)=>{
    const new_node=res.new_node
    const point=new Point({title:new_node.new_node_id,content:new_node.info,parent:new_node.node_id,Children:[]})
    await point.save()
}*/
app.listen(4000,()=>{
    console.log("Listening on port 4000!")
})
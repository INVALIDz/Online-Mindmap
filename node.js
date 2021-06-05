const mongoose=require('mongoose')
const Schema =mongoose.Schema
const NodeSchema=new Schema({
    id:String,
    content:String,
    parent:String,
})
module.exports=mongoose.model("Point",NodeSchema)
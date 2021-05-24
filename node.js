const mongoose=require('mongoose')
const Schema =mongoose.Schema
const NodeSchema=new Schema({
    title:String,
    parent:String,
    children:[String]
})
module.exports=mongoose.model("Point",NodeSchema)
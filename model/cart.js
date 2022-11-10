const mongoose = require('mongoose')
const schema = mongoose.Schema
const Product = require('./product')
const User = require('./user')

const cartSchema = new schema({
    id:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        ref:User,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
   products:[
        {
            productId:{
                type:String,
                ref:Product,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
   ]
})

module.exports = mongoose.model('cart',cartSchema)
const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    id:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    name:{
        firstname:{
            type:String,
        },
        lastname:{
            type:String,
        }
    },
    address:{
        city:String,
        street:String,
        doornumber:Number,
        zipcode:String,
        geolocation:{
            lat:String,
            long:String
        }
    },
    phone:String
})

module.exports = mongoose.model('user',userSchema)
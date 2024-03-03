const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username:{
        type: String ,
        required: true ,
        unique: true
    } ,
    email :{
        type : String ,
        required : true ,
        unique: true
    },
    password :{
        type: String ,
        required: true ,
        unique: true
    }
    ,
    fullname :{
        type : String ,
        required: true ,
    },
    bio: String,
    profilePictureURL: String,
    socialMedia: {
      linkedIn: String,
      github: String
    },
    skills: [String],
    location: String,
    websiteURL: String



})


const User = mongoose.model('User',userSchema)

module.exports = User ;
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const authSchema = new Schema({
    fullName: {
        type: String,
        require: true,
    },
    email :{
        type: String,
        require: true,
        unique: true
    },
    password : {
        type: String,
        require: true,
    }
})

authSchema.statics.signup = async function(fullName,email,password) {

    if(!fullName ||!email||!password){
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Not a valid email")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is weak")
    }

    const exist = await this.findOne({email})

    if (exist) {
        throw Error("Email cannot be use")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    const user = await this.create({fullName, email, password: hash })

    return user

}

authSchema.statics.login = async function (email, password) {

    if(!email||!password){
        throw Error("All fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("Not a valid email")
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error("Email or password not found")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error("Email or password not correct")
    }

    return user
}

module.exports = mongoose.model("User", authSchema);
const { Schema, model } = require('mongoose')
// import {} from 'mongoose'

const userCollection = 'usuarios'

const UserSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})
let UserModel = model(userCollection, UserSchema)

module.exports = {
    UserModel
}

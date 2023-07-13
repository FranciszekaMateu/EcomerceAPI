    const express = require('express');
    const router = express.Router();
    const { UserRepository } = require('../repositories/user.repositorie');
    const { UserDao } = require('../Dao/factory'); 
    const UserModel= new  UserRepository(UserDao);
    router.post('/register', async (req, res = response) =>{
        try {
            let {email,password,first_name,last_name } = req.body
            if (!password || !email ) {
                return res.status(400).send({ message: 'te faltan datos'})
            }
            let role = "user"
            let result  = await UserModel.create({
                first_name,
                last_name,
                email,
                password,
                role
            })
        } catch (error) {
            console.log(error)
        }
    })
    module.exports = router


    const express = require('express');
    const router = express.Router();
    const { UserRepository } = require('../repositories/user.repositorie');
    const { UserDao } = require('../Dao/factory'); 
    const UserModel= new  UserRepository(UserDao);
    router.post('/register', async (req, res = response) => {
        try {
            let { email, password, first_name, last_name } = req.body;
            if (!password || !email) {
                return res.status(400).send({ message: 'Te faltan datos' });
            }
            let role = "user";
            await UserModel.create({
                first_name,
                last_name,
                email,
                password,
                role
            });
            
            res.send({ message: 'Usuario creado exitosamente' });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Error al crear el usuario' });
        }
    });
    module.exports = router


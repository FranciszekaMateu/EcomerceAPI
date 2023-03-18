const { router} = require('express')
const { UserModel } = require('../models/user.model')
router.post('/login', async (req, res)=>{
    const {email, password} = req.body
     console.log(email, password)
    const user = await UserModel.findOne({email, password})

    if (!user) return res.status(401).send({status: 'error', message: 'Usuario o contraseña incorrectos'})
    
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email
    }

    res.status(200).send({
        status: 'success',
        payload: req.session.user,
        message: 'Login correcto',
    })
})
router.get('/login', async (req, res)=>{
    // res.status(200).render('login')
    res.status(200).render('login')
})

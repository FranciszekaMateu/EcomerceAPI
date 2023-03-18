const { router} = require('express')
const { UserModel } = require('../models/user.model')

router.post('/register', async (req, res = response) =>{
    try {
        let {email,password } = req.body
        if (!password || !email || email ==="adminCoder@coder.com" ) {
            return res.status(400).send({ message: 'te faltan datos'})
        }
        let role = "user"
        let result  = await UserModel.create({
            email,
            password,
            role
        })
        // validación   )
    } catch (error) {
        console.log(error)
    }
})
module.exports = router



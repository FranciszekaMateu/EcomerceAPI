
const { Router } = require('express')
const router = Router()
router.get('/chat' ,(request, response) =>{
    const email = request.query;
    if(email == undefined)
    {
        response.redirect("/login")
    }
    else
    {
        response.render("chat",{
            user:email
        })
    }
 })
 router.get('/register', async (req, res)=>{
    
    res.status(200).render('register')
})
router.get('/login', async (req, res)=>{
    // res.status(200).render('login')
    res.status(200).render('login')
})
module.exports = router;

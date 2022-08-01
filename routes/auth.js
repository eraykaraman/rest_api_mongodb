const router = require('express').Router()
const User = require('..//models/User')
const bcrypt = require('bcrypt')


//REGISTER
router.post('/register', async(req,res)=>{
    try{

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password,salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })

        const user = await newUser.save()
        res.status(200).json(user)


    }catch(err){
        res.status(500).send(err)
    }
})




//LOGIN
router.post('/login', async(req,res)=>{
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user) return res.status(400).json('Username or password is incorrect.')

        const validated = await bcrypt.compare(req.body.password, user.password)
        if(!validated) return res.status(400).json('Username or password is incorrect.')

        res.status(200).json(user)

    } catch (error) {
        res.status(500).send(error)
    }
})




module.exports = router
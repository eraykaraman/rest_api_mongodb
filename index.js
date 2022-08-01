const express = require('express')
const app = express()
const env = require('dotenv').config()
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const multer = require('multer')



mongoose.connect(process.env.MONGO_URL)
.then(console.log('Connected to database.'))
.catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'images')
    }, filename:(req,file,cb)=>{
        cb(null, 'test.jpg')
    }
})


const upload = multer({storage:storage})
app.post('/api/upload',upload.single('file'),(req,res)=>{
    res.status(200).json('File has been updated')
})


app.use(express.json())
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/categories',categoryRoute)




app.listen('5000',()=>{
    console.log('Server has runing.')
})
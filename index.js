const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
const cors = require('cors')
const passCode = "132asd11845fa"
const bcrypt = require('bcrypt')
const salt = 10
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const user =[{
    id:1,
    username:"vrndrmry@gmail.com",
    password:bcrypt.hashSync("123",10)
}]
app.use(cors({credentials:true,origin:"*"}))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())



app.post(`/signup`,(req,res)=>{
    let {username, password} = req.body
    
    try{
        user.push({
            id: new Date().toLocaleString(),
            username:username,
            password:bcrypt.hashSync(password,10)
        })
        console.log(user)
        res.status(200).json({result:"User Added"})
    }catch(err){ 
        console.log("Error "+err)
        res.status(400).json(err)
    }

})

app.post(`/login`,(req,res)=>{
    let {username, password} = req.body
    let passOK = false
    let userDoc = []
    try{
        user.forEach(e=>{
            if(e.username === username && bcrypt.compareSync(password,e.password)){
                passOK = true
                userDoc.push(e)
            }
        })
        const payload = {
            username,
            id:userDoc.id
        }
        if (passOK){ 
            jwt.sign(payload,"secret",(err,token)=>{
                if(err){
                    return res.status(400).json(err)
                } else{
                    return res.status(200).cookie("token ",token).json({
                        username
                    })
                }
            })   
        }
        if(!passOK){
            return res.status(404).json({message:'User not found'})
        }
    }catch(err){
        console.log(`error ${err}`)
    }
})

app.get("/",(req,res)=>{
    const {token} = req
    res.status(200).json({messahe:token})
})

app.listen(port,()=>{
    console.log(`Connected to port ${port}`)
})
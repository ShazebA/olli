const User = require('./schemas/User')
require('dotenv').config()
const {connectToDb, getDb} = require('./db')
const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const mongoose  = require('mongoose')
const app = express();


app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'olli','build')));
app.use(express.json())

let port = 3000;

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "..", 'build', 'index.html'))
})

app.post('/api/register', async(req,res)=>{

    const {email, passwordHash,isActive,isEmailVerified,isAdmin,isParent,isDependent,fName,lName} = req.body

    try{
        const existingUser = await db.collection('users').findOne({email});
        if (existingUser) {
            res.status(409).json({ error: 'A user with this email already exists.' });
        } else {
            const hashedPassword = await bcrypt.hash(passwordHash,10)
            const newUser = new User({email, passwordHash:hashedPassword,isActive,isEmailVerified,isAdmin,isParent,isDependent,fName,lName})
            const result = await db.collection('users').insertOne(newUser);
            res.status(201).json(result);
        }
    }catch(err){
        res.status(500).json(err);
    }
    
})

app.post('/api/login', async(req,res)=>{
    const{email, password} = req.body
    console.log(req.body)

    const user = await db.collection('users').findOne({email});

    if(!user){
        return res.status(400).json({error: "User does not exist."})
    }else
    {
        try{
            if(await bcrypt.compare(password,user.passwordHash)){
               
                const accessToken = jwt.sign(user.email,process.env.ACCESS_TOKEN_SECRET)
                res.status(200).json({result:"Success!",accessToken:accessToken,})
            }else{
                res.status(401).json({result:"Incorrect password!"})
            }

        }catch(err){
            res.status(500).json(err)
        }
    }

})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null){
        return res.sendStatus(401)
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

connectToDb((err)=>{
    if(!err){
        app.listen(port,()=>console.log(`Listening on port ${port}...`))
        db = getDb()
    }
})






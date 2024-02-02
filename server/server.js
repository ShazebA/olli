const User = require('./schemas/User')
require('dotenv').config()
const express = require('express');
const multer = require("multer");
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Event = require('./schemas/Event');


const mongoose  = require('mongoose')
const app = express();
const upload = multer();


app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'olli','build')));
app.use(express.json())
app.use(upload.none());
// app.use("/api", routes);

let port = 3000;
const portEmail = process.env.PORT || 3001;

const mongoURI = 'mongodb+srv://ctroubit:Group44OSSI@ossi44.hvbfqvj.mongodb.net/'

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "..", 'build', 'index.html'))
})



app.post('/api/register', async(req,res)=>{
    console.log(req.body)

    const {email, passwordHash,isActive,isEmailVerified,isAdmin,isParent,isDependent,fName,lName} = req.body

    try{
        const existingUser = await User.findOne({email});
        if (existingUser) {
            res.status(409).json({ error: 'A user with this email already exists.' });
        } else {
            
            const hashedPassword = await bcrypt.hash(passwordHash,10)
            const newUser = new User({email, passwordHash:hashedPassword,isActive,isEmailVerified,isAdmin,isParent,isDependent,fName,lName})
            console.log(email)
            const result = await newUser.save()
            res.status(201).json(result);
        }
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
    
})

app.post('/api/login', async(req,res)=>{
    const{email, password} = req.body
    console.log(req.body)

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({error: "User does not exist."})
    }else
    {
        try{
            if(await bcrypt.compare(password,user.passwordHash)){
               
                const accessToken = jwt.sign(user.toObject(),process.env.ACCESS_TOKEN_SECRET)


                console.log(accessToken)
                res.status(200).json({status:'200',accessToken:accessToken})
            }else{
                res.status(401).json({status:401,result:"Incorrect password!"})
            }

        }catch(err){
            res.status(500).json(err)
            console.log(err)
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

app.get('/api/events', async (req, res) => {
    try {
      // Fetch events from the database
      const events = await Event.find();
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch events.' });
    }
  });

app.post('/api/events', async (req, res) => {
try {
    const { title, description, date } = req.body;
    
    // Create a new event using the Event schema
    const newEvent = new Event({ title, description, date });
    
    // Save the new event to the database
    await newEvent.save();
    
    res.status(201).json(newEvent);
} catch (err) {
    res.status(500).json({ error: 'Failed to create an event.' });
}
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../olli/build', 'index.html'));
  });


app.listen(port, () => {
    console.log('Express started on port: ', port);
  });

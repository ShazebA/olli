const User = require('./schemas/User')
const UserNewsletter = require('./schemas/UserNewsletter')
require('dotenv').config()
const express = require('express');
const multer = require("multer");
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Event = require('./schemas/Event');
const mongoose  = require('mongoose');
const { access } = require('fs');
const app = express();
const upload = multer();
const feedBackroutes = require('./routes/feedBackroutes');


app.use(cors({
    origin: '*', // or '*' to allow any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // allowed headers
    credentials: true, // to allow cookies to be sent with the request
  }));
app.use(express.static(path.join(__dirname, '..', 'olli','build')));
app.use(express.json())
app.use(upload.none());

let port = process.env.PORT || 8080;
const portEmail = process.env.PORT || 3001;

const mongoURI = process.env.MONGO_URI


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "..", 'build', 'index.html'))
})

app.use('/feedback', feedBackroutes);

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    if (token == null) return res.sendStatus(401); 

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); 

        
        if (!user.isAdmin) {
            return res.status(403).json({ error: "Access denied. User is not an admin." });
        }

        req.user = user; 
        next(); 
    });
}



app.post('/api/register', async(req,res)=>{

    const {email, passwordHash,isActive,isEmailVerified,isAdmin,isParent,isDependent,fName,lName} = req.body

    

    try{
        const existingUser = await User.findOne({email});
        if (existingUser) {
            res.status(409).json({ error: 'A user with this email already exists.' });
        } else {
            const hashedPassword = await bcrypt.hash(passwordHash,10)
            const newUser = new User({email, passwordHash:hashedPassword,isActive,isEmailVerified,isAdmin,isParent,isDependent,fName,lName})
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
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({error: "User does not exist."})
    }else
    {
        try{
            if(await bcrypt.compare(password,user.passwordHash)){
               
                const accessToken = jwt.sign(user.toObject(),process.env.ACCESS_TOKEN_SECRET)
                res.status(200).json({accessToken:accessToken})
                
            }else{
                res.status(401).json({status:401,result:"Incorrect password!"})
            }

        }catch(err){
            res.status(500).json(err)
            console.log(err)
        }
    }

})



app.post('/api/validateAdmin', (req, res) => {
    const token = req.headers['authorization'];

    // const token = JSON.parse(authHeader).accessToken;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        res.json({ isAdmin: user.isAdmin });
    });
});

app.post('/api/validateParent', (req, res) => {
    const token = req.headers['authorization'];

    // const token = JSON.parse(authHeader).accessToken;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        res.json({ isParent: user.isParent });
    });
});
app.post('/api/validateUserId', (req, res) => {
    const token = req.headers['authorization'];

    // const token = JSON.parse(authHeader).accessToken;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        res.json({ userID: user._id });
    });
});

app.post('/api/addParentEvent', async (req, res) => {
    try {
        const { eventId, parentId } = req.body;

        // Find the event by ID
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        // Optionally, check if the parent is already RSVPed to avoid duplicates
        if (event.parents && event.parents.includes(parentId)) {
            return res.status(400).json({ message: 'Parent already RSVPed to this event.' });
        }

        // Add the parent to the event's RSVP list (assuming 'parents' is an array of user IDs)
        event.parents = event.parents ? [...event.parents, parentId] : [parentId];
        
        // Save the updated event
        await event.save();

        res.status(200).json({ message: 'RSVP successful.', event });
    } catch (err) {
        console.error('Error adding parent to event:', err);
        res.status(500).json({ error: 'Failed to RSVP to the event.' });
    }
});

app.delete('/api/removeParentEvent', async (req, res) => {
    try {
        const { eventId, parentId } = req.body;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        // Remove the parentId from the event's parents array
        const index = event.parents.indexOf(parentId);
        if (index > -1) {
            event.parents.splice(index, 1);
            await event.save();
            res.json({ message: 'RSVP cancelled successfully.' });
        } else {
            // Parent was not in the RSVP list
            res.status(400).json({ message: 'Parent had not RSVPed.' });
        }
    } catch (error) {
        console.error('Error removing parent RSVP:', error);
        res.status(500).json({ error: 'Failed to cancel RSVP.' });
    }
});

app.delete('/api/removeParentFromEvent', authenticateToken, async (req, res) => {
    const { eventId, parentId } = req.body;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        const index = event.parents.indexOf(parentId);
        if (index > -1) {
            event.parents.splice(index, 1);
            await event.save();
            res.json({ message: 'Parent removed from RSVP list.' });
        } else {
            res.status(404).json({ message: 'Parent not found in RSVP list.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove parent from RSVP list.' });
    }
});



app.get('/api/loadEvents', async (req, res) => {
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
    const parents = [];
    
    // Create a new event using the Event schema
    const newEvent = new Event({ title, description, date, parents});
    
    // Save the new event to the database
    await newEvent.save();
    
    res.status(201).json(newEvent);
} catch (err) {
    res.status(500).json({ error: 'Failed to create an event.' });
}
});

app.get('/api/users/:userId', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params; // Extract user ID from URL parameters
        const user = await User.findById(userId); // Query database for user

        if (!user) {
            return res.status(404).send('User not found'); // User not found
        }

        res.json(user); // Send user object as JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving user'); // Internal server error
    }
});


app.post('/api/newsletter/signup', async (req, res) => {

   
    const { email, fName, lName } = req.body;
    try {
        const existingUser = await UserNewsletter.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'This email is already signed up for the newsletter.' });
        }   
        const newUser = new UserNewsletter({ email, fName, lName });
        const result = await newUser.save(); 
        res.status(201).json({ message: 'Signed up for the newsletter successfully!', user: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while signing up for the newsletter.' });
    }
});

app.get('/api/users', async(req,res)=>{
    try{
        let users = await User.find()
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
})
app.get('/dashboard',authenticateToken,(req,res)=>{
    res.json({ message: "Welcome to the admin dashboard!" });
})

app.delete('/api/users/:userId',authenticateToken, async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await User.deleteOne({ _id: userId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User successfully removed" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove user", error: error.message });
    }
  });

  app.put('/api/users/:userId', authenticateToken, async (req, res) => {
    const { userId } = req.params;
    const { email, fName, lName, isAdmin, isParent, isDependent, isActive, isEmailVerified } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            email,
            fName,
            lName,
            isAdmin,
            isParent,
            isDependent,
            isActive,
            isEmailVerified
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update user", error: error.message });
    }
});



app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../olli/build', 'index.html'));
});


app.listen(port, () => {
    console.log('Express started on port: ', port);
  });

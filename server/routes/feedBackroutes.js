// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const Feedback = require('../schemas/Feedback');

router.post('/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).send({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/feedback', async (req, res) => {
    try {
      const feedback = await Feedback.find();
      res.json(feedback);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.delete('/feedback',async(req,res)=>{
    try{
      const{name,comment} = req.body
      await Feedback.deleteOne({name:name,comment:comment})
      res.status(200).json({ message: "Feedback successfully removed" });
    }catch(err){
      res.status(500).json({ message: "Failed delete message", error: error.message });
    }
  })

module.exports = router;

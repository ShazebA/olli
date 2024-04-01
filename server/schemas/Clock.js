const mongoose = require('mongoose')

const breakSchema = new mongoose.Schema({
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true
    }
})

const clockSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    clockInTime:{
        type:Date,
        required:true
    },
    clockOutTime:{
        type:Date,
        
    },
    breaks:[breakSchema],
    comments:{
        type:String
    },
    decision:{
        type:String,
        default:"Waiting"
    },
    totalHoursWorked:{
        type:Number,
    }

})

clockSchema.virtual('calculatedTotalHours').get(function(){
    let totalHours = (this.clockOutTime - this.clockInTime)/3600000;
    if (this.breaks && this.breaks.length > 0) {
        const totalBreakTime = this.breaks.reduce((acc, curr) => {
          return acc + (curr.endTime - curr.startTime);
        }, 0) / 3600000; 
        totalHours -= totalBreakTime;
      }
      return totalHours;
})

const Clock = mongoose.model('ClockTimeTracking',clockSchema,"Clock");

module.exports = Clock;
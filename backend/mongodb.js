const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017')
.then(()=>{
    console.log("DB Connected")
})
.catch(()=>{
    console.log("DB connection failed")
})
const cycleStatusShema = mongoose.Schema(
    {
    
        ts:{
            type:String,
            required:true
        },
        machine_status:{
            type:Number,
            required:false,
            
        },
        vibration:{
            type:Number,
            required:false

        }
    }
)
const CycleStatus = mongoose.model('cyStatus',cycleStatusShema);

module.exports=CycleStatus;
const mongoose = require("mongoose");

const connectToDatabase=()=>{
  mongoose.connect(process.env.LOCAL_URI).then(()=>{
    console.log("batabase connect successful")
  })

}

module.exports= connectToDatabase;
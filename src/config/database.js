const mongoose= require("mongoose")
function connectToDB() // connect to database
{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> 
    {
        console.log("Connect to DB")
    })
}


module.exports= connectToDB; 
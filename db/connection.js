const mongoose=require("mongoose")

mongoose.connect(process.env.DB_URL,()=> {
    console.log("Connected to db")
},(err)=>{
    console.log(err)
})
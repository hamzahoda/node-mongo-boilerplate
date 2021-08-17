const express = require("express")
const bd = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
let authModel = require("./authSchema")

const app = express()
const port = 5000


app.use(cors())
app.use(bd.urlencoded({
    extended:false
}))

app.use(bd.json())


mongoose.connect("mongodb+srv://hamza:hello123@cluster0.l8yy3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("Database connected")
})
mongoose.connection.on("error",()=>{
    console.log("Database connection error")
})



app.get("/",(req,res)=>{
    res.send("working root route")
    console.log("Response working")
})


app.post("/signup",(req,res)=>{


    let userCreate = new authModel({
        email:req.body.email,
        password:req.body.password
    })

    userCreate.save()
    .then(response =>{
        // console.log("Response",response)
        res.status(200).send({
            result:response,
            message:"User Created successfully"
        })
    })
.catch(error=>{
    res.status(400).send({
        result:error.message,
        message:"User not Created successfully"
    })
    // console.log("error",error)
})


    console.log(req.body)
    // res.send("Signup successfull ")
})


app.listen(port,()=>{
    console.log("Server running at port 5000:")
})
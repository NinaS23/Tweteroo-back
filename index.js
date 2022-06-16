import express , {json}  from "express";
import cors from "cors";



const app = express()
app.use(json())
app.use(cors())

let users = []
let tweets = [];

app.post("/sign-up" , (req,res)=>{
 const body = req.body
  users.push(body)
  res.send("OK") // aqui n ta indo , ta dando erro no get
  console.log(users)
})


app.listen(5000 , ()=>{
console.log("i`m alive")
})
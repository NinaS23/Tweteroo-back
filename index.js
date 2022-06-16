import express , {json}  from "express";
import cors from "cors";



const app = express()
app.use(json())
app.use(cors())

let users = []
let tweets = [];

app.post("/sign-up" , (req,res)=>{
 const {username , avatar} = req.body
  users.push({username,avatar})
  res.send("OK") // aqui n ta indo , ta dando erro no get
  console.log(users)
})

app.get("/tweets", (req, res) => {
  const ultimos = tweets.slice(-10);
  res.send(ultimos);
});

app.post("/tweets" , (req, res)=>{
  const body = req.body
  console.log(body)
 })
 
 
 

app.listen(5000 , ()=>{
console.log("i`m alive")
})
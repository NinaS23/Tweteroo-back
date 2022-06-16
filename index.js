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
   // aqui n ta indo , ta dando erro no get
  if (!username || !avatar) {
    res.sendStatus(400)
  }
  console.log(users)
  res.sendStatus(201)
 
})

app.get("/tweets", (req, res) => {
  const ultimos = tweets.slice(-10);
  res.send(ultimos);
});

app.post("/tweets" , (req, res)=>{
  const {username , tweet} = req.body
  tweets.push({username,tweet})
  
  if (!username || !tweet) {
    res.sendStatus(400)
  }
  console.log(tweets)
  res.sendStatus(201)

 })
 
 
 

app.listen(5000 , ()=>{
console.log("i`m alive")
})
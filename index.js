import express , {json}  from "express";
import cors from "cors";

const app = express()
app.use(json())
app.use(cors())

const users = []
const tweets = [];


app.post("/sign-up", (req, res) => {
  const {username, avatar} = req.body;
  if(!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
    users.push({username, avatar});

    res.status(200).send("OK!");
    
   
});


app.get("/tweets", (req, res) => {
  const ultimos = tweets.slice(-10);
  res.send(ultimos);
});

app.get("/tweets/:user", (req, res) => {
  const { user } = req.params;

  const usertweets = tweets.filter(tweet => {
      if (tweet.username === user) return tweet;
  });

  res.send(usertweets)
});


app.post("/tweets", (req, res) => {
  const username = req.headers.user;
  const { tweet } = req.body;
  const data = { username, tweet };
   console.log(data.username)
  
  if (!username || !tweet) {
    res.sendStatus(400);
  }

  const usuario = users.find((user) => user.username === data.username);
  console.log(usuario)
  
  
  res.sendStatus(201);
});


app.listen(5000 , ()=>{
console.log("i`m alive")
})
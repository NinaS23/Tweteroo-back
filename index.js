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
    res.status(201).send("created");
    
   
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
  
  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
  let avatar = users.find(user => user.username === username)
  avatar = avatar || {avatar: ''}
  tweets.push({
      username: username,
      avatar: avatar.avatar,
      tweet: tweet
  })
  console.log(tweets)
  res.status(201).send("CREATED")
});


app.listen(5000 , ()=>{
console.log("i`m alive")
})
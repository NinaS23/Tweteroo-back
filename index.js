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
    users.push({
        username: username,
        avatar: avatar
        })
      res.status(201).send("created");
});

app.get("/tweets", (req, res) => {
    const ultimos = tweets.slice(-10);
    res.send(ultimos);
});

app.post("/tweets", (req, res) => {
  const username = req.headers.user;
  const { tweet } = req.body;
 console.log(users[0].avatar)
  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
}
 let avatar = users.find((user) => user.username === username)
 console.log(avatar)
 console.log(users[users.length-1].avatar)
     avatar = avatar || {avatar:users[users.length-1].avatar}//da pra pegar o  ultimo do array de obj ( o ultimo 
     //sempore vai ser o que está logando (pega o ultimo da array ao ivnes de users[0].avatar tenta users[users.length-1].avatar))  
tweets.push({
    username: username,
    avatar: avatar.avatar,
    tweet: tweet
})
  console.log(tweets)
  res.status(201).send("CREATED")
});

app.get("/tweets/:user", (req, res) => {
    const { user } = req.params;
    const usertweets = tweets.filter(tweet => {
    if (tweet.username === user) return tweet;
  });
    res.send(usertweets)
});




app.listen(5000 , ()=>{
console.log("i`m alive")
})
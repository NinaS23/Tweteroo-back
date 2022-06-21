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
    const page = req.query.page
    console.log(page)
    if(!page || parseInt(page) < 2){
      res.status(400).send("informe uma página válida!!");
      return;
    }
    
    let startPoint = 10
    let start = (page - 1) * startPoint + 1
    let final = startPoint * page
    const NewTweets = [...tweets].reverse().splice(start,final)

    res.send(NewTweets)
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
     avatar = avatar || {avatar:users[users.length-1].avatar}
tweets.push({
    username: username,
    avatar: avatar.avatar,
    tweet: tweet
})
  console.log(tweets)
  res.status(201).send("CREATED")
});

app.get("/tweets/:USERNAME", (req, res) => {
    const { USERNAME } = req.params;
    const usertweets = tweets.filter(tweet => {
    if (tweet.username === USERNAME) return tweet;
  });
    res.send(usertweets)
});


app.listen(5000 , ()=>{
console.log("i`m alive")
})
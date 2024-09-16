const cl = console.log;
const express = require(`express`);
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express(); //by using express we create a backend
//for backend run we need a port i.e port no.3000

const PORT = process.env.PORT || 3000 
// (it means our code in which env or port)
const postsRoutes = require('./routes/posts')
//http://localhost:3000/posts 

app.use(bodyParser.json());//bodyparser is middleware it is used to parse the data
// app.use(cors());
app.use(cors({
  origin:['http://127.0.0.1:5500', 'http://4200'],
  methods:["GET","POST","PATCH","DELETE"],
  allowedHeaders:['Content-Type','Authorization'],
  Credential:true
}))
// app.use((req,res,next)=>{
//    res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:5500") //* => any port it is work on any backend

//   next()
// })



app.use(postsRoutes);






//to listen our application
app.listen(PORT, () => {
  cl(`The server is running on port ${PORT}`)
})

//dev.env
//1.database url
//2.debug -true

//qa.env
//1.database url
//2. node-env - test

//stage.env(release batch)




//CROS => Cross origin resource sharing
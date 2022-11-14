// assign port name and call express, assign express to app
const {client} = require('./db/index.js');
const PORT = 3000;
const express = require('express');
const app = express();
// const jwt = require('jsonwebtoken');
// const {JWT_SECRET} = process.env;
// -------------------------
// require('dotenv').config();
// ^^ don't let it know the secret

// console.log(process.env.JWT_SECRET);

// call morgan and midddleware
const morgan = require ('morgan');
const apiRouter = require('./api');

app.use(express.json())
app.use(morgan('dev'))
app.use('/api', apiRouter);

// pull the database for the client

client.connect();

app.get('/background/:color', (req, res, next) => {
  res.send(`
    <body style="background: ${ req.params.color };">
      <h1>Hello World</h1>
    </body>
  `);
});

app.get('/add/:first/to/:second', (req, res, next) => {
  res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
    Number(req.params.first) + Number(req.params.second)
   }</h1>`);
});

// looking for LITERALLY ANYTHING. first test
// app.use((req, res, next) =>  {
//   console.log("<___Body Logger___>");
//   console.log(req.body);
//   console.log("<___Body Logger END___>");  
//   console.log('request has been received express');
//   next();
// })

// checking if we're connecting. display text on webpage
app.get('/', (req, res, next)=>{
  res.send('<div>Damn Drew</div>');
  console.log('get request here');
  next();
})

// jwt.sign()

// app.post('/api/users/register', () => {});

// app.post('/api/users/login', () => {});

// app.delete('/api/users/:id', () => {});

// last thing to run, listening to port
app.listen(PORT, () => {
  console.log("The server is up up up up up up up up up up up", PORT);
})
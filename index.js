const express = require('express');
const app = express();
const connectDB = require('./db');
const dotenv = require('dotenv');

const authRoute = require('./Routes/Auth');

const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/api/user', authRoute);

connectDB();

app.get('/videoOne', (req, res) => {
  res.sendFile('Assets/PartOne.mp4', { root: __dirname });
});

app.get('/videoTwo', (req, res) => {
  res.sendFile('Assets/PartTwo.mp4', { root: __dirname });
});

app.listen(process.env.PORT, () => console.log('server up and running'));

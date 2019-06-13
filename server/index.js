const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Redis = require('ioredis');

const redis = new Redis();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/public')));

/************************* MiddleWare *******************************/

app.use(bodyparser.json());

/********************************************************************/

/*************************   Connections   *******************************/

redis.subscribe('events', () => {
  console.log('Redis: subscribed');
});

redis.on('message', (channel, message) => {
  io.emit('message', message);
});

io.on('connection', () => {
  console.log('User is Connected');
});

/********************************************************************/

server.listen(PORT, () => {
  console.log(`Listening on Port:${PORT}`);
});

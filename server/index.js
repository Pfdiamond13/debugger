const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Redis = require('ioredis');

// Intializes new ioredis instance
const redis = new Redis();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/public')));

/*************************   Connections   *******************************/

// Establishes connection to redis channel
// Currently uses ioredis default reconnect strategy - will try every 2 seconds up to 50 times
redis.subscribe('events', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Redis: Subscribed');
});

// Upon receiving a message from redis channel, io.emit will send message to client
redis.on('message', (channel, message) => {
  io.emit('message', message);
});

// Establishes connection to client
io.on('connection', () => {
  console.log('User is Connected');
});

/********************************************************************/

server.listen(PORT, () => {
  console.log(`Listening on Port:${PORT}`);
});

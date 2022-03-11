var createError = require('http-errors');
var express = require('express');
var path = require('path');
var http = require('http')
var socketio = require('socket.io')

var app = express();
const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin : ['http://localhost:3001']
  }
})

io.on('connection', client => {
  console.log(client.id)
  client.on("from-client", (currMove, currPlayer)=>{
    client.broadcast.emit('opponent-move', currMove, currPlayer)
  })
  client.on("initial-color", (color) => {
    client.broadcast.emit("set-initial-color", color)
  })
})

server.listen(process.env.PORT||8000)

module.exports = app;


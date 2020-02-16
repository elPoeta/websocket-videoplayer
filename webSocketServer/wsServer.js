const socket = require('socket.io');
const handlerMessages = require('./handlerMessages');

module.exports = server =>{
  const io = socket(server);
  io.on('connection', socket => {
    handlerMessages(io, socket);
 }); 
}
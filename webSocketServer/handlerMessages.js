const handlerMessages = (io, socket) => {
  
  socket.on('play', data => {
    io.sockets.emit('playOk',data)
  });

  socket.on('pause', data => {
    io.sockets.emit('pauseOk',data)
  });
 
  socket.on('skip', data => {
    io.sockets.emit('skipOk',data)
  });
 
  socket.on('backForward', data => {
    io.sockets.emit('backForwardOk',data)
  });
  
 }

module.exports = handlerMessages;
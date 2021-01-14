import './preStart'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';

const port = Number(process.env.PORT || 3000);
const server = app.listen(port, () => {
  logger.info(`Express server started on port: ${port}`);
});

const connectedUsers:any = {};

const io = require('socket.io')(server);

io.on('connection', (socket:any) => {
  socket.on('register', (id:any) => {
    socket.id = id;
    connectedUsers[id] = socket;
    console.log('register', id);
  });
  socket.on('private_chat', (data:any) => {
    const { content, passiveSideUserId, senderUserId } = data;
    console.log('private_chat', data, connectedUsers.hasOwnProperty(passiveSideUserId));

    if (connectedUsers.hasOwnProperty(passiveSideUserId)) {
      connectedUsers[passiveSideUserId].emit('private_chat', {
        senderUserId,
        content,
        createdAt: new Date(),
      });
    }
  });
});

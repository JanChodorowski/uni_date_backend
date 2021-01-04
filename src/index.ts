import './preStart'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';

const port = Number(process.env.PORT || 3000);
const server = app.listen(port, () => {
  logger.info(`Express server started on port: ${port}`);
});

const connectedUsers:any = {};

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3006',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

io.on('connection', (socket:any) => {
  /* Register connected user */
  socket.on('register', (id:any) => {
    socket.id = id;
    connectedUsers[id] = socket;
  });

  /* Private chat */
  socket.on('private_chat', (data:any) => {
    const { content, passiveSideUserId } = data;
    console.log('private_chat', content, passiveSideUserId, connectedUsers);
    if (connectedUsers.hasOwnProperty(passiveSideUserId)) {
      connectedUsers[passiveSideUserId].emit('private_chat', {
        // The sender's username
        senderUserId: socket.id,
        // Message sent to receiver
        content,
        createdAt: new Date(),
      });
    }
  });
});

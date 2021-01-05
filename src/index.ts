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
  },
});

io.on('connection', (socket:any) => {
  socket.on('register', (id:any) => {
    socket.id = id;
    connectedUsers[id] = socket;
  });

  socket.on('private_chat', (data:any) => {
    const { content, passiveSideUserId, senderUserId } = data;
    if (connectedUsers.hasOwnProperty(passiveSideUserId)) {
      console.log('data', data);
      connectedUsers[passiveSideUserId].emit('private_chat', {
        senderUserId,
        content,
        createdAt: new Date(),
      });
    }
  });
});

import { Socket } from 'socket.io';

import { checkJWT } from '../helpers/index.js';

import Chat from '../models/chat.js';

const chat = new Chat();

// Include the defaut parameter 'socket = new Socket()' only for autocomplete, before production must be removed
const socketController = async (socket = new Socket(), io) => {
    // console.log('Cliente connected', socket.id);
    // console.log(socket);
    // console.log(socket.handshake.headers.token);
    const user = await checkJWT(socket.handshake.headers.token);

    if (!user) {
        return socket.disconnect();
    }

    // If a user connects, we need to emit a message to all users(including the user who connected) and also add the user to the usersArray
    chat.connectUser(user);

    io.emit('active-users', chat.usersArray);

    // Every user 3 have 'rooms', the global, the socket.id and now we added the user.id
    // Connect the user to a special chat
    socket.join(user.id);

    // Check disconnection of the user
    socket.on('disconnect', () => {
        // console.log('Disconnect server');
        chat.desconnectUser(user.id);
        io.emit('active-users', chat.usersArray);
    });

    // We need to listen the send-message from the cliente
    socket.on('send-message', ({ message, uid }) => {
        console.log(message, uid);

        if (uid) {
            // Private messaje
            socket.to(uid).emit('private-message', {from: user.name, message});
        } else {
            chat.sendMessage(user.id, user.name, message);
    
            io.emit('recive-message', chat.last10Messages);
            // callback(message);
        }
    });

    // Send the messages when the user is connected
    io.emit('recive-message', chat.last10Messages);
};

export {
    socketController
};
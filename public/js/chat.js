let user = null;
let socket = null;

const url = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/api/auth/'
    : 'https://rs-google-sign-in.herokuapp.com/api/auth/';

// HTML references
const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulUsers = document.querySelector('#ulUsers');
const ulMessages = document.querySelector('#ulMessages');
const btnLogout = document.querySelector('#btnLogout');

/**
 * Validate localstorage token
 */
const validateJWT = async () => {
    const token = localStorage.getItem('token') || '';

    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('Invalid token');
    }

    const resp = await fetch(url, {
        headers: {
            'jwt-token': token
        }
    });

    const { authenticatedUser, token: tokenRenew } = await resp.json();

    user = authenticatedUser;
    localStorage.setItem('token', tokenRenew);
    // console.log(user, tokenRenew);

    document.title = user.name;

    await connectSocket();
};

const connectSocket = async () => {
    socket = io({
        'extraHeaders': {
            'token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('socket online');
    });

    socket.on('disconnect', () => {
        console.log('socket offline');
    });

    socket.on('recive-message', drawMessages);

    // console.log('active-users, payload: ', payload);
    // drawUsers(payload);
    socket.on('active-users', drawUsers);

    socket.on('private-message', (payload) => {
        console.log('private-message, payload: ', payload);
    });
};

const drawUsers = (users = []) => {
    ulUsers.innerHTML = '';
    users.forEach(({ name, uid }) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <p>
                <h5 class="text-success">${name}</h5>
                <span class="fs-6 text-muted">${uid}</span>
            </p>
        `;

        ulUsers.appendChild(li);
    });
};

const drawMessages = (messages = []) => {
    console.log('messages: ', messages);
    ulMessages.innerHTML = '';

    messages.forEach(({ name, message }) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <p>
                <span class="text-primary">${name}: </span>
                <span class="fs-6 text-muted">${message}</span>
            </p>
        `;

        ulMessages.appendChild(li);
    });
};

const logout = () => {
    localStorage.removeItem('token');
    window.location = 'index.html';
};

txtMessage.addEventListener('keyup', e => {
    const { keyCode } = e;

    if (keyCode !== 13) {
        return;
    }

    const message = e.target.value;
    const uid = txtUid.value;

    if (message.length === 0) {
        return;
    }

    socket.emit('send-message', { message, uid });

    txtMessage.value = '';
});

btnLogout.addEventListener('click', logout);

const main = async () => {
    try {
        await validateJWT();
    } catch (error) {
        console.log(error);
    }
};

main();
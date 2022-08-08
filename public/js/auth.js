const myForm = document.querySelector('form');

const url = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/api/auth/'
    : 'https://rs-google-sign-in.herokuapp.com/api/auth/';

myForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = {};

    for (let el of myForm.elements) {
        if (el.name.length > 0) {
            formData[el.name] = el.value;
        }
    }

    fetch(url + 'login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resp => resp.json())
        .then(({ msg, token }) => {
            // console.log(data);
            if (msg) {
                return console.error(msg);
            }

            localStorage.setItem('token', token);
            window.location = 'chat.html';
        })
        .catch(error => {
            console.log(error)
        });
});

function handleCredentialResponse(response) {
    // Google token - ID token
    // console.log('ID token: ', response.credential);

    const body = {
        'ID-token': response.credential
    };

    fetch(url + 'google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(({ token }) => {
            // console.log(resp);
            localStorage.setItem('token', token);
            // localStorage.setItem('email', resp.user.email);
        })
        .catch(console.log);
}

const button = document.querySelector('#google_signout');

button.addEventListener('click', (e) => {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(localStorage.getItem('email') || '', done => {
        localStorage.clear();
        location.reload();
    });
});
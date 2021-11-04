const request = document.getElementById('card-form');

const signup_btn = document.getElementById('card');
signup_btn.addEventListener('click', () => {
    request.setAttribute('action', '/card/');
    request.setAttribute('method', 'POST');
});
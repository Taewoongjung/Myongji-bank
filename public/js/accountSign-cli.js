const request = document.getElementById('account-form');

const signup_btn = document.getElementById('account');
signup_btn.addEventListener('click', () => {
    request.setAttribute('action', '/account/');
    request.setAttribute('method', 'POST');
});
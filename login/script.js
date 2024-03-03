userId.addEventListener('focus', function () {
  userId.value = '';
});
password.addEventListener('focus', function () {
  password.value = '';
});

function login() {
  const userId = document.getElementById('userId');
  const password = document.getElementById('password');

  if (userId.value === '' || password.value === '') {
    alert('Please provide your login details to access your account.');
    loginErrorMsg.style.opacity = 1;
  } else {
    const q = new URLSearchParams(window.location.search);
    const nextPage = q.get('secondpage') === 'true' ? '../page2/index.html' : '../main/index.html';
    window.location.href = nextPage;
  }
}

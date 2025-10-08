
document.getElementById('showRegister').onclick = function(e) {
  e.preventDefault();
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = '';
  document.getElementById('resetForm').style.display = 'none';
  document.getElementById('formTitle').innerText = 'Sign up';
};
document.getElementById('showLogin').onclick = function(e) {
  e.preventDefault();
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = '';
  document.getElementById('resetForm').style.display = 'none';
  document.getElementById('formTitle').innerText = 'Login';
};
document.getElementById('forgotPassword').onclick = function(e) {
  e.preventDefault();
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('resetForm').style.display = '';
  document.getElementById('formTitle').innerText = 'Reset Password';
};
document.getElementById('backToLogin').onclick = function(e) {
  e.preventDefault();
  document.getElementById('resetForm').style.display = 'none';
  document.getElementById('loginForm').style.display = '';
  document.getElementById('formTitle').innerText = 'Login';
};

document.getElementById('loginForm').onsubmit = async function(e) {
  e.preventDefault();
  let email = document.getElementById('email').value.trim();
  let password = document.getElementById('password').value.trim();
  let valid = true;
  document.getElementById('emailError').innerText = '';
  document.getElementById('passwordError').innerText = '';
  document.getElementById('formError').innerText = '';

  if (!email) {
    document.getElementById('emailError').innerText = 'username Required';
    valid = false;
  }
  if (!password) {
    document.getElementById('passwordError').innerText = 'Password Required';
    valid = false;
  }
  if (!valid) return;

  try {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      window.location = 'dashboard.html';
    } else {
      document.getElementById('formError').innerText = data.message || 'Login failed';
    }
  } catch {
    document.getElementById('formError').innerText = 'Server error. Try again later.';
  }
};


document.getElementById('registerForm').onsubmit = async function(e) {
  e.preventDefault();
  let email = document.getElementById('regEmail').value.trim();
  let password = document.getElementById('regPassword').value.trim();
  let valid = true;
  document.getElementById('regEmailError').innerText = '';
  document.getElementById('regPasswordError').innerText = '';
  document.getElementById('regFormError').innerText = '';

  if (!email) {
    document.getElementById('regEmailError').innerText = 'username Required';
    valid = false;
  }
  if (!password) {
    document.getElementById('regPasswordError').innerText = 'Password Required';
    valid = false;
  }
  if (!valid) return;

  try {
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      window.location = 'index.html';
    } else {
      document.getElementById('regFormError').innerText = data.message || 'Registration failed';
    }
  } catch {
    document.getElementById('regFormError').innerText = 'Server error. Try again later.';
  }
};


document.getElementById('resetForm').onsubmit = async function(e) {
  e.preventDefault();
  let email = document.getElementById('resetEmail').value.trim();
  let password = document.getElementById('resetPassword').value.trim();
  let valid = true;
  document.getElementById('resetEmailError').innerText = '';
  document.getElementById('resetPasswordError').innerText = '';
  document.getElementById('resetFormError').innerText = '';

  if (!email) {
    document.getElementById('resetEmailError').innerText = 'Email Required';
    valid = false;
  }
  if (!password) {
    document.getElementById('resetPasswordError').innerText = 'Password Required';
    valid = false;
  }
  if (!valid) return;

  try {
    const res = await fetch('http://localhost:5000/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      alert('Password reset successful! Please login.');
      document.getElementById('resetForm').style.display = 'none';
      document.getElementById('loginForm').style.display = '';
      document.getElementById('formTitle').innerText = 'Login';
    } else {
      document.getElementById('resetFormError').innerText = data.message || 'Reset failed';
    }
  } catch {
    document.getElementById('resetFormError').innerText = 'Server error. Try again later.';
  }
};


document.getElementById('googleLogin').onclick = function() {
  window.location = 'http://localhost:5000/api/auth/google';
};
document.getElementById('googleRegister').onclick = function() {
  window.location = 'http://localhost:5000/api/auth/google';
};
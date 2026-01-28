const form = document.getElementById('login-form');

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {
        username: username,
        password: password
    };

    try {
        const response = await fetch('/api/v1/auth/token', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('message').innerText = 'Giriş başarılı! Yönlendiriliyorsunuz...';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            document.getElementById('message').innerText = 'Kullanıcı adı veya şifre hatalı.';
        }
    }
    catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'Sunucuya bağlanılamadı. Backend servisinin çalıştığından emin olun.';
    }
});
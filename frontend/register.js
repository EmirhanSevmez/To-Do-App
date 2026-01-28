const form = document.getElementById('register-form');

if (form) {
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const data = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                document.getElementById('message').innerText = 'Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                const result = await response.json();
                document.getElementById('message').innerText = result.error || 'Kayıt başarısız.';
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('message').innerText = 'Sunucu hatası.';
        }
    });
}

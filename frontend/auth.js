(async () => {
    const isPublicPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html');

    try {
        const response = await fetch('/api/v1/secured/ping', {
            method: 'GET',
            credentials: 'include'
        });

        console.log('Auth check status:', response.status);

        if (response.ok) {
            // User is logged in

            if (isPublicPage || document.getElementById('login-form')) {
                console.log('Redirecting to index.html');
                window.location.href = 'index.html';
            }
        } else {
            // User is NOT logged in
            if (!isPublicPage && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
                console.log('Redirecting to login.html due to status:', response.status);
                window.location.href = 'login.html';
            }
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        if (!isPublicPage) {
            window.location.href = 'login.html';
        }
    }
})();

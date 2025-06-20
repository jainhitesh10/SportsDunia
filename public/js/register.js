// filepath: /mlm-web-project/mlm-web-project/public/js/register.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const referralCode = document.getElementById('referralCode').value;

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, referralCode })
        });

        const result = await response.json();

        if (response.ok) {
            alert(`User registered successfully! User ID: ${result.userId} Referral Code: ${result.referralCode}`);
            form.reset();
        } else {
            alert('Error: ' + result.error);
        }
    });
});
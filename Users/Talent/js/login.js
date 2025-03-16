const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        email: email,
        password: password
    };

    fetch('https://swifthaya.kodexng.com/api/v1/login', { // Replace with your actual login endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             "Accept" : 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            // Login successful
            return response.json(); // Parse the response as JSON
        } else {
            // Login error
            return response.json().then(errorData => { //try to parse json, if it fails, parse text.
                throw new Error(JSON.stringify(errorData));
            }).catch(()=>{
                return response.text().then(text => {
                    throw new Error(text);
                });
            });
        }
    })
    .then(data => {
        // Handle successful login (e.g., store token, redirect)
        console.log('Login successful:', data);

        // Example: Store the token in local storage
        if (data.token) {
            localStorage.setItem('authToken', data.token);
        }

        // Example: Redirect to a dashboard page
        window.location.href = 'dashboard.html'; // Replace with your dashboard URL

    })
    .catch(error => {
        // Handle login errors
        console.error('Login error:', error);
        // Display an error message to the user (e.g., in an alert or on the page)
        // alert("Login failed. Check your credentials.");
    });
});
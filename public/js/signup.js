const signupFormHandler = async (event) => {
    try {
        event.preventDefault();

        const username = document.querySelector('#username-signup').value.trim();
        const email = document.querySelector('#email-signup').value.trim();
        const password = document.querySelector('#password-signup').value.trim();

        // Additional client-side form validation
        if (!username || !email || !password) {
            // Display a user-friendly error message
            alert('Please fill in all the fields.');
            return;
        }

        // Display a loading spinner or indicator

        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // Redirect the user to another location upon successful registration
            document.location.replace('/');
        } else {
            // Display an error message
            alert(`Error: ${await response.text()}`);
        }
    } catch (error) {
        console.error('An error occurred during form submission:', error);
    }
};
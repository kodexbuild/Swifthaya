const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

    // Define nested data objects
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const password = document.querySelector('.password').value;
  const phone = document.getElementById('phone').value;
  // const industry = document.getElementById('industry').value;


  const formData =  new FormData();
  formData.append('firstname', firstname);
  formData.append('lastname', lastname);
  formData.append('email', email);
  formData.append('password', password);

  //{
  //   firstname: firstname,
  //   lastname:lastname,
  //   email: email,
  //   password: password
  // };


  fetch('https://swifthaya.kodexng.com/api/v1/register', {
    method: 'POST',
      // mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      console.log(response)
      // return response.json();
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .then(data => {
    // Handle successful signup
    console.log('Signup successful:', data);
    // Redirect to a success page or display a success message
  })
  .catch(error => {
    // Handle signup errors
    console.error('Signup error:', error);
    // Display an error message to the user
  });
});
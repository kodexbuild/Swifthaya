
async function signup() {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const firstname = document.getElementById('firstname').value;
      const lastname = document.getElementById('lastname').value;
      const email = document.getElementById('email').value;
      const city = document.getElementById('city').value;
      const state = document.getElementById('state').value;
      const phone = document.getElementById('phone').value;
      const password = document.getElementById('password').value;
      const password_confirmation = document.getElementById('password_confirmation').value;

      const userData = {
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password,
          phone_number: phone,
          city: city,
          state: state,
          password_confirmation: password_confirmation
      };

      try {
          const response = await fetch('https://swifthaya.kodexng.com/api/v1/register_talent', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  "Accept" : 'application/json'
              },
              body: JSON.stringify(userData)
          });

          
          const responseText = await response.text; // Get response as text
          console.log('Response text:', responseText); // Log the response

          if (response.ok) {
              // Signup successful
              const contentType = response.headers.get('Content-Type');
              console.log(contentType)
              try {
                  const data = await response.json();
                  console.log('Signup successful:', data);
                  // Handle success (e.g., redirect, show message)
                  window.location.href = '../../login.html';
              } catch (jsonError) {
                  
                  console.log("Signup successful, but non-json response:", jsonError);
              }

          } else {
              // Signup error
              try{
                  const errorData = await response.json();
                  console.error('Signup error:', errorData);
                  //handle error
              } catch (jsonError){
                 
                  console.error('Signup error:', jsonError);
                  //handle error
              }

          }
      }

      
      // ////
      catch (error) {
          console.error('Fetch error:', error);
          // Handle fetch error
      }
  });
}

signup();
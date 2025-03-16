const submitBtn = document.getElementById("signup-btn");

const companySignup = async () => {

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const emailAdd = document.getElementById("email-address").value;
    const phone = document.getElementById("phone-number").value;
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

   try {
       const response = await fetch("https://swifthaya.kodexng.com/api/v1/register_individual", {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
               "Accept": "application/json",
           },
           body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: emailAdd,
            phone_number: phone,
            city: city,
            state: state,
            password: password,
            password_confirmation: confirmPassword
           })
       });

       const profileData = await response.json();

       if (response.ok) {
           console.log("Registration Successful:", profileData);
           document.querySelector("form").reset();
           setTimeout(() => {
            window.location.href = "../../login.html"
           }, 2000)
       } else {
           console.error("Registration Failed:", profileData);
       }
  
   } catch (error) {
       console.error("Error during company signup:", error);
   }
};

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    companySignup();
});



document.addEventListener("DOMContentLoaded", () => {


    const submitBtn = document.getElementById("signup-btn");
    const companyCheckbox = document.getElementById("company-checkbox");
    const companyDetails = document.querySelector(".inputs2");

    if (!companyCheckbox || !companyDetails) {
        console.error("companyDetails or companyEmployer not found");
    }

    const toggleCompanyanyDetails = () => {
        if (companyCheckbox.checked) {
            companyDetails.style.display = "flex";
        } else {
            companyDetails.style.display = "none";
        }
    };

    toggleCompanyanyDetails();  

    companyCheckbox.addEventListener("change", toggleCompanyanyDetails);

    const companySignup = async () => {

        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const emailAdd = document.getElementById("email-address").value;
        const phone = document.getElementById("phone-number").value;
        const state = document.getElementById("state").value;
        const city = document.getElementById("city").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const companyEmployer = companyCheckbox.checked;
        const companyName = document.getElementById("company-name").value;
        const companyEmail = document.getElementById("company-email").value;   
        const companyPhone = document.getElementById("company-phone").value;
        const industry = document.getElementById("company-industry").value;
        const companyWebsite = document.getElementById("company-website").value;
        const companyState = document.getElementById("company-state").value;
        const companyCity = document.getElementById("company-city").value;

        const apiUrl = companyEmployer ?
            "https://swifthaya.kodexng.com/api/v1/register_company"
            :
            "https://swifthaya.kodexng.com/api/v1/register_individual";
        console.log(apiUrl);
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    // user_type: companyEmployer ? "company" : "individual",
                    first_name: firstName,
                    last_name: lastName,
                    email: emailAdd,
                    phone_number: phone,
                    city: city,
                    state: state,
                    password: password,
                    password_confirmation: confirmPassword,
                    company_name: companyName,
                    company_email: companyEmail,
                    company_phone_number: companyPhone,
                    industry: industry,
                    company_website: companyWebsite,
                    company_state: companyState,
                    company_city: companyCity
                })
            });

            const profileData = await response.json();

            if (response.ok) {
                console.log("Registration Successful:", profileData);
                document.querySelector("form").reset();
               
                Toastify({
                    text: "You have succesfully signed up to SWIFTHAYA",
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function(){}
                }).showToast();
                setTimeout(() => {  
                    window.location.href = "../../login.html"
                }, 4000);
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



});
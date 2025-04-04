const loginBtn = document.querySelector(".loginbtn");

const login = async () => {
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;

   try {
      const response = await fetch("https://swifthaya.kodexng.com/api/v1/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
         },
         body: JSON.stringify({email, password})
      });

      const loginData = await response.json();
      console.log(loginData.token)
      // console.log(loginData.data.id)
      if (response.ok){
         console.log("login successful", loginData);
         document.querySelector("form").reset();
         localStorage.setItem("token", loginData.token);
         localStorage.setItem("userId", loginData.data.id);
         localStorage.setItem("userType", loginData.data.user_type) ;

         Toastify({
            text: "Login Successful",
            duration: 1000,
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
            window.location.href = "Users/Company/dashboard.html";
         }, 2000);
         // window.location.href = "Users/Company/dashboard.html";
      } else {
         
         console.error("login Failed:", loginData);
     }

   } catch (error) {
      console.error("Error during login:", error);
   }
};

loginBtn.addEventListener("click", (event) => {
   event.preventDefault();
   login();
});
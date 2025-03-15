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

      if (response.ok){
         console.log("login successful", loginData);
         document.querySelector("form").reset();
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
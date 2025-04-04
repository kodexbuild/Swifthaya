// const editProfile = document.querySelector(".edit-btn").addEventListener("click", () => {
//    location.href = "createprofile.html"
// })

function loadPage(file) {
   fetch(file)
       .then(response => response.text())
       .then(html => {
           content.innerHTML = html;
           loadScripts(html); // Ensure scripts in loaded page execute
           editProfile(); // Re-attach event listeners after loading
       })
       .catch(error => console.error("Error loading page:", error));
}

function editProfile() {
   const editProfileBtn = document.querySelector(".edit-btn");
   if (editProfileBtn) {
       editProfileBtn.addEventListener("click", function () {
           loadPage("createprofile.html"); // Load create profile page
       });
   }
};
editProfile()

const userProfile = async () => {
   const response = await fetch("swifthaya.kodexng.com/api/v1/talents/3", {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
    }
   });
   const profileData = await response.json(); 
   console.log(profileData);
}
// register_company
userProfile();



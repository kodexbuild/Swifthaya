function loadPage(file) {
   fetch(file)
       .then(response => response.text())
       .then(html => {
           content.innerHTML = html;
           loadScripts(html); // Ensure scripts in loaded page execute
           attachEditProfileListener(); // Re-attach event listeners after loading
       })
       .catch(error => console.error("Error loading page:", error));
}

function editProfile() {
   const editProfileBtn = document.querySelector(".edit-profile");
   if (editProfileBtn) {
       editProfileBtn.addEventListener("click", function () {
           loadPage("company_profile_edit.html"); // Load create profile page
       });
   }
};
editProfile()
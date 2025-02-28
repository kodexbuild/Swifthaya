

const userForm=document.querySelector('.usertype')
userForm.addEventListener('submit', (event) => {
event.preventDefault(); 
console.log(userForm)
// Your custom form submission logic here (e.g., using fetch)
})
// Assuming you have a button with the ID "submitBtn"
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', submitForm);
function submitForm() {

const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked'); 

let selectedUserType = null; 

checkboxes.forEach(checkbox => {
if (checkbox.checked) {
selectedUserType = checkbox.getAttribute('data-user-type');
 
}
});

  if (selectedUserType) {
    window.location.href = `./Users/${selectedUserType}/signup.html`; 
  } else {
    alert('Please select a user type.');
  }
}



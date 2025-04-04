document.addEventListener("DOMContentLoaded", () => {
  const actionBtns = document.querySelectorAll(".action-btn");
  const actionMenu = document.querySelector("#action-menu");

actionBtns.forEach(actionBtn => {
  actionBtn.addEventListener("click", () => {
    console.log("action btn clicked");
    actionMenu.classList.toggle("show");
  });
});

})

// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll(".action-btn").forEach(button => {
//       button.addEventListener("click", function (event) {
//           const menu = this.previousElementSibling; // Selects the `.action-menu`
//           menu.classList.toggle("show");

//           // Close if clicked outside
//           document.addEventListener("click", function closeMenu(e) {
//               if (!menu.contains(e.target) && !button.contains(e.target)) {
//                   menu.classList.remove("show");
//                   document.removeEventListener("click", closeMenu);
//               }
//           });
//       });
//   });
// });



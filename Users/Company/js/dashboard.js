document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".link");
  const navs = document.querySelectorAll(".li");
  const content = document.getElementById("content");
  const userType = localStorage.getItem("userType");
  console.log(userType);

  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".header");
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
  navs.forEach((nav) => {
    nav.addEventListener("click", () => {
      // Remove active class from all nav items
      navs.forEach((item) => item.classList.remove("active"));

      // Add active class to the clicked nav item
      nav.classList.add("active");
    });
  });


  const loadHtml = async (file) => {
    try {
      const response = await fetch(file);

      if (!response.ok) {
        throw new Error("network response not ok");
      }
      let html = await response.text();
      content.innerHTML = html;
      html = "";

      document.querySelectorAll("script[data-dynamic]").forEach(script => script.remove());

      executeScripts(content);
      attachEditProfileListener();

    } catch {
      content.innerHTML = `<h1> error loading content</h1>`;
    }
  };

  const initialFile = "./dashboard_profile.html";
  loadHtml(initialFile);

  links.forEach((link) => {
    link.addEventListener("click", async (event) => {
        event.preventDefault();
        let file = link.getAttribute("data-file");

        if (file.includes("profile")) {
            let profilePage;
            
            if (userType === "individual") {
                profilePage = "./individual_employer_profile.html";
            } else if (userType === "company") {
                profilePage = "./company_employer_profile.html";
            } else {
                console.log("Not a valid user type.");
                return;
            }

            console.log("Loading profile:", profilePage);
            loadHtml(profilePage);
        } else {
            loadHtml(file);
        }
    });
});

function executeScripts(container) {
  const scripts = container.querySelectorAll("script");
  scripts.forEach((oldScript) => {
      if (oldScript.src) {
          // Check if the script is already present before adding
          if (!document.querySelector(`script[src="${oldScript.src}"]`)) {
              const newScript = document.createElement("script");
              newScript.src = oldScript.src;
              newScript.onload = () => console.log(`Loaded external script: ${oldScript.src}`);
              document.body.appendChild(newScript);
          }
      } else {
          // Inline scripts (not linked via src) should be re-executed
          const newScript = document.createElement("script");
          newScript.textContent = oldScript.textContent;
          document.body.appendChild(newScript);
      }
      oldScript.remove();
  });
}

  function attachEditProfileListener() {
    document.addEventListener("click", (event) => {
      const editBtn = event.target.closest(".edit-btn"); 
      if (editBtn) {
          let editPage = editBtn.getAttribute("data-file"); 
  
          if (!editPage && editBtn.id === "edit-profile-btn") {
              editPage = userType === "individual" 
                  ? "./individual_profile_edit.html" 
                  : "./company_profile_edit.html";
          }
  
          if (editPage) {
              loadHtml(editPage); 
          } else {
              console.warn("⚠ No data-file attribute found and no userType match.");
          }
      }
    });
  };
});

document.getElementById("logout").addEventListener("click", async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://swifthaya.kodexng.com/api/v1/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Logged out successfully");
        Toastify({
          text: "Login Successful",
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
         window.location.href = "../../../login.html";
       }, 4000);
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
});




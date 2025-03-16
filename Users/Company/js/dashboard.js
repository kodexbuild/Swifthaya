document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".link");
  const navs = document.querySelectorAll(".li");
  const content = document.getElementById("content");

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
  
      // html = ""; // Or html = "";
      content.innerHTML = html;
      console.log(html);
      html = "";
    } catch {
      content.innerHTML = `<h1> error loading content</h1>`;
    }
  };

  const initialFile = "./dashboard_profile.html";
  loadHtml(initialFile);

  links.forEach((link) => {
    link.addEventListener("click", async (event) => {
      console.log(link);
      event.preventDefault();
      const file = link.getAttribute("data-file");
      console.log(file);
      loadHtml(file)
    });
  });
});

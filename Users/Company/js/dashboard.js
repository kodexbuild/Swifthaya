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
    nav.addEventListener("click", (e) => {
      navs.forEach((nav) => nav.classList.toggle("active"));
      // e.target.classList.add("active");
    });
  });

  links.forEach((link) => {
    link.addEventListener("click", async (event) => {
      console.log(link);
      event.preventDefault();
      const file = link.getAttribute("data-file");
      console.log(file);

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
    });
  });
});

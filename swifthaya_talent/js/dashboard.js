document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".link");
  const navs = document.querySelectorAll(".li");
  const sidebar = document.querySelector(".sidebar");
  const content = document.getElementById("content");
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".header");
    const scrollY = window.scrollY;

    if (scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // function for the li navs

  // function toggleActiveClass(liElement) {
  //   if (liElement.classList.contains("active")) {
  //     liElement.classList.remove("active");
  //   } else {
  //     liElement.classList.add("active");
  //   }
  // }

  navs.forEach((nav) => {
    const icon = nav.querySelector("i");
    console.log(icon);

    nav.addEventListener("click", (e) => {
      if (icon) {
        icon.addEventListener("click", (e) => {
          // sidebar.classList.toggle("small");
        });
        const a_tag = nav.querySelector("a");
        // a_tag.classList.toggle("none");
        // nav.classList.toggle("widdth");
      }
      // toggleActiveClass(nav);

      document.querySelector(".active")?.classList.remove("active");
      nav.classList.add("active");
    });
  });

  const initialFile = "./dashboardprofile.html";
  fetch(initialFile)
    .then((response) => response.text())
    .then((html) => {
      content.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading initial content:", error);
      content.innerHTML = `<h1>Error loading content</h1>`;
    });
  // a links
  links.forEach((link) => {
    const file = link.getAttribute("data-file");
    console.log(file);
    link.addEventListener("click", async (event) => {
      console.log(link);
      event.preventDefault();
      // Update the CSS link based on the fetched HTML content
      const styleLink = document.getElementById("styleLink");
      // styleLink.href = "styles-" + file.replace(".html", ".css");

      try {
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error("network response not ok");
        }

        html = await response.text();

        content.innerHTML = html;
        // console.log(html);
      } catch {
        content.innerHTML = `<h1> error loading content</h1>`;
      }
    });
  });
});

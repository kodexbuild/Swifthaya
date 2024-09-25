document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".link");
  const navs = document.querySelectorAll(".li");
  const content = document.getElementById("content");
  navs.forEach((nav) => {
    nav.addEventListener("click", (e) => {
      nav.classList.toggle("active");
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
        const html = await response.text();
        content.innerHTML = html;
      } catch {
        content.innerHTML = `<h1> error loading content</h1>`;
      }
    });
  });
});

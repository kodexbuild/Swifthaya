document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".link");
  const navs = document.querySelectorAll(".li");
  const sidebar = document.querySelector(".sidebar");
  const content = document.getElementById("content");
  const menubtn = document.querySelector(".ri-menu-line");
  const dashboard = document.querySelector(".sidebar");

  window.addEventListener("scroll", function () {
      const navbar = document.querySelector(".header");
      const scrollY = window.scrollY;

      if (scrollY > 20) {
          navbar.classList.add("scrolled");
      } else {
          navbar.classList.remove("scrolled");
      }
  });

  menubtn.addEventListener("click", function (e) {
      dashboard.classList.toggle("show");
      console.log("clicked");
      console.log(dashboard);
  });

  navs.forEach((nav) => {
      nav.addEventListener("click", (e) => {
          document.querySelector(".active")?.classList.remove("active");
          nav.classList.add("active");
      });
  });

  const initialFile = "./talent.html";
  fetch(initialFile)
      .then((response) => response.text())
      .then((html) => {
          content.innerHTML = html;
          loadScripts(html, content);
          console.log(html, content);
      })
      .catch((error) => {
          console.error("Error loading initial content:", error);
          content.innerHTML = "<h1>Error loading content</h1>";
      });

  links.forEach((link) => {
      link.addEventListener("click", async (event) => {
          event.preventDefault();
          console.log(link);

          const file = link.getAttribute("data-file");
          console.log(file);

          if (!file) return;

          try {
              const response = await fetch(file);
              if (!response.ok) {
                  throw new Error(`Network response not ok: ${response.status}`);
              }

              const html = await response.text();
              content.innerHTML = html;
              loadScripts(html, content);
          } catch (error) {
              console.error("Error loading content:", error);
              content.innerHTML = `<h1>Error loading content: ${error.message}</h1>`;
          }
      });
  });

  function loadScripts(dummyscript, container) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = dummyscript;

      const scripts = tempDiv.querySelectorAll("script");
      console.log(scripts);

      scripts.forEach((script) => {
          const newScript = document.createElement("script");
          newScript.type = script.type || "text/javascript";

          if (script.src) {
              newScript.src = script.src;
              newScript.async = false;
              console.log(`Loading external script from: ${script.src}`);
          } else {
              newScript.textContent = script.innerHTML;
              console.log("Executing inline script:", script.innerHTML.substring(0, 50) + "...");
          }

          newScript.onload = () => {
              console.log("Script loaded successfully.");
          };

          newScript.onerror = () => {
              console.error("Error loading script from children:", newScript.src);
          };

          container.appendChild(newScript); // Append each script
      });
  }

  const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
              if (node.tagName === "SCRIPT") {
                  console.log(`mutation observer at work Script detected: ${node.src || "inline script"}`);
              }
          });
      });
  });

  observer.observe(content, { childList: true, subtree: true });

  document.getElementById("logout").addEventListener("click", function () {
      const token = localStorage.getItem("userToken");

      fetch("/logout", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + token,
          },
      })
          .then((response) => {
              if (response.ok) {
                  localStorage.removeItem("userToken");
                  document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  window.location.href = "/login.html"; // Use absolute or server-relative path
              } else if (response.status === 401) {
                  console.error("Unauthorized");
                  alert("Your session has expired. Please log in again.");
                  window.location.href = "/login.html";
              } else {
                  console.error("Logout failed with status:", response.status);
                  alert("Logout failed. Please try again.");
              }
          })
          .catch((error) => {
              console.error("Error during logout:", error);
              alert("An error occurred. Please try again.");
          });
  });
});
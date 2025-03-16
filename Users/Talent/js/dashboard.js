document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".link");
  const navs = document.querySelectorAll(".li");
  const sidebar = document.querySelector(".sidebar");
  const content = document.getElementById("content");
  const menubtn= document.querySelector(".ri-menu-line")
  const dashboard= document.querySelector(".sidebar")
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
  menubtn.addEventListener('click',function (e){
    dashboard.classList.toggle('show')
    console.log('clicked')
    console.log(dashboard)
  })

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
      loadScripts(html);
      console.log(html)
    })
    .catch((error) => {
      console.error("Error loading initial content:", error);
      content.innerHTML =`<h1>Error loading content</h1>`;
    });
  // a links
  links.forEach((link) => {
    link.addEventListener("click", async (event) => {
     event.preventDefault();
      console.log(link);

    const file = link.getAttribute("data-file");
    console.log(file);
      
      // Update the CSS link based on the fetched HTML content
      const styleLink = document.getElementById("styleLink");
      // styleLink.href = "styles-" + file.replace(".html", ".css");

      if (!file) return;
  
    try {
        const response = await fetch(file);
        if (!response.ok) 
            throw new Error("network response not ok");
          
    
          const html = await response.text();
    
          content.innerHTML = html;
            loadScripts(html);
          // console.log(html);
        } catch {
            content.innerHTML = `<h1> error loading content</h1>`;
          }
        });
          dashboard.classList.toggle('show')
  });

  function loadScripts(dummyscript) {
    // Create a temporary container to parse the HTML and extract script tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = dummyscript;
    

    // Find all the script tags in the fetched HTML
    const scripts = tempDiv.querySelectorAll('script');
    console.log(scripts)
    
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      newScript.src = script.src || ''; // If src is empty, we handle inline scripts later.
      newScript.type = script.type || 'text/javascript';

      if (script.innerHTML) {
        // If there is inline script content, copy it
        newScript.innerHTML = script.innerHTML;
      }

      // Append the script to the body of the document, so it will execute
      document.body.appendChild(newScript);

      newScript.onload = () => {
        console.log('Script loaded successfully.');
      };
      
      newScript.onerror = () => {
        console.error('Error loading script:', newScript.src);
      };
    });
  }
  // function loadComponent(componentUrl) {
  //   const script = document.createElement('script');
  //   script.src = componentUrl;
  
  //   script.onload = () => {
  //     //  Trigger  actions after the script is loaded
  //     console.log('Script loaded successfully.');
  //   };
  
  //   script.onerror = () => {
  //     console.error('Error loading script:', componentUrl);
  //   };
  
  //   document.body.appendChild(script);
  // }

 
});
// dashboard reviews js


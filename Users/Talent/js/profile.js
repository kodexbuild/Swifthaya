async function loadModalContent(file, targetElement) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        targetElement.innerHTML = html;
        // Handle script loading if needed
    } catch (error) {
        console.error("Error loading modal content:", error);
    }
}


    const editButton = document.getElementById("edit-btn");
    const modal = document.getElementById("editProfileModal");
    const modalContent = document.getElementById("modalContent");
    const closeButton = document.querySelector(".close");

    if (editButton && modal && modalContent && closeButton) {
        editButton.addEventListener("click", () => {


            const intervalId = setInterval(myFunction, 2000);
       
       
            modal.style.display = "block"; // Show the modal
            setTimeout(() => {
                clearInterval(intervalId);
                console.log("Interval stopped.");
              }, 10000);
              
              function myFunction() {
                window.location.href = "Editprofile.html";
              };
           
           
        });

        closeButton.addEventListener("click", () => {
            modal.style.display = "none"; // Hide the modal
        });

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none"; // Hide the modal if clicked outside
            }
        });
    } else {
        console.error("One or more modal elements not found.");
    }

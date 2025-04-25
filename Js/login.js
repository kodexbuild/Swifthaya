const loginForm = document.getElementById('loginForm');
const modal = document.getElementById("myModal");
const modal404=  document.getElementById("errormodal")
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];


// modal code//
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function setupPasswordToggle(inputId, iconSelector, iconClass1, iconClass2) {
  const passwordField = document.getElementById(inputId);
  const iconElement = document.querySelector(iconSelector); // Use querySelector

  if (!passwordField) {
    console.error(`Input with ID "${inputId}" not found.`);
    return;
  }

  if (!iconElement) {
    console.error(`Icon element with selector "${iconSelector}" not found.`);
    return;
  }

  iconElement.addEventListener("click", () => {
    const childElement = iconElement.firstElementChild;
    if (childElement) {
      if (childElement.classList.contains(iconClass1)) {
        childElement.classList.replace(iconClass1, iconClass2);
        passwordField.type = "password";
      } else {
        childElement.classList.replace(iconClass2, iconClass1);
        passwordField.type = "text";
      }
    }
  });
}

setupPasswordToggle("password", "#eye", "ph-eye", "ph-eye-slash");

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const userData = {
    email: email,
    password: password
  };

  async function fetchData() {
    try {
      const response = await fetch('https://swifthaya.kodexng.com/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Accept": 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        if (response.status === 401) {
          showModal(modal, "Unauthorized");
          return;
        }
        if (response.status === 404) {
          showModal(modal404, "The server returned a 404 Not Found error.");
          return;
        }
        if (response.status === 422) {
          showModal(modal, "Invalid credentials");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      } else if (response.ok) {
        showModal(modal, "Logged in successfully");
      }
      // server response

      const data = await response.json();
console.log(data);
console.log('response', response);
console.log('data:', data);

if (data.data && data.data.user) {
  const {
    data: {
      user: {
        user_type,
        id: userid,
        user_profile,
      },
        user_profile_id: userProfileId, // Renamed to avoid conflicts

    },
    token: authToken,
  } = data;

  console.log('User Type:', user_type);
  console.log('User profile:', user_profile);
  console.log('User profile_id:', userProfileId);

  sessionStorage.setItem('authToken', authToken);
  sessionStorage.setItem('userid', userid);
    //Check if user_profile exists before accessing nested properties.
    // const userProfileIdSession = data.user?.user_profile_id;
    if(userProfileId){
        sessionStorage.setItem('user_profile_id', userProfileId);
    } else {
        console.warn("user_profile or user_profile_id is undefined");
    }

}
      
      else {
        console.log("User not found or wrong response");
      }
        window.location.href = `./users/${user_type.charAt(0).toUpperCase() + user_type.slice(1)}/dashboard.html`;
      // 
    } catch (error) {
      console.error('error', error);
      if (modal) {
        const message = modal.querySelector(".modal-content p");
        message.textContent = "Error fetching data.";
      }
    }
  }
    fetchData();
});

function showModal(modalElementId, content) {
  if (modalElementId) {
    const contentElement = modal.querySelector(".modal-content p");
    if (contentElement) {
      contentElement.textContent = content;
      modalElementId.style.display = "flex";
    } else {
      console.error(`Modal content element not found in modal with ID "${modalElementId}".`);
    }
  } else {
    console.error(`Modal with ID "${modalElementId}" not found.`);
  }
}
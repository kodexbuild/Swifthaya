// 
document.addEventListener('DOMContentLoaded', function() {
  const profilePictureInput = document.getElementById('profilePictureInput');
  const profilePicturePreview = document.getElementById('ProfilePicturePreview');
  const uploadButton = document.getElementById('uploadButton');
  const more_icon = document.getElementById('more');

  const baseUrl = 'https://swifthaya.kodexng.com'; // Replace with your base URL
  const api = '/api/v1/talents';
  const talentId = 1; // Replace with the talent ID
// dom code
  more_icon.addEventListener('click', function() {
    const inputwrapper = profilePictureInput.parentElement;
    inputwrapper.classList.toggle('show');
  });
// fetching the stored values
async function fetchUserData() {
  try {
    const userId = getUserId(); // Replace with your actual user ID retrieval method
    const token = getToken(); // Replace with your actual token retrieval method
    

    const response = await fetch(`https://swifthaya.kodexng.com/api/v1/talents/1`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // If using JWT or similar.
        'Accept': 'application/json', // Or whatever content type your API uses.
        // Add other necessary headers
      },
      // If you are using query parameters for the user ID.
      // query: { userId: userId}
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const userData = await response.json();

    // Populate the form fields with the fetched data
    populateForm(userData);

  } catch (error) {
    console.error('Error fetching user data:', error);
    // Handle the error (e.g., display an error message to the user)
    displayErrorMessage("Could not retrieve user data. Please try again later.");
  }
}

function getUserId() {
  // Replace this with your actual logic to retrieve the user's ID.
  // This might involve reading it from local storage, session storage, or a cookie.
  // Example:
  return sessionStorageStorage.getItem('userId'); // Or wherever you store it.
}

function getToken() {
     // Replace this with your actual logic to retrieve the user's authentication token.
     // Example:
     return sessionStorageStorage.getItem('authToken');
}

function populateForm(userData) {
  // Assuming you have input fields with IDs 'name' and 'email'.
  const firstname = document.getElementById('firstname');
  const lastname = document.getElementById('lastname');
  const emailInput = document.getElementById('email');
  const phone = document.getElementById('telph');
  const state = document.getElementById('state');
  const city = document.getElementById('city');

 


  if (firstname) {
   firstname.value = userData.first_name || ''; // Use an empty string as a fallback.
  }
  if (lastname) {
    lastname.value = userData.last_name || ''; // Use an empty string as a fallback.
   }

  if (emailInput) {
    emailInput.value = userData.email || '';
  }
  if (phone) {
    phone.value = userData.phone || '';
  }
  if (state) {
    state.value = userData.state|| '';
  }
  if (city) {
    city.value = userData.city|| '';
  }
  // Populate other fields as needed
}

// submitting the profile picture
  profilePictureInput.addEventListener('change', function() {
    const file = profilePictureInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
        profilePicturePreview.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  });
//  upload btn
  uploadButton.addEventListener('click', async function() {
    const file = profilePictureInput.files[0];
    if (file) {
      const authToken = sessionStorage.getItem('authToken'); // Retrieve token from local storage
      if (!authToken) {
        console.error('Authentication token not found in local storage.');
        // Handle the case where the token is missing (e.g., redirect to login)
        return;
      }
      const result = await uploadProfilePicture(baseUrl, api, talentId, file,authToken);
      if (result) {
        console.log('Profile picture uploaded successfully:', result);
        // Optionally update the preview or provide user feedback
      } else {
        console.log('Profile picture upload failed.');
        // Optionally provide user feedback
      }
    }
  });

  // Function to upload profile picture to the API
  async function uploadProfilePicture(baseUrl, api, talentId, imageFile,authToken) {
    const url = `${baseUrl}${api}/${talentId}/profile_pic`;
    console.log(url)

    try {
      const formData = new FormData();
      formData.append('profile_picture', imageFile);

      const response = await fetch(url, {
        method: 'POST', // or 'POST', depending on your API
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
        },
        body: formData,
      });

      if (!response.ok) {
        console.error('Response Status:', response.status);
        const errorText = await response.text();
        console.error('Response Text:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json();
      return  result;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      return null;
    }
  }

  // form submit function
  function setupFormSubmission() {
    const form = document.getElementById("editProfileForm");
    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => (data[key] = value));

            try {
                const response = await fetch("https://swifthaya.kodexng.com//api/v1/talents/1", { // Replace with your API URL
                    method: "PATCH", // Or PUT, depending on your API
                    headers: {
                        "Content-Type": "application/json",
                           "Accept": 'application/json'
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    alert("Profile updated successfully!"); // Display success message
                    document.getElementById("editProfileModal").style.display = "none"; //close modal
                } else {
                    alert("Failed to update profile."); // Display error message
                }
            } catch (error) {
                console.error("Error saving profile:", error);
                alert("An error occurred while saving.");
            }
        });
    }
}


  // Resume upload functionality (remains the same)
  document.querySelector('.file-label').addEventListener('click', function() {
    document.getElementById('resumeUpload').click();
  });

  document.querySelector('.resumebtn').addEventListener('click', function() {
    document.getElementById('resumeUpload').click();
  });
});
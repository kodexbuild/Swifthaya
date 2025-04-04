
const fileInput = document.getElementById("profile-image");
const imagePlaceholder = document.querySelector(".image-placeholder");
const userId = localStorage.getItem("userId");
const userTypes = localStorage.getItem("userType");

const populateProfileData = async (userType) => {
   try {
       const token = localStorage.getItem("token");
      //  const userId = localStorage.getItem("userId");

       const apiUrl = userType === "individual"
           ? `https://swifthaya.kodexng.com/api/v1/individuals/${userId}`
           : `https://swifthaya.kodexng.com/api/v1/companies/${userId}`;

       const response = await fetch(apiUrl, {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json',
               "Accept": "application/json",
               "Authorization": `Bearer ${token}`,
           }
       });

       if (!response.ok) throw new Error("Failed to fetch profile");

       const profileData = await response.json();
       console.log("Profile Data:", profileData);

       if (userType === "individual") {
           const userProfile = profileData.data.user_profile;

           document.getElementById('fullName').value = `${userProfile.first_name} ${userProfile.last_name}`;
           document.getElementById('email').value = profileData.data.email;
           document.getElementById('phone').value = userProfile.phone_number;
           document.getElementById('state').value = userProfile.state;
           document.getElementById('city').value = userProfile.city;
           document.getElementById('linkedin').value = userProfile.linkedin || "";
           document.getElementById('twitter').value = userProfile.twitter || "";
           document.getElementById('instagram').value = userProfile.instagram || "";
           document.getElementById('github').value = userProfile.github || "";
       } else if (userType === "company") {
           const userProfile = profileData.data.user.user_profile;

           document.getElementById('fullName').value = `${userProfile.first_name} ${userProfile.last_name}`;
           document.getElementById('email').value = profileData.data.user.email;
           document.getElementById('phone').value = userProfile.phone_number;
           document.getElementById('state').value = userProfile.state;
           document.getElementById('city').value = userProfile.city;
           document.getElementById('linkedin').value = userProfile.linkedin || "";
           document.getElementById('twitter').value = userProfile.twitter || "";
           document.getElementById('instagram').value = userProfile.instagram || "";
           document.getElementById('github').value = userProfile.github || "";

           document.getElementById('companyName').value = profileData.data.company_name;
           document.getElementById('companyEmail').value = profileData.data.company_email;
           document.getElementById('companyPhone').value = profileData.data.company_phone_number;
           document.querySelector('select[name="industry"]').value = profileData.data.industry;
           document.querySelector('select[name="company-size"]').value = profileData.data.company_size;
           document.getElementById('companyWebsite').value = profileData.data.company_website;
           document.getElementById('companyState').value = profileData.data.company_state;
           document.getElementById('companyCity').value = profileData.data.company_city;
       }
   } catch (error) {
       console.error('Error fetching profile:', error);
   }
};
populateProfileData(userTypes);

// image preview
fileInput.addEventListener("change", (event) => {
   const file = event.target.files[0];
   console.log("✅ File selected:", file.name);

   if (file) {
      console.log("✅ File loaded successfully");
      const reader = new FileReader();
      reader.onload = (e) => {
      imagePlaceholder.style.backgroundImage = `url(${e.target.result})`;
      imagePlaceholder.style.backgroundSize = "cover";
      imagePlaceholder.style.backgroundPosition = "center";
      imagePlaceholder.textContent = ""; // Remove placeholder text
      };
      reader.onerror = () => {
         console.error("❌ Error reading file");
      };
      reader.readAsDataURL(file);
   } else {
      console.warn("⚠ No file selected");
   }
});

// image upload
const uploadProfileImage = async () => {
   try {
      const profileImage = fileInput.files[0];
      const imgUrl = userTypes === "individual"
      ? `https://swifthaya.kodexng.com/api/v1/individuals/${userId}/profile_pic`
      : `https://swifthaya.kodexng.com/api/v1/companies/${userId}/logo`;

      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("profile_picture", profileImage);

      const response = await fetch(imgUrl, {
         method: 'POST',
         headers: {
            'Authorization': `Bearer ${token}`,
         },
         body: formData
      });

      if (response.ok) {
         console.log("Profile image uploaded successfully", profileImage);
      } else {
         throw new Error("Failed to upload profile image");
      }

      // return await response.json();
   } catch (error) {
      console.error("Error during profile image upload:", error);
   }
};

document.querySelector(".imgBtn").addEventListener("click", () => {
   console.log("🚀 Uploading profile image...");
   console.log("clicked")

   const profileImage = fileInput.files[0];
   if (profileImage) {
      uploadProfileImage();
   }
});

// profile upload
const editProfileData = async (userTypes) => {
   try {
         const fullName = document.getElementById('fullName');
         const email = document.getElementById('email');
         const phone = document.getElementById('phone');
         const state = document.getElementById('state');
         const city = document.getElementById('city');
         const aboutCompany = document.getElementById('aboutCompany');

         // Company-specific fields
         let companyName, companyEmail, companyPhone, industry, companyWebsite;
         if (userTypes === "company") {
            companyName = document.getElementById('companyName');
            companyEmail = document.getElementById('companyEmail');
            companyPhone = document.getElementById('companyPhone');
            industry = document.querySelector('select[name="industry"]');
            // companySize = document.querySelector('select[name="company-size"]');
            companyWebsite = document.getElementById('companyWebsite');
            companyState = document.getElementById('companyState');
            companyCity = document.getElementById('companyCity');
         }

         // Socials
         const linkedin = document.getElementById('linkedin');
         const twitter = document.getElementById('twitter');
         const instagram = document.getElementById('instagram');
         const github = document.getElementById('github');

         const splitName = fullName.value.split(" ");
         const token = localStorage.getItem("token")

         // Determine API URL
         const apiUrl = userTypes === "individual"
            ? `https://swifthaya.kodexng.com/api/v1/individuals/${userId}`
            : `https://swifthaya.kodexng.com/api/v1/companies/${userId}`;

         const requestBody = {
            first_name: splitName[0],
            last_name: splitName[1],
            email: email.value,
            phone_number: phone.value,
            state: state.value,
            city: city.value,
            about: aboutCompany.value || "",
            linkedin: linkedin.value || "",
            twitter: twitter.value || "",
            instagram: instagram.value || "",
            github: github.value || "",
         };

         // Add company fields only if updating a company profile
         if (userTypes === "company") {
            requestBody.company_name = companyName.value;
            requestBody.company_email = companyEmail.value;
            requestBody.company_phone_number = companyPhone.value;
            requestBody.industry = industry.value;
            // requestBody.company_size = companySize.value;
            requestBody.company_website = companyWebsite.value;
            requestBody.company_state = companyState.value;
            requestBody.company_city = companyCity.value;
         }
         const response = await fetch(apiUrl, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json',
               'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody)
         });

         const profileData = await response.json();

         if (response.ok) {
            console.log("Profile updated successfully:", profileData);

            Toastify({
               text: "Profile updated successfully",
               duration: 3000,
               gravity: "top",
               position: "right",
               close: true,
               stopOnFocus: true,
               style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
            }).showToast();

         //   document.querySelector("form").reset();
         } else {
            console.error("Failed to update profile:", profileData);
         }
   } catch (error) {
         console.error("Error during profile update:", error);
   }
};




document.querySelector("form").addEventListener("submit", (event) => {
   event.preventDefault();

   editProfileData(userTypes);
});



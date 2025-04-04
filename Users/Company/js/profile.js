
const fetchUserProfile = async (userType) => {
   try {
       const detailsCard = document.querySelector('.details-card');
       const detailsCard2 = document.querySelector('.details-card2');
       const imgCard = document.querySelector(".profile-header");
       const token = localStorage.getItem("token");
       const userId = localStorage.getItem("userId");

       // Determine API URL
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
       console.log(profileData);

       let individualProfileInfo, profileImg, companyProfileInfo;
       
       if (userType === "individual") {
        fullname = `${profileData.data.user_profile.first_name} ${profileData.data.user_profile.last_name}`;

           profileImg = `
               <img src="${profileData.data.user_profile.profile_picture}" alt="Profile Picture" class="profile-img">
               <h2 class="company-name"> ${fullname} </h2>`;

           individualProfileInfo = `
               <div class="detail"><strong>Full Name</strong> <span> ${fullname} </span></div>
               <div class="detail"><strong>Email Address</strong> <span> ${profileData.data.email} </span></div>
               <div class="detail"><strong>Mobile Number</strong> <span> ${profileData.data.user_profile.phone_number} </span></div>
               <div class="detail"><strong>State</strong> <span> ${profileData.data.user_profile.state} </span></div>
               <div class="detail"><strong>City</strong> <span> ${profileData.data.user_profile.city} </span></div>`;


       } else if (userType === "company") {
             fullname = `${profileData.data.user.user_profile.first_name} ${profileData.data.user.user_profile.last_name}`;

           profileImg = `
               <img src="${profileData.data.user.user_profile.profile_picture}" alt="Company Logo" class="profile-img">
               <h2 class="company-name"> ${profileData.data.company_name} </h2>`;

            personalProfileInfo = `
            <div class="detail"><strong>Full Name</strong> <span> ${fullname} </span></div>
            <div class="detail"><strong>Email Address</strong> <span> ${profileData.data.user.email} </span></div>
            <div class="detail"><strong>Mobile Number</strong> <span> ${profileData.data.user.user_profile.phone_number} </span></div>
            <div class="detail"><strong>State</strong> <span> ${profileData.data.user.user_profile.state} </span></div>
            <div class="detail"><strong>City</strong> <span> ${profileData.data.user.user_profile.city} </span></div>`;

           companyProfileInfo = `
               <div class="detail"><strong>Company Name</strong> <span> ${profileData.data.company_name} </span></div>
               <div class="detail"><strong>Email Address</strong> <span> ${profileData.data.company_email} </span></div>
               <div class="detail"><strong>Phone Number</strong> <span> ${profileData.data.company_phone_number} </span></div>
               <div class="detail"><strong>Industry</strong> <span> ${profileData.data.industry} </span></div>
               <div class="detail"><strong>Website</strong> <span> <a href="${profileData.data.company_website}" target="_blank">${profileData.data.company_website}</a> </span></div>`;
       }

          imgCard.insertAdjacentHTML('afterBegin', profileImg);
      //  imgCard.innerHTML = profileImg;
       if (userType === "individual") {
            detailsCard.insertAdjacentHTML('beforeend', individualProfileInfo);
       } else if (userType === "company") {
            detailsCard.insertAdjacentHTML('beforeend', personalProfileInfo);
            detailsCard2.insertAdjacentHTML('beforeend', companyProfileInfo);
       }

   } catch (error) {
       console.error('There has been a problem with your fetch operation:', error);
   }
};

// Get user type from local storage and fetch profile
const userType = localStorage.getItem("userType"); // "individual" or "company"
fetchUserProfile(userType);

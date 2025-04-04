console.log("hello")
const btnPost = document.getElementById("btn-post");

console.log("Button found:", btnPost); // Should not be null

async function postJob() {

   const jobTitle = document.getElementById("job-title");
   const level = document.querySelector('select[name="xpsLevel"]')
   const location = document.getElementById("location");
   const employmentType = document.querySelector('select[name="employment-type"]');
   const currency = document.querySelector('select[name="salary-period"]');
   const salary = document.getElementById("salary");
   const jobSummary = document.getElementById("job-summary");
   const jobResponsibilities = document.getElementById("responsibilities");
   const jobRequirements = document.getElementById("requirements");
   const jobQualification = document.getElementById("qualifications");

   const token = localStorage.getItem("token");
   console.log("token", token)
   try {
      // const user_id = localStorage.getItem("userId");
      // console.log(user_id);

      const formData = {
         title: jobTitle.value,
         experience_level: level.value,
         location: location.value,
         job_type: employmentType.value,
         salary_period: currency.value,
         salary_amount: Number(salary.value),
         job_summary: jobSummary.value,
         responsibilities: jobResponsibilities.value,
         requirements: jobRequirements.value,
         qualifications: jobQualification.value,
         required_skills: "PHP, Laravel, MySQL, Vue.js",

      };






      console.log("form data:", JSON.stringify(formData));

      const response = await fetch(`https://swifthaya.kodexng.com/api/v1/jobs`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
         },
         body: JSON.stringify(formData),
      });
      console.log(response);
      const jobData = await response.json();

      if (response.ok) {
         console.log("Job created successfully", jobData);
      } else {
         throw new Error("Failed to create job");
      }
   } catch (error) {
      console.error("Error during job post:", error);
   };

};


if (btnPost) {
   btnPost.addEventListener("click", () => {
      postJob();
      console.log("🚀 Post button clicked!");
   });
} 

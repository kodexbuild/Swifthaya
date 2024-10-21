// signup integration
// const api_url = "http://127.0.0.1:8000/api/v1/register";

const getUserInfo = async function() {
    try {
        const userSignup = await fetch(`http://127.0.0.1:8000/api/v1/register`);

        console.log("userSignup", userSignup);
        // if (!res.ok) throw new Error('Country not found');
    
        // const data = await res.json();
        // console.log(`Data for ${country}:`, data);
        // console.log("data", data);
    }
    catch (err) {
        console.log(err);
    }
};
getUserInfo();
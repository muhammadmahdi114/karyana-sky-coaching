const axios = require("axios");

async function createAdmin() {
    const name = "Mahdi";
    const password = "123456";
    const email = "mahdi@demo.com";

    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log("Please enter a valid email address");
            return;
        }

        const response = await axios.post("http://localhost:8000/register-admin", {
            name,
            email,
            password,
        });

        if (response.data.success) {
            const nameFromResponse = response.data.username;
            const imgFromResponse = response.data.userImage;
            console.log(`Super Admin created successfully: Name - ${nameFromResponse}, Image - ${imgFromResponse}`);
        } else {
            console.log(response.data.message);
        }
    } catch (error) {
        console.error("Error occurred while creating Super Admin:", error);
    }
}

createAdmin();
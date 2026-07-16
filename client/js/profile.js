const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
}

// Load Profile
async function loadProfile() {

    try {

        const response = await fetch("http://localhost:5000/api/auth/profile", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        if (response.ok) {

            document.getElementById("name").value = data.user.name;
            document.getElementById("email").value = data.user.email;
            document.getElementById("phone").value = data.user.phone;

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);
        alert("Server Error");

    }

}

loadProfile();


// Update Profile

const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();

    try {

        const response = await fetch("http://localhost:5000/api/auth/profile", {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify({
                name,
                phone
            })

        });

        const data = await response.json();

        if (response.ok) {

            alert("Profile Updated Successfully");

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Server Error");

    }

});
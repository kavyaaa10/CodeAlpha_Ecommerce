// ================= REGISTER =================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (!name || !email || !phone || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            const response = await fetch("http://localhost:5000/api/auth/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    password,
                    confirmPassword
                })

            });

            const data = await response.json();

            if (response.ok) {

                alert("Registration Successful");

                registerForm.reset();

                window.location.href = "login.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(error);

            alert("Server Error");

        }

    });

}


// ================= LOGIN =================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();

        const password = document.getElementById("loginPassword").value;

        if (!email || !password) {

            alert("Please fill all fields");

            return;

        }

        try {

            const response = await fetch("http://localhost:5000/api/auth/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await response.json();

            if (response.ok) {

                alert("Login Successful");

                localStorage.setItem("token", data.token);

                localStorage.setItem("user", JSON.stringify(data.user));

                window.location.href = "index.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(error);

            alert("Server Error");

        }

    });

}
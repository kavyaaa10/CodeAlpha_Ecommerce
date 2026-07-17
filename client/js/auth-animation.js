// ==============================
// Password Show / Hide
// ==============================

document.querySelectorAll(".togglePassword").forEach(btn => {

    btn.addEventListener("click", () => {

        const input = btn.previousElementSibling;
        const icon = btn.querySelector("i");

        if (input.type === "password") {

            input.type = "text";
            icon.classList.remove("bi-eye");
            icon.classList.add("bi-eye-slash");

        } else {

            input.type = "password";
            icon.classList.remove("bi-eye-slash");
            icon.classList.add("bi-eye");

        }

    });

});

// ==============================
// Mouse Glow
// ==============================

const card = document.querySelector(".glass-card");

document.addEventListener("mousemove", e => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background =
        `radial-gradient(circle at ${x}px ${y}px,
        rgba(255,255,255,.18),
        rgba(255,255,255,.08) 45%)`;

});

// ==============================
// Ripple Effect
// ==============================

document.querySelectorAll(".login-btn").forEach(button => {

    button.addEventListener("click", function(e){

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = this.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";
        ripple.style.top = (e.clientY - rect.top) + "px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },700);

    });

});


// ======================================
// PASSWORD STRENGTH
// ======================================

const password = document.getElementById("password");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.getElementById("strengthText");

if(password && strengthBar){

password.addEventListener("input",()=>{

let value=password.value;

let strength=0;

if(value.length>=8) strength++;

if(/[A-Z]/.test(value)) strength++;

if(/[0-9]/.test(value)) strength++;

if(/[!@#$%^&*(),.?":{}|<>]/.test(value)) strength++;

const widths=["0%","25%","50%","75%","100%"];
const colors=["#ef4444","#f97316","#eab308","#22c55e","#16a34a"];
const labels=[
"",
"Weak Password",
"Medium Password",
"Strong Password",
"Very Strong Password"
];

strengthBar.style.width=widths[strength];
strengthBar.style.background=colors[strength];
strengthText.innerText=labels[strength];

});

}

// ======================================
// PASSWORD MATCH
// ======================================

const confirmPassword=document.getElementById("confirmPassword");
const passwordMatch=document.getElementById("passwordMatch");

function checkPasswordMatch(){

if(!password || !confirmPassword || !passwordMatch) return;

if(confirmPassword.value===""){

passwordMatch.innerHTML="";
return;

}

if(password.value===confirmPassword.value){

passwordMatch.innerHTML="✔ Passwords match";
passwordMatch.className="match-success";

}else{

passwordMatch.innerHTML="✖ Passwords do not match";
passwordMatch.className="match-error";

}

}

if(password && confirmPassword){

password.addEventListener("input",checkPasswordMatch);
confirmPassword.addEventListener("input",checkPasswordMatch);

}
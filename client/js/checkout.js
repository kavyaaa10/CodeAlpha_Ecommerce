const token = localStorage.getItem("token");

const orderItems = document.getElementById("orderItems");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");

const placeOrderBtn = document.getElementById("placeOrderBtn");

let cartItems = [];
let totalPrice = 0;

// ===============================
// Load Cart
// ===============================

async function loadCheckout() {

    try {

        const response = await fetch("http://localhost:5000/api/cart", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        cartItems = data.cart || [];

        orderItems.innerHTML = "";

        totalPrice = 0;

        if (cartItems.length === 0) {

            orderItems.innerHTML = "<p>Your cart is empty.</p>";

            placeOrderBtn.disabled = true;

            return;
        }

        cartItems.forEach(item => {

            const product = item.product;

if (!product) return;

const qty = item.quantity;
const price = product.price;
            const itemTotal = price * qty;

            totalPrice += itemTotal;

            orderItems.innerHTML += `

                <div class="order-item">

                    <div class="order-info">

                      <span class="order-name">
    ${product.name}
    ${item.size ? `(${item.size})` : ""}
</span>

                        <span class="order-price">
                            ₹${price} × ${qty}
                        </span>

                    </div>

                    <strong>₹${itemTotal}</strong>

                </div>

            `;

        });

        subtotal.textContent = `₹${totalPrice}`;

        total.textContent = `₹${totalPrice}`;

    }

    catch (err) {

        console.log(err);

        alert("Unable to load checkout.");

    }

}

// ===============================
// Place Order
// ===============================

placeOrderBtn.addEventListener("click", async () => {

    const fullName = document.getElementById("fullName").value.trim();

    const mobile = document.getElementById("mobile").value.trim();

    const email = document.getElementById("email").value.trim();

    const address = document.getElementById("address").value.trim();

    const city = document.getElementById("city").value.trim();

    const state = document.getElementById("state").value.trim();

    const pincode = document.getElementById("pincode").value.trim();

    const paymentMethod =
        document.querySelector('input[name="payment"]:checked').value;

    if (
        !fullName ||
        !mobile ||
        !email ||
        !address ||
        !city ||
        !state ||
        !pincode
    ) {

        alert("Please fill all fields.");

        return;

    }

    const orderData = {

        shippingAddress: {

            fullName,

            mobile,

            email,

            address,

            city,

            state,

            pincode

        },

        paymentMethod,

        totalPrice

    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/orders",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(orderData)

            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message || "Order failed.");

            return;

        }

        alert("Order placed successfully!");

        if (response.ok) {
    window.location.href = "order-success.html";
}

    }

    catch (err) {

        console.log(err);

        alert("Something went wrong.");

    }

});

// ===============================

loadCheckout();
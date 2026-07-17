const cartContainer = document.getElementById("cartContainer");
const totalPrice = document.getElementById("totalPrice");
const totalItems = document.getElementById("totalItems");
const checkoutBtn = document.getElementById("checkoutBtn");

const token = localStorage.getItem("token");

async function loadCart() {

    try {

        const response = await fetch("http://localhost:5000/api/cart", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!data.success) {

            cartContainer.innerHTML = "<h2>Failed to load cart.</h2>";
            return;

        }

        if (data.cart.length === 0) {

            cartContainer.innerHTML = "<h2>Your cart is empty.</h2>";

            totalPrice.innerText = "0";
            totalItems.innerText = "0";

            return;

        }

        cartContainer.innerHTML = "";

        let total = 0;
        let itemCount = 0;

        data.cart.forEach(item => {

            const subtotal = item.product.price * item.quantity;

            total += subtotal;

            itemCount += item.quantity;

            cartContainer.innerHTML += `

            <div class="cart-card">

                <img src="${item.product.image}" alt="${item.product.name}">

                <div class="cart-info">

                    <h2>${item.product.name}</h2>

                    <p><b>Category:</b> ${item.product.category}</p>

                    <p><b>Price:</b> ₹${item.product.price}</p>

                    <p><b>Rating:</b> ⭐ ${item.product.rating}</p>

                    <h4>Select Size</h4>

                    <div class="size-buttons">

                        ${item.product.sizes.map(size => `

                            <button
                                class="size-btn ${item.size===size?"active":""}"
                                onclick="changeSize('${item._id}','${size}',${item.quantity})">

                                ${size}

                            </button>

                        `).join("")}

                    </div>

                    <div class="quantity-box">

                        <button
                            class="qty-btn"
                            onclick="updateQuantity('${item._id}',${item.quantity-1})">

                            -

                        </button>

                        <span class="qty">

                            ${item.quantity}

                        </span>

                        <button
                            class="qty-btn"
                            onclick="updateQuantity('${item._id}',${item.quantity+1})">

                            +

                        </button>

                    </div>

                    <p>

                        <b>Subtotal : ₹${subtotal}</b>

                    </p>

                    <button
                        class="remove-btn"
                        onclick="removeItem('${item._id}')">

                        Remove

                    </button>

                </div>

            </div>

            `;

        });

        totalPrice.innerText = total;

        totalItems.innerText = itemCount;

    }

    catch(error){

        console.log(error);

    }

}

// ===========================
// Update Quantity
// ===========================
async function updateQuantity(id, quantity) {

    if (quantity < 1) return;

    try {

        const response = await fetch(`http://localhost:5000/api/cart/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                quantity
            })

        });

        const data = await response.json();

        if (!data.success) {
            alert(data.message);
            return;
        }

        loadCart();

    } catch (error) {

        console.log(error);

    }

}

// ===========================
// Change Size
// ===========================
async function changeSize(id, size, quantity) {

    try {

        const response = await fetch(`http://localhost:5000/api/cart/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                quantity,
                size
            })

        });

        const data = await response.json();

        if (!data.success) {
            alert(data.message);
            return;
        }

        loadCart();

    } catch (error) {

        console.log(error);

    }

}

// ===========================
// Remove Item
// ===========================
async function removeItem(id) {

    if (!confirm("Remove this item from cart?")) return;

    try {

        const response = await fetch(`http://localhost:5000/api/cart/${id}`, {

            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        if (!data.success) {
            alert(data.message);
            return;
        }

        loadCart();

    } catch (error) {

        console.log(error);

    }

}

// ===========================
// Checkout
// ===========================
if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        window.location.href = "checkout.html";

    });

}

// ===========================
// Initial Load
// ===========================
loadCart();
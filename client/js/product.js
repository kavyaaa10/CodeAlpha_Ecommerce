const productDetails = document.getElementById("productDetails");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadProduct() {
    try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();

        const product = data.product;

        productDetails.innerHTML = `
            <div class="container">

                <div class="left">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <div class="right">

                    <h1>${product.name}</h1>

                    <h3>⭐ ${product.rating}</h3>

                    <div class="price">₹${product.price}</div>

                    <p>${product.description}</p>

                    <br>

                    <h4>Category : ${product.category}</h4>

                    <h4 class="stock">Stock : ${product.stock}</h4>

                    ${
                        product.sizes.length
                            ? `
                                <div class="size-section">

                                    <label><b>Select Size</b></label>

                                    <div class="size-buttons">

                                        ${product.sizes
                                            .map(
                                                size => `
                                                <button
                                                    type="button"
                                                    class="size-btn"
                                                    data-size="${size}">
                                                    ${size}
                                                </button>
                                            `
                                            )
                                            .join("")}

                                    </div>

                                </div>
                              `
                            : ""
                    }

                    <br>

                    <label><b>Quantity</b></label>

                    <input
                        id="quantityInput"
                        type="number"
                        value="1"
                        min="1"
                        max="${product.stock}"
                    >

                    <br><br>

                    <div class="buttons">

                        <button id="addToCartBtn" class="cart">
                            Add To Cart
                        </button>

                        <button id="buyNowBtn" class="buy">
                            Buy Now
                        </button>

                    </div>

                </div>

            </div>
        `;

        // ==========================
        // Size Selection
        // ==========================

        let selectedSize = "";

        const sizeButtons = document.querySelectorAll(".size-btn");

        sizeButtons.forEach(button => {

            button.addEventListener("click", () => {

                sizeButtons.forEach(btn =>
                    btn.classList.remove("active")
                );

                button.classList.add("active");

                selectedSize = button.dataset.size;

            });

        });

        // ==========================
        // Add To Cart
        // ==========================

        const addToCartBtn = document.getElementById("addToCartBtn");

        addToCartBtn.addEventListener("click", async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login first.");
                window.location.href = "login.html";
                return;
            }

            if (product.sizes.length && !selectedSize) {
                alert("Please select a size.");
                return;
            }

            const quantity = Number(
                document.getElementById("quantityInput").value
            );

            try {

                const response = await fetch(
                    "http://localhost:5000/api/cart",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },

                        body: JSON.stringify({
                            productId: product._id,
                            quantity,
                            size: selectedSize
                        })
                    }
                );

                const result = await response.json();

                if (result.success) {

                    alert("✅ Product added to cart successfully!");

                } else {

                    alert(result.message);

                }

            } catch (error) {

                console.error(error);

                alert("Something went wrong.");

            }

        });

        // ==========================
        // Buy Now
        // ==========================

        const buyNowBtn = document.getElementById("buyNowBtn");

        buyNowBtn.addEventListener("click", () => {

            if (product.sizes.length && !selectedSize) {
                alert("Please select a size.");
                return;
            }

            const quantity =
                document.getElementById("quantityInput").value;

            window.location.href =
                `checkout.html?id=${product._id}&quantity=${quantity}&size=${encodeURIComponent(selectedSize)}`;

        });

    } catch (error) {

        console.error(error);

        productDetails.innerHTML =
            "<h2>Failed to load product.</h2>";

    }
}

loadProduct();
const homeProductContainer = document.getElementById("homeProductContainer");

async function loadHomeProducts() {

    try {

        const response = await fetch("http://localhost:5000/api/products");

        const data = await response.json();

        homeProductContainer.innerHTML = "";

        data.products.slice(0, 4).forEach(product => {

            homeProductContainer.innerHTML += `

                <div class="product-card">

                    <div class="wishlist">
                        <i class="bi bi-heart"></i>
                    </div>

                    <span class="product-badge">
                        New
                    </span>

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                    <div class="product-content">

                        <h3>${product.name}</h3>

                        <p>${product.description}</p>

                        <div class="rating">

                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-half"></i>

                        </div>

                        <div class="price">

                            ₹${product.price}

                        </div>

                        <div class="product-actions">

                            <a
                                href="product.html?id=${product._id}"
                                style="flex:1;text-decoration:none;">

                                <button
                                    class="buy-btn w-100">

                                    View Product

                                </button>

                            </a>

                        </div>

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}

loadHomeProducts();
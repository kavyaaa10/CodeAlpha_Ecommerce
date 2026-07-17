const homeProductContainer = document.getElementById("homeProductContainer");

async function loadHomeProducts() {

    try {

        const response = await fetch("http://localhost:5000/api/products");

        const data = await response.json();

        homeProductContainer.innerHTML = "";

        // Show only first 4 products
        data.products.slice(0, 4).forEach(product => {

            homeProductContainer.innerHTML += `

                <div class="card">

                    <img src="${product.image}" alt="${product.name}">

                    <div class="card-body">

                        <h3>${product.name}</h3>

                        <p>${product.description}</p>

                        <div class="price">₹${product.price}</div>

                        <a href="product.html?id=${product._id}">
                            <button>View Product</button>
                        </a>

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}

loadHomeProducts();
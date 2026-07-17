const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");

const orderDetails = document.getElementById("orderDetails");

async function loadOrder() {

    try {

        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Order not found");
        }

        const order = await response.json();

        const statusClass = order.orderStatus.toLowerCase();

        const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

        let productsHTML = "";

        order.items.forEach(item => {

            productsHTML += `

                <div class="product">

                    <img
                        src="${item.product.image}"
                        alt="${item.product.name}"
                        class="product-image"
                    >

                    <div class="product-info">

                        <h3>${item.product.name}</h3>

                        <p><strong>Size:</strong> ${item.size || "N/A"}</p>

                        <p><strong>Quantity:</strong> ${item.quantity}</p>

                        <p><strong>Price:</strong> ₹${item.price}</p>

                    </div>

                </div>

            `;

        });

        orderDetails.innerHTML = `

            <div class="details-card">

                <h2>Order #${order._id}</h2>

                <p><strong>Order Date:</strong> ${orderDate}</p>

                <br>

                <span class="status ${statusClass}">
                    ${order.orderStatus}
                </span>

                <div class="section">

                    <h2>Shipping Address</h2>

                    <p>${order.shippingAddress.fullName}</p>

                    <p>${order.shippingAddress.mobile}</p>

                    <p>${order.shippingAddress.email}</p>

                    <p>${order.shippingAddress.address}</p>

                    <p>${order.shippingAddress.city}, ${order.shippingAddress.state}</p>

                    <p>${order.shippingAddress.pincode}</p>

                </div>

                <div class="section">

                    <h2>Payment Method</h2>

                    <p>${order.paymentMethod}</p>

                </div>

                <div class="section">

                    <h2>Products</h2>

                    ${productsHTML}

                </div>

                <div class="total">

                    Total : ₹${order.totalPrice}

                </div>

                <a href="myorders.html" class="back-btn">
                    ← Back to My Orders
                </a>

            </div>

        `;

    } catch (error) {

        console.error(error);

        orderDetails.innerHTML = `
            <h2>Unable to load order details.</h2>
        `;
    }

}

loadOrder();
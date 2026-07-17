const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const ordersContainer = document.getElementById("ordersContainer");

async function loadOrders() {
    try {
        const response = await fetch("http://localhost:5000/api/orders/myorders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to load orders");
        }

        const orders = await response.json();

        if (orders.length === 0) {
            ordersContainer.innerHTML = `
                <div class="empty">
                    <i class="fa-solid fa-box-open"></i>
                    <h2>No Orders Yet</h2>
                    <p>You haven't placed any orders.</p>

                    <a href="products.html">
                        Start Shopping
                    </a>
                </div>
            `;
            return;
        }

        ordersContainer.innerHTML = "";

        orders.forEach(order => {

            const orderDate = new Date(order.createdAt).toLocaleDateString();

            const statusClass = order.orderStatus.toLowerCase();

            let itemsHTML = "";

            order.items.forEach(item => {

                itemsHTML += `
                    <div class="item">

                        <div class="item-info">

                            <strong>${item.product.name}</strong>

                            <p>Size : ${item.size || "N/A"}</p>

                        </div>

                        <div>
                            Qty : ${item.quantity}
                        </div>

                        <div>
                            ₹${item.price}
                        </div>

                    </div>
                `;
            });

            ordersContainer.innerHTML += `

                <div class="order-card">

                    <div class="order-header">

                        <div>

                            <h3>Order #${order._id.slice(-6)}</h3>

                            <p>Date : ${orderDate}</p>

                        </div>

                        <div class="status ${statusClass}">
                            ${order.orderStatus}
                        </div>

                    </div>

                    <div class="order-items">

                        ${itemsHTML}

                    </div>

                    <div class="total">

                        Total : ₹${order.totalPrice}

                    </div>

                    <button
                        class="view-btn"
                        onclick="location.href='order-details.html?id=${order._id}'"
                    >
                        View Details
                    </button>

                </div>

            `;
        });

    } catch (error) {

        console.error(error);

        ordersContainer.innerHTML = `
            <div class="empty">
                <h2>Unable to load orders.</h2>
            </div>
        `;
    }
}

loadOrders();
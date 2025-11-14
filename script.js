let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ------------------ ADD TO CART -------------------
document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        cart.push({
            name: btn.dataset.name,
            price: parseFloat(btn.dataset.price)
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(btn.dataset.name + " added to cart!");
    });
});

function updateCartCount() {
    const count = document.getElementById("cart-count");
    if (count) count.textContent = cart.length;
}
updateCartCount();


// ------------------ CART PAGE ----------------------
const cartTable = document.querySelector("#cartTable tbody");

if (cartTable) {
    function loadCart() {
        cartTable.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;

            cartTable.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td><button class="remove-btn" data-index="${index}">X</button></td>
                </tr>
            `;
        });

        document.getElementById("total-price").textContent = total.toFixed(2);
    }

    loadCart();

    cartTable.addEventListener("click", e => {
        if (e.target.classList.contains("remove-btn")) {
            cart.splice(e.target.dataset.index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
            updateCartCount();
        }
    });
}

// ------------------ DARK MODE -----------------------
const toggle = document.getElementById("darkToggle");

if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });
}

// Checkout
async function checkout(total) {
    const res = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ total })
    });

    const data = await res.json();
    window.location.href = data.url;
}
document.getElementById("searchBtn").addEventListener("click", () => {
    const value = document.getElementById("searchBar").value.toLowerCase();
    
    document.querySelectorAll(".menu-item").forEach(item => {
        let name = item.querySelector("h3").textContent.toLowerCase();
        item.style.display = name.includes(value) ? "block" : "none";
    });
});

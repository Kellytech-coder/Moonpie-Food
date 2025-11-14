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

// Update cart count (works everywhere)
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
                    <td>$${item.price.toFixed(2)}</td>
                    <td><button class="remove-btn" data-index="${index}" style="padding:5px 10px;">X</button></td>
                </tr>
            `;
        });

        const totalBox = document.getElementById("total-price");
        if (totalBox) totalBox.textContent = total.toFixed(2);
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


// ------------------ SEARCH BAR (SAFE) -----------------------
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchBar");

if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
        const value = searchInput.value.toLowerCase();

        document.querySelectorAll(".menu-item").forEach(item => {
            let name = item.querySelector("h3").textContent.toLowerCase();
            item.style.display = name.includes(value) ? "block" : "none";
        });
    });
}


// ------------------ CHECKOUT -------------------------
async function checkout(total) {
    try {
        const res = await fetch("http://localhost:5000/api/payment", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ total })
        });

        const data = await res.json();
        if (data.url) window.location.href = data.url;

    } catch (error) {
        alert("Payment error. Make sure server is running.");
        console.error(error);
    }
}
// SELECT ELEMENTS
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginBtn = document.getElementById("loginBtn");
const rememberMe = document.getElementById("rememberMe");

// 🔵 Show / Hide Password
togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "👁️"; // icon when visible
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "⚪"; // icon when hidden
    }
});

// 🔵 Handle Login
loginBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    // SAMPLE: Accept any login for now
    alert("Login successful!");

    // SAVE LOGIN IF REMEMBER ME IS CHECKED
    if (rememberMe.checked) {
        localStorage.setItem("savedEmail", email);
    } else {
        localStorage.removeItem("savedEmail");
    }

    // 🔥 REDIRECT TO HOME PAGE AFTER SUCCESSFUL LOGIN
    window.location.href = "index.html"; 
});

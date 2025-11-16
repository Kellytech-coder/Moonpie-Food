// ================= CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart
document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        cart.push({
            name: btn.dataset.name,
            price: parseFloat(btn.dataset.price)
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${btn.dataset.name} added to cart!`);
    });
});

// Update cart count
function updateCartCount() {
    const count = document.getElementById("cart-count");
    if (count) count.textContent = cart.length;
}
updateCartCount();

// Cart page
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

// ================= DARK MODE =================
const toggle = document.getElementById("darkToggle");
if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });
}

// ================= SEARCH =================
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

// ================= CHECKOUT =================
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

// ================= LOGIN =================
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginBtn = document.getElementById("loginBtn");
const rememberMe = document.getElementById("rememberMe");

// Show / hide password
if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "👁️";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "⚪";
        }
    });
}

// Handle login
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === "" || password === "") {
            alert("Please fill in all fields.");
            return;
        }

        // Admin login
        if (email === "admin@gmail.com" && password === "123456") {
            localStorage.setItem("role", "admin");
            window.location.href = "admin/admin-dashboard.html";
            return;
        }

        // Normal login
        alert("Login successful!");
        if (rememberMe.checked) {
            localStorage.setItem("savedEmail", email);
        } else {
            localStorage.removeItem("savedEmail");
        }
        window.location.href = "index.html";
    });
}

// ================= SETTINGS DROPDOWN & HAMBURGER MENU =================
document.addEventListener("DOMContentLoaded", () => {
    const settingsButton = document.querySelector("li button");
    const settingsMenu = document.getElementById("settingsMenu");

    if (settingsButton && settingsMenu) {
        settingsButton.addEventListener("click", () => {
            settingsMenu.style.display =
                settingsMenu.style.display === "block" ? "none" : "block";
        });
    }

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    function checkScreen() {
        if (!menuToggle || !navLinks) return;
        if (window.innerWidth <= 768) {
            menuToggle.style.display = "block";
            navLinks.style.display = "none";
            navLinks.style.flexDirection = "column";
        } else {
            menuToggle.style.display = "none";
            navLinks.style.display = "flex";
            navLinks.style.flexDirection = "row";
        }
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.style.display =
                navLinks.style.display === "flex" ? "none" : "flex";
        });
    }

    window.addEventListener("resize", checkScreen);
    checkScreen();
});


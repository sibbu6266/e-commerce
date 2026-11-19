
const products = [
    {
        id: 1,
        name: "Air Pulse Sneakers",
        category: "Fashion",
        price: 3499,
        old: 4299,
        rating: 4.9,
        badge: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=85",
        desc: "A bold everyday sneaker with a cushioned sole, breathable upper and a pop of colour."
    },
    {
        id: 2,
        name: "Studio Wireless Headphones",
        category: "Tech",
        price: 5999,
        old: 7499,
        rating: 4.8,
        badge: "−20%",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=85",
        desc: "Immersive sound, soft over-ear cushions and a clean minimal silhouette."
    },
    {
        id: 3,
        name: "Everyday Smart Watch",
        category: "Tech",
        price: 4299,
        old: 5299,
        rating: 4.7,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=85",
        desc: "Track your day, keep your goals close and stay connected."
    },
    {
        id: 4,
        name: "Minimal Ceramic Vase",
        category: "Home",
        price: 1299,
        old: 1599,
        rating: 4.8,
        badge: "",
        image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=700&q=85",
        desc: "A sculptural ceramic accent that brings calm to your home."
    },
    {
        id: 5,
        name: "Classic Everyday Backpack",
        category: "Fashion",
        price: 2499,
        old: 2999,
        rating: 4.6,
        badge: "POPULAR",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=85",
        desc: "A versatile carry-all with smart storage and durable fabric."
    },
    {
        id: 6,
        name: "Glow Skincare Set",
        category: "Beauty",
        price: 1899,
        old: 2299,
        rating: 4.9,
        badge: "GLOW UP",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=85",
        desc: "A simple self-care ritual with thoughtfully selected skincare essentials."
    },
    {
        id: 7,
        name: "Analog Desk Clock",
        category: "Home",
        price: 999,
        old: 1299,
        rating: 4.5,
        badge: "",
        image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=700&q=85",
        desc: "A timeless desk companion with a quiet minimal design."
    },
    {
        id: 8,
        name: "Portable Bluetooth Speaker",
        category: "Tech",
        price: 2799,
        old: 3499,
        rating: 4.7,
        badge: "−20%",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700&q=85",
        desc: "Big sound in a compact package."
    },
    {
        id: 9,
        name: "Retro Sunglasses",
        category: "Fashion",
        price: 1499,
        old: 1899,
        rating: 4.6,
        badge: "TRENDING",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&q=85",
        desc: "A confident retro frame with UV-protective lenses."
    },
    {
        id: 10,
        name: "Soft Knit Throw",
        category: "Home",
        price: 2199,
        old: 2699,
        rating: 4.8,
        badge: "",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700&q=85",
        desc: "A cosy textured throw for slow mornings and movie nights."
    },
    {
        id: 11,
        name: "Compact Digital Camera",
        category: "Tech",
        price: 8999,
        old: 10499,
        rating: 4.7,
        badge: "JUST IN",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&q=85",
        desc: "Capture everyday details with a compact travel-friendly camera."
    },
    {
        id: 12,
        name: "Daily Hydration Bottle",
        category: "Beauty",
        price: 799,
        old: 999,
        rating: 4.5,
        badge: "",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&q=85",
        desc: "A reusable bottle with a clean and minimal silhouette."
    }
];

// SELECTORS

const $ = selector => document.querySelector(selector);

const money = amount =>
    "₹" + amount.toLocaleString("en-IN");

let cart = JSON.parse(
    localStorage.getItem("novaCart") || "[]"
);

let wishlist = JSON.parse(
    localStorage.getItem("novaWish") || "[]"
);

let activeCategory = "All";
let searchTerm = "";

const grid = $("#productGrid");
const toast = $("#toast");


// SAVE DATA

function save() {

    localStorage.setItem(
        "novaCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "novaWish",
        JSON.stringify(wishlist)
    );

}


// NOTIFICATION

function notify(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(notify.timer);

    notify.timer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2300);

}


// DISPLAY PRODUCTS

function renderProducts() {

    let list = products.filter(product => {

        const categoryMatch =
            activeCategory === "All" ||
            product.category === activeCategory;

        const searchMatch =
            `${product.name} ${product.category}`
                .toLowerCase()
                .includes(searchTerm);

        return categoryMatch && searchMatch;

    });

    const sort = $("#sortSelect").value;

    if (sort === "low") {

        list.sort((a, b) => a.price - b.price);

    }

    if (sort === "high") {

        list.sort((a, b) => b.price - a.price);

    }

    if (sort === "rating") {

        list.sort((a, b) => b.rating - a.rating);

    }

    grid.innerHTML = list.map((product, index) => `

        <article class="product-card"
            style="animation-delay:${index * 45}ms">

            <div class="product-photo">

                <img src="${product.image}"
                     alt="${product.name}"
                     loading="lazy">

                ${product.badge ? `
                    <span class="product-badge">
                        ${product.badge}
                    </span>
                ` : ""}

                <button
                    class="wish-btn ${wishlist.includes(product.id) ? "active" : ""}"
                    data-wish="${product.id}">

                    ${wishlist.includes(product.id) ? "♥" : "♡"}

                </button>

                <button class="quick-btn"
                    data-quick="${product.id}">

                    QUICK VIEW +

                </button>

            </div>

            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <h3 class="product-title">
                    ${product.name}
                </h3>

                <div class="product-bottom">

                    <div class="product-price">

                        ${money(product.price)}

                        <span class="old-price">
                            ${money(product.old)}
                        </span>

                    </div>

                    <span class="rating">
                        ★ ${product.rating}
                    </span>

                </div>

            </div>

        </article>

    `).join("");

    $("#emptyState").classList.toggle(
        "hidden",
        list.length !== 0
    );

    $("#wishCount").textContent = wishlist.length;

}


// CART DISPLAY

function renderCart() {

    const totalItems = cart.reduce(
        (sum, item) => sum + item.qty,
        0
    );

    $("#cartCount").textContent = totalItems;

    $("#drawerCount").textContent =
        `(${totalItems})`;

    $("#cartItems").innerHTML = cart.length

        ? cart.map(item => {

            const product = products.find(
                p => p.id === item.id
            );

            return `

                <div class="cart-row">

                    <img src="${product.image}"
                         alt="${product.name}">

                    <div>

                        <h4>${product.name}</h4>

                        <small>
                            ${money(product.price)}
                        </small>

                        <div class="qty">

                            <button
                                data-qty="${product.id}"
                                data-change="-1">
                                −
                            </button>

                            <span>${item.qty}</span>

                            <button
                                data-qty="${product.id}"
                                data-change="1">
                                +
                            </button>

                            <button
                                class="remove"
                                data-remove="${product.id}">
                                Remove
                            </button>

                        </div>

                    </div>

                    <strong>
                        ${money(product.price * item.qty)}
                    </strong>

                </div>

            `;

        }).join("")

        : `

            <div class="empty-state">

                <div>♡</div>

                <h3>Your bag is empty</h3>

                <p>Looks like you haven't added anything yet.</p>

            </div>

        `;

    const subtotal = cart.reduce((sum, item) => {

        const product = products.find(
            p => p.id === item.id
        );

        return sum + product.price * item.qty;

    }, 0);

    $("#subtotal").textContent = money(subtotal);

    save();

}


// ADD TO CART

function addToCart(id) {

    const found = cart.find(
        item => item.id === id
    );

    if (found) {

        found.qty++;

    } else {

        cart.push({
            id: id,
            qty: 1
        });

    }

    renderCart();

    notify("Added to your bag ✦");

}


// OPEN CART

function openCart() {

    $("#overlay").classList.add("show");

    $("#cartDrawer").classList.add("open");

    document.body.style.overflow = "hidden";

}


// CLOSE CART

function closeCart() {

    $("#overlay").classList.remove("show");

    $("#cartDrawer").classList.remove("open");

    document.body.style.overflow = "";

}


// QUICK VIEW

function openQuick(id) {

    const product = products.find(
        p => p.id === id
    );

    $("#quickContent").innerHTML = `

        <div class="quick-layout">

            <img src="${product.image}"
                 alt="${product.name}">

            <div>

                <div class="eyebrow dark">
                    <span></span>
                    ${product.category.toUpperCase()}
                    · ★ ${product.rating}
                </div>

                <h3>${product.name}</h3>

                <strong>
                    ${money(product.price)}
                    <span class="old-price">
                        ${money(product.old)}
                    </span>
                </strong>

                <p>${product.desc}</p>

                <button class="primary-btn" id="quickAdd">
                    Add to bag <span>↗</span>
                </button>

            </div>

        </div>

    `;

    $("#quickAdd").onclick = () => {

        addToCart(id);

        $("#modalBackdrop").classList.remove("show");

    };

    $("#modalBackdrop").classList.add("show");

}


// CATEGORY FILTER

$("#categoryTabs").addEventListener("click", event => {

    const button = event.target.closest("[data-category]");

    if (!button) return;

    activeCategory = button.dataset.category;

    document.querySelectorAll(
        "#categoryTabs button"
    ).forEach(item => {

        item.classList.toggle(
            "active",
            item === button
        );

    });

    renderProducts();

});


// GLOBAL CLICK EVENTS

document.addEventListener("click", event => {

    // WISHLIST

    const wish = event.target.closest("[data-wish]");

    if (wish) {

        const id = Number(wish.dataset.wish);

        if (wishlist.includes(id)) {

            wishlist = wishlist.filter(
                item => item !== id
            );

        } else {

            wishlist.push(id);

        }

        save();

        renderProducts();

        notify(
            wishlist.includes(id)
                ? "Saved to wishlist ♡"
                : "Removed from wishlist"
        );

    }


    // QUICK VIEW

    const quick = event.target.closest("[data-quick]");

    if (quick) {

        openQuick(Number(quick.dataset.quick));

    }


    // CHANGE QUANTITY

    const quantity = event.target.closest("[data-qty]");

    if (quantity) {

        const item = cart.find(
            x => x.id === Number(quantity.dataset.qty)
        );

        item.qty += Number(quantity.dataset.change);

        if (item.qty <= 0) {

            cart = cart.filter(
                x => x.id !== item.id
            );

        }

        renderCart();

    }


    // REMOVE ITEM

    const remove = event.target.closest("[data-remove]");

    if (remove) {

        cart = cart.filter(
            item => item.id !== Number(remove.dataset.remove)
        );

        renderCart();

        notify("Item removed");

    }

});


// SORTING

$("#sortSelect").addEventListener(
    "change",
    renderProducts
);


// CART BUTTONS

$("#cartOpen").onclick = openCart;

$("#cartClose").onclick = closeCart;

$("#overlay").onclick = closeCart;


// CLOSE QUICK VIEW

$("#modalClose").onclick = () => {

    $("#modalBackdrop").classList.remove("show");

};

$("#modalBackdrop").addEventListener("click", event => {

    if (event.target.id === "modalBackdrop") {

        $("#modalBackdrop").classList.remove("show");

    }

});


// SEARCH

$(".search-toggle").onclick = () => {

    $("#searchPanel").classList.add("show");

    $("#searchInput").focus();

};

$("#closeSearch").onclick = () => {

    $("#searchPanel").classList.remove("show");

    $("#searchInput").value = "";

    searchTerm = "";

    renderProducts();

};

$("#searchInput").addEventListener("input", event => {

    searchTerm = event.target.value.toLowerCase().trim();

    renderProducts();

});


// WISHLIST PAGE VIEW

$("#wishlistTop").onclick = () => {

    activeCategory = "All";

    searchTerm = "";

    $("#searchInput").value = "";

    $("#categoryTabs").querySelectorAll("button").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.category === "All"
        );

    });

    const savedProducts = products.filter(
        product => wishlist.includes(product.id)
    );

    grid.innerHTML = savedProducts.map(product => `

        <article class="product-card">

            <div class="product-photo">

                <img src="${product.image}"
                     alt="${product.name}">

                <button class="wish-btn active"
                    data-wish="${product.id}">
                    ♥
                </button>

                <button class="quick-btn"
                    data-quick="${product.id}">
                    QUICK VIEW +
                </button>

            </div>

            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <h3 class="product-title">
                    ${product.name}
                </h3>

                <div class="product-price">
                    ${money(product.price)}
                </div>

            </div>

        </article>

    `).join("");

    $("#emptyState").classList.toggle(
        "hidden",
        wishlist.length > 0
    );

    $("#shop").scrollIntoView({
        behavior: "smooth"
    });

};


// RESET FILTERS

$("#resetFilters").onclick = () => {

    activeCategory = "All";

    searchTerm = "";

    $("#searchInput").value = "";

    $("#categoryTabs").querySelectorAll("button").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.category === "All"
        );

    });

    renderProducts();

};


// HEADER CATEGORY LINKS

document.querySelectorAll("[data-category-link]").forEach(link => {

    link.addEventListener("click", () => {

        activeCategory = link.dataset.categoryLink;

        $("#categoryTabs").querySelectorAll("button").forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.category === activeCategory
            );

        });

        renderProducts();

    });

});


// COUPON COPY

$("#couponCopy").onclick = async () => {

    try {

        await navigator.clipboard.writeText("NOVA10");

        notify("Coupon NOVA10 copied ✦");

    } catch {

        notify("Use coupon code NOVA10");

    }

};


// NEWSLETTER

$("#newsletterForm").addEventListener("submit", event => {

    event.preventDefault();

    notify("Thanks for joining the Nova note ✦");

    event.target.reset();

});


// CHECKOUT DEMO

$("#checkoutBtn").onclick = () => {

    if (!cart.length) {

        notify("Your bag is empty");

        return;

    }

    alert(
        "Demo checkout: your cart is ready! Connect a backend and payment gateway to accept real orders."
    );

};


// MOBILE MENU

$("#menuToggle").onclick = () => {

    const nav = $(".desktop-nav");

    const isOpen = nav.style.display === "flex";

    nav.style.cssText = isOpen

        ? ""

        : `
            display:flex;
            position:absolute;
            top:66px;
            left:0;
            right:0;
            padding:22px;
            background:#f8f8f5;
            flex-direction:column;
            gap:20px;
            border-bottom:1px solid #ddd;
        `;

};


// INITIALIZE WEBSITE

renderProducts();

renderCart();

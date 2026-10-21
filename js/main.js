/* =========================================================
   OnnFitzz | Main script
   ========================================================= */

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const formatPrice = (n) => `${SITE.currency} ${n.toLocaleString("en-US")}`;
const waLink = (number, message = "") =>
  `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

const ICON = {
  instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.6V4.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.6V14h2.7v8z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-1.4-.7-2.4-1.5-3.2-2.9-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 1.9 3 4.7 4.1 2.3.9 2.8.7 3.3.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.5-.3z"/></svg>`
};

const NAV_LINKS = [
  { key: "home", label: "Home", href: "index.html" },
  { key: "shop", label: "Shop", href: "index.html#shop" },
  { key: "about", label: "About", href: "about.html" },
  { key: "contact", label: "Contact", href: "contact.html" }
];

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ---------- Loader (plays once per browser session) ---------- */
function injectLoader() {
  let seen = false;
  try { seen = sessionStorage.getItem("onn_intro") === "1"; } catch { /* ignore */ }

  const letters = "ONNFITZZ".split("").map((ch, i) =>
    `<span style="animation-delay:${(0.55 + i * 0.07).toFixed(2)}s">${ch}</span>`).join("");

  const loader = document.createElement("div");
  loader.id = "loader";
  if (seen) loader.classList.add("skip");
  loader.innerHTML = `
    <div class="loader-inner">
      <div class="loader-stage">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <circle class="track" cx="100" cy="100" r="99"></circle>
          <circle class="ring" cx="100" cy="100" r="99"></circle>
        </svg>
        <img class="loader-logo" src="images/logo.png" alt="">
      </div>
      <div class="loader-word">${letters}</div>
      <div class="loader-bar"><span></span></div>
    </div>`;
  document.body.prepend(loader);

  if (!seen) {
    try { sessionStorage.setItem("onn_intro", "1"); } catch { /* ignore */ }
    const hide = () => setTimeout(() => {
      loader.classList.add("done");
      setTimeout(() => loader.remove(), 800);
    }, 2000);
    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide);
  } else {
    loader.remove();
  }
}

/* ---------- Page transition curtain ---------- */
function initTransitions() {
  const curtain = document.createElement("div");
  curtain.id = "curtain";
  document.body.appendChild(curtain);

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (!href || href.startsWith("#") || link.target === "_blank" || /^(mailto|tel|https?:)/.test(href)) return;

    const target = new URL(link.href);
    if (target.pathname === window.location.pathname) return; // same page, normal behavior

    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(() => (window.location.href = link.href), 480);
  });

  window.addEventListener("pageshow", (e) => {
    if (e.persisted) document.body.classList.remove("leaving");
  });
}

/* ---------- Shared header and footer ---------- */
function socialRow() {
  return `
    <div class="social-row">
      <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="OnnFitzz on Instagram">${ICON.instagram}</a>
      <a href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="OnnFitzz on Facebook">${ICON.facebook}</a>
      <a href="${waLink(SITE.founders[0].whatsapp)}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${ICON.whatsapp}</a>
    </div>`;
}

function renderHeader() {
  const el = $("#site-header");
  if (!el) return;
  const page = document.body.dataset.page;
  el.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark navbar-onn sticky-top">
      <div class="container">
        <a class="navbar-brand" href="index.html"><img src="images/logo.png" alt="OnnFitzz logo"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle menu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav ms-auto align-items-lg-center">
            ${NAV_LINKS.map((n) => `
              <li class="nav-item">
                <a class="nav-link ${n.key === page ? "active" : ""}" href="${n.href}">${n.label}</a>
              </li>`).join("")}
          </ul>
        </div>
      </div>
    </nav>`;

  const nav = $(".navbar-onn", el);
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function renderFooter() {
  const el = $("#site-footer");
  if (!el) return;
  el.innerHTML = `
    <footer class="footer-onn">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4">
            <img class="f-logo" src="images/logo.png" alt="OnnFitzz logo">
            <p class="mt-3 mb-0">${SITE.tagline}<br>Premium t-shirts and street wear for men.</p>
            ${socialRow()}
          </div>
          <div class="col-6 col-lg-2">
            <h5>Explore</h5>
            <a href="index.html">Home</a>
            <a href="index.html#shop">Shop</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
          </div>
          <div class="col-6 col-lg-2">
            <h5>Collection</h5>
            <a href="index.html#shop">T-Shirts</a>
            <a href="index.html#shop">Street Wear</a>
          </div>
          <div class="col-lg-4">
            <h5>Chat with us on WhatsApp</h5>
            ${SITE.founders.map((f) => `
              <a href="${waLink(f.whatsapp)}" target="_blank" rel="noopener">${f.name}: ${f.display}</a>`).join("")}
          </div>
        </div>
        <div class="bottom">
          <span>&copy; <span class="year"></span> OnnFitzz. All rights reserved.</span>
          <span>${SITE.tagline}</span>
        </div>
      </div>
    </footer>`;
  $$(".year").forEach((y) => (y.textContent = new Date().getFullYear()));
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  items.forEach((el) => io.observe(el));
}

/* ---------- Home: product grid and filters ---------- */
function renderProductGrid(filter = "all") {
  const grid = $("#product-grid");
  if (!grid) return;

  const list = PRODUCTS.filter((p) => filter === "all" || p.category === filter);
  grid.innerHTML = list.map((p, i) => `
    <div class="col-6 col-lg-3">
      <a class="product-card" href="product.html?id=${p.id}" style="animation-delay:${i * 0.08}s" aria-label="View ${p.name}">
        <div class="thumb">
          <div class="placeholder">${p.name}</div>
          <img src="${p.colors[0].image}" alt="${p.name} in ${p.colors[0].name}" loading="lazy" onerror="this.remove()">
          ${p.badge ? `<span class="tag">${p.badge}</span>` : ""}
          <span class="view">View product</span>
        </div>
        <div class="info">
          <div class="cat">${p.categoryLabel}</div>
          <h3>${p.name}</h3>
          <div class="price">${formatPrice(p.price)}</div>
          <div class="swatches">
            ${p.colors.map((c) => `<span class="swatch-dot" title="${c.name}" style="background:${c.hex}"></span>`).join("")}
          </div>
        </div>
      </a>
    </div>`).join("");
}

function initFilters() {
  const buttons = $$(".filter-btn");
  if (!buttons.length) return;
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      renderProductGrid(btn.dataset.filter);
    });
  });
}

/* ---------- Founders (About page) ---------- */
function renderFounders() {
  const el = $("#founders-grid");
  if (!el) return;
  el.innerHTML = SITE.founders.map((f, i) => `
    <div class="col-md-6 reveal reveal-delay-${i + 1}">
      <article class="founder-card">
        <div class="founder-avatar">${f.initials}</div>
        <h3>${f.name}</h3>
        <div class="role">${f.role}</div>
        <p>${f.bio}</p>
        <div class="founder-links">
          <a href="${waLink(f.whatsapp)}" target="_blank" rel="noopener">${ICON.whatsapp} ${f.display}</a>
          <a href="${SITE.instagram}" target="_blank" rel="noopener">${ICON.instagram} Instagram</a>
          <a href="${SITE.facebook}" target="_blank" rel="noopener">${ICON.facebook} Facebook</a>
        </div>
      </article>
    </div>`).join("");
}

/* ---------- Product details ---------- */
function initProductPage() {
  const root = $("#product-root");
  if (!root) return;

  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    root.innerHTML = `
      <div class="text-center py-5">
        <h1 class="h3">Product not found</h1>
        <p class="text-muted mt-2">This product may no longer be available.</p>
        <a class="btn btn-onn mt-3" href="index.html#shop">Back to shop</a>
      </div>`;
    return;
  }

  document.title = `${product.name} | OnnFitzz`;
  const ALL_SIZES = ["S", "M", "L", "XL", "XXL"];
  let selectedColor = product.colors[0];
  let selectedSize = null;
  let qty = 1;

  root.innerHTML = `
    <div class="crumbs"><a href="index.html">Home</a> &nbsp;/&nbsp; <a href="index.html#shop">Shop</a> &nbsp;/&nbsp; ${product.name}</div>
    <div class="row g-5 align-items-start">
      <div class="col-md-6 reveal">
        <div class="gallery">
          ${product.colors.map((c, i) => `
            <div class="shot ${i === 0 ? "show" : ""}" data-color="${c.name}">
              <div class="placeholder">${c.name}</div>
              <img src="${c.image}" alt="${product.name} in ${c.name}" onerror="this.remove()">
            </div>`).join("")}
          <span class="color-label" id="color-label">${selectedColor.name}</span>
        </div>
      </div>

      <div class="col-md-6 details-info reveal reveal-delay-1">
        <div class="cat-line">${product.categoryLabel}</div>
        <h1>${product.name}</h1>
        <div class="price-big" id="price">${formatPrice(product.price)}</div>
        <p class="desc">${product.description}</p>

        <div class="opt-title">Color: <span id="color-name">${selectedColor.name}</span></div>
        <div>
          ${product.colors.map((c, i) => `
            <button class="color-swatch ${i === 0 ? "active" : ""}" style="background:${c.hex}"
              data-index="${i}" aria-label="${c.name}" title="${c.name}"></button>`).join("")}
        </div>

        <div class="opt-title">Size <span id="size-note">Select a size</span></div>
        <div>
          ${ALL_SIZES.map((s) => {
            const available = product.sizes.includes(s);
            return `<button class="size-btn" data-size="${s}" ${available ? "" : "disabled"}
              aria-label="Size ${s}${available ? "" : " (unavailable)"}">${s}</button>`;
          }).join("")}
        </div>

        <div class="opt-title">Quantity</div>
        <div class="d-flex align-items-center gap-3">
          <div class="qty-box" style="display:inline-flex;border:1.5px solid var(--green-700);border-radius:8px;overflow:hidden;">
            <button id="qty-minus" aria-label="Decrease quantity" style="border:0;background:#fff;width:42px;height:44px;font-size:1.2rem;color:var(--green-700);">&minus;</button>
            <input id="qty" type="text" value="1" readonly aria-label="Quantity" style="width:52px;text-align:center;border:0;font-family:Montserrat;font-weight:600;">
            <button id="qty-plus" aria-label="Increase quantity" style="border:0;background:#fff;width:42px;height:44px;font-size:1.2rem;color:var(--green-700);">+</button>
          </div>
          <span class="text-muted small">Total: <strong id="total" style="color:var(--green-900)">${formatPrice(product.price)}</strong></span>
        </div>

        <div class="order-actions">
          <button class="btn-wa-order order-btn" data-number="${SITE.founders[1].whatsapp}">
            ${ICON.whatsapp} Order on WhatsApp
          </button>
          <p class="order-note">Select a size first. Your order details will be filled in automatically.</p>
        </div>

        <ul class="spec-list">
          <li><span>Fabric</span><span>${product.fabric}</span></li>
          <li><span>Fit</span><span>${product.fit}</span></li>
          <li><span>Available sizes</span><span>${product.sizes.join(", ")}</span></li>
          <li><span>Category</span><span>${product.categoryLabel}</span></li>
        </ul>
      </div>
    </div>`;

  // Color switch with crossfade
  $$(".color-swatch").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedColor = product.colors[Number(btn.dataset.index)];
      $$(".color-swatch").forEach((b) => b.classList.toggle("active", b === btn));
      $("#color-name").textContent = selectedColor.name;
      $("#color-label").textContent = selectedColor.name;
      $$(".gallery .shot").forEach((s) => s.classList.toggle("show", s.dataset.color === selectedColor.name));
    });
  });

  // Size select
  $$(".size-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      selectedSize = btn.dataset.size;
      $$(".size-btn").forEach((b) => b.classList.toggle("active", b === btn));
      $("#size-note").textContent = `Selected: ${selectedSize}`;
    });
  });

  // Quantity
  const qtyInput = $("#qty");
  const updateTotal = () => ($("#total").textContent = formatPrice(product.price * qty));
  $("#qty-minus").addEventListener("click", () => { qty = Math.max(1, qty - 1); qtyInput.value = qty; updateTotal(); });
  $("#qty-plus").addEventListener("click", () => { qty = Math.min(10, qty + 1); qtyInput.value = qty; updateTotal(); });

  // Order via WhatsApp
  $$(".order-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!selectedSize) return showToast("Please select a size first");
      const founder = SITE.founders.find((f) => f.whatsapp === btn.dataset.number);
      const message = [
        `Hello ${founder.name.split(" ")[0]}, I would like to order from OnnFitzz:`,
        "",
        `Product: ${product.name}`,
        `Color: ${selectedColor.name}`,
        `Size: ${selectedSize}`,
        `Quantity: ${qty}`,
        `Total: ${formatPrice(product.price * qty)}`,
        "",
        "Please share the next steps. Thank you!"
      ].join("\n");
      window.open(waLink(btn.dataset.number, message), "_blank", "noopener");
    });
  });
}

/* ---------- Contact people ---------- */
function renderContactPeople() {
  const el = $("#contact-people");
  if (!el) return;
  el.innerHTML = SITE.founders.map((f) => `
    <div class="contact-person">
      <div class="name">${f.name} <span style="color:var(--sand);font-weight:400;font-size:.85rem;">&middot; ${f.role}</span></div>
      <a class="num" href="tel:+${f.whatsapp}">${f.display}</a>
      <a class="btn btn-wa" href="${waLink(f.whatsapp)}" target="_blank" rel="noopener">${ICON.whatsapp} Chat on WhatsApp</a>
    </div>`).join("");

  const sel = $("#recipient");
  if (sel) {
    sel.innerHTML = `<option value="">Choose who to message</option>` +
      SITE.founders.map((f) => `<option value="${f.whatsapp}">${f.name}</option>`).join("");
  }

  const social = $("#contact-social");
  if (social) social.innerHTML = socialRow();
}

/* ---------- Contact form: sends the message to WhatsApp ---------- */
function initContactForm() {
  const form = $("#contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const data = new FormData(form);
    const recipient = SITE.founders.find((f) => f.whatsapp === data.get("recipient"));
    const message = [
      `Hello ${recipient.name.split(" ")[0]}, I have a message from the OnnFitzz website.`,
      "",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Topic: ${data.get("topic")}`,
      "",
      `${data.get("message")}`
    ].join("\n");

    window.open(waLink(recipient.whatsapp, message), "_blank", "noopener");
    form.reset();
    form.classList.remove("was-validated");
    showToast("Opening WhatsApp with your message");
  });
}

/* ---------- Floating WhatsApp circle (home page only) ---------- */
function renderFloatingWhatsApp() {
  if (document.body.dataset.page !== "home") return;
  const a = document.createElement("a");
  a.className = "wa-float";
  a.href = waLink(SITE.founders[0].whatsapp, "Hello OnnFitzz, I have a question about your collection.");
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label", "Chat with OnnFitzz on WhatsApp");
  a.innerHTML = ICON.whatsapp;
  document.body.appendChild(a);
}

/* ---------- Init ---------- */
injectLoader();

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderFloatingWhatsApp();
  renderProductGrid();
  initFilters();
  renderFounders();
  initProductPage();
  renderContactPeople();
  initContactForm();
  initTransitions();
  initReveal();
});

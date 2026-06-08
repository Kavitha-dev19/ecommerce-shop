// Product Data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High quality sound with noise cancellation",
    price: 2999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Track fitness and stay connected",
    price: 4999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
  },
  {
    id: 3,
    name: "Cotton T-Shirt",
    description: "Comfortable everyday wear",
    price: 599,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
  },
  {
    id: 4,
    name: "Denim Jacket",
    description: "Stylish jacket for all seasons",
    price: 1499,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400"
  },
  {
    id: 5,
    name: "Java Programming Book",
    description: "Complete guide to Java programming",
    price: 799,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"
  },
  {
    id: 6,
    name: "Web Development Book",
    description: "Learn HTML, CSS and JavaScript",
    price: 699,
    category: "Books",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400"
  },
  {
    id: 7,
    name: "Organic Coffee",
    description: "Premium quality arabica coffee beans",
    price: 449,
    category: "Food",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400"
  },
  {
    id: 8,
    name: "Dark Chocolate",
    description: "Rich 70% dark chocolate bar",
    price: 199,
    category: "Food",
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400"
  }
];

// Cart
let cart = JSON.parse(
  localStorage.getItem('cart')) || [];

// Display Products
function displayProducts(items) {
  const grid = document.getElementById(
    'products-grid');
  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = `
      <p style="text-align:center; 
      color:#666; grid-column:1/-1; 
      font-size:1.2rem;">
      No products found!</p>`;
    return;
  }

  items.forEach(product => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" 
             alt="${product.name}"
             onerror="this.src='https://via.placeholder.com/400x200'">
        <div class="product-info">
          <span class="category-tag">
            ${product.category}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p class="price">₹${product.price}</p>
          <button class="add-to-cart"
            onclick="addToCart(${product.id})">
            🛒 Add to Cart
          </button>
        </div>
      </div>`;
  });
}

// Filter by Category
function filterCategory(category) {
  const buttons = document.querySelectorAll(
    '.cat-btn');
  buttons.forEach(btn => 
    btn.classList.remove('active'));
  event.target.classList.add('active');

  if (category === 'all') {
    displayProducts(products);
  } else {
    const filtered = products.filter(
      p => p.category === category);
    displayProducts(filtered);
  }
}

// Search Products
function searchProducts() {
  const keyword = document.getElementById(
    'searchInput').value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword) ||
    p.description.toLowerCase()
    .includes(keyword)
  );
  displayProducts(filtered);
}

// Add to Cart
function addToCart(id) {
  const product = products.find(
    p => p.id === id);
  const existing = cart.find(
    p => p.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({...product, quantity: 1});
  }

  localStorage.setItem('cart', 
    JSON.stringify(cart));
  updateCartCount();

  alert(`✅ ${product.name} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
  const total = cart.reduce(
    (sum, item) => sum + item.quantity, 0);
  document.getElementById(
    'cart-count').textContent = total;
}

// Search on Enter key
document.getElementById('searchInput')
  .addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchProducts();
  });

// Initialize
displayProducts(products);
updateCartCount();

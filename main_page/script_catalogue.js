const emailField = document.querySelector('.Email input[name="email"]');
const hideEmailBtn = document.querySelector('.Email input[type="submit"]');

hideEmailBtn.addEventListener('click', function() {
  emailField.style.display = 'none';
  hideEmailBtn.style.display = 'none';
});

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');


// Отримуємо контейнер, в який будемо додавати продукти
const productsContainer = document.getElementById('products-list');
const productCountElement = document.getElementById('product-count');

// Завантажуємо JSON-файл зі списком продуктів
fetch('products.json')
  .then(response => response.json())
  .then(products => {
    // Фільтруємо продукти за заданою категорією
    const filteredProducts = products.filter(product => product.category === category);

    // Для кожного продукту в JSON-файлі створюємо HTML-блок
    filteredProducts.forEach(product => {
      const productElement = document.createElement('li');
      productElement.classList.add('product');
      productElement.setAttribute('data-id', product.id);
      productElement.innerHTML = `
        <img class="itemi" src="products/Alfabeto.png" alt="product" />
        <h3>${product.name}</h3>
        <div class="category">${product.subcategory} ${product.category}</div>
        <div class="price">${product.price}</div>
        <button class="buy_now">Buy now</button>
      `;

      // Додаємо HTML-блок до контейнера
      productsContainer.appendChild(productElement);
    });

    // Встановлюємо кількість продуктів з заданою категорією
    productCountElement.textContent = filteredProducts.length + " Products";
  })
  .catch(error => console.error(error));



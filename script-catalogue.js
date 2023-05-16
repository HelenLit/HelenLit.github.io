const emailField = document.querySelector('.Email input[name="email"]');
const hideEmailBtn = document.querySelector('.Email input[type="submit"]');

hideEmailBtn.addEventListener('click', function () {
  emailField.style.display = 'none';
  hideEmailBtn.style.display = 'none';
});


const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
const subcategory = urlParams.get('subcategory');
const min = urlParams.get('min');
const max = urlParams.get('max');

// Отримуємо контейнер, в який будемо додавати продукти
const productsContainer = document.getElementById('products-list');
const productCountElement = document.getElementById('product-count');

// Завантажуємо JSON-файл зі списком продуктів
fetch('products.json')
  .then(response => response.json())
  .then(products => {
    // Очищуємо контейнер від попереднього списку продуктів
    productsContainer.innerHTML = '';
    // Фільтруємо продукти за заданою категорією
    // Фільтруємо продукти за заданою категорією або виводимо всі продукти, якщо категорія не вказана
    // Фільтруємо продукти спочатку за категорією, а якщо категорія пуста, то за підкатегорією, якщо і підкатегорія пуста, то виводимо всі продукти
    const filteredProducts = category ? products.filter(product => product.category === category) : subcategory ? products.filter(product => product.subcategory === subcategory) : products;

    // Додаткова фільтрація за ціною
    const filteredByPrice = min && max ? filteredProducts.filter(product => product.price >= min && product.price <= max) : filteredProducts;

    filteredByPrice.forEach(product => {
      const productElement = document.createElement('li');
      productElement.classList.add('product');
      productElement.setAttribute('data-id', product.id);
      productElement.innerHTML = `
        <img class="itemi" src="${product.photo}" alt="product" />
        <h3>${product.name}</h3>
        <div class="category">${product.subcategory} ${product.category}</div>
        <div class="price">${product.price}</div>
        <button class="buy_now">Buy now</button>
      `;

      productsContainer.appendChild(productElement);
    });

    productCountElement.textContent = filteredByPrice.length + " Products";
  })
  .catch(error => console.error(error));


/* -------------------------------------------------------------------------------------------------- */



// Отримуємо посилання на елементи DOM
const searchButton = document.getElementById('search-name-button');

// Додаємо обробник події кліку на кнопку пошуку
searchButton.addEventListener('click', searchProducts);

function searchProducts() {
  const searchTerm = document.querySelector('.searchTerm').value.toLowerCase();
  const productsContainer = document.getElementById('products-list');
  const productCountElement = document.getElementById('product-count');

  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      productsContainer.innerHTML = '';
      const filteredProducts = products.filter(product => {
        const productName = product.name.toLowerCase();
        const productCategory = product.category.toLowerCase();
        const productSubcategory = product.subcategory.toLowerCase();

        return (
          productName.includes(searchTerm) ||
          productCategory.includes(searchTerm) ||
          productSubcategory.includes(searchTerm)
        );
      });

      filteredProducts.forEach(product => {
        const productElement = document.createElement('li');
        productElement.classList.add('product');
        productElement.setAttribute('data-id', product.id);
        productElement.innerHTML = `
            <img class="itemi" src="${product.photo}" alt="product" />
            <h3>${product.name}</h3>
            <div class="category">${product.subcategory} ${product.category}</div>
            <div class="price">${product.price}</div>
            <button class="buy_now">Buy now</button>
          `;

        productsContainer.appendChild(productElement);
      });

      productCountElement.textContent = filteredProducts.length + " Products";
    })
    .catch(error => console.error(error));
}

/* -------------------------------------------------------------------------------------------------- */

// Отримуємо посилання на елементи DOM
const priceLowHighCheckbox = document.getElementById('low-high');
const priceHighLowCheckbox = document.getElementById('high-low');

// Додаємо обробники подій кліку на чекбокси
priceLowHighCheckbox.addEventListener('click', sortProductsByPriceLowHigh);
priceHighLowCheckbox.addEventListener('click', sortProductsByPriceHighLow);

// Функція сортування продуктів за ціною (від найнижчої до найвищої)
function sortProductsByPriceLowHigh() {
  const productsContainer = document.getElementById('products-list');
  const productCountElement = document.getElementById('product-count');

  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      productsContainer.innerHTML = '';
      const sortedProducts = products.sort((a, b) => a.price - b.price);

      sortedProducts.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
      });

      productCountElement.textContent = sortedProducts.length + " Products";
    })
    .catch(error => console.error(error));
}

// Функція сортування продуктів за ціною (від найвищої до найнижчої)
function sortProductsByPriceHighLow() {
  const productsContainer = document.getElementById('products-list');
  const productCountElement = document.getElementById('product-count');

  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      productsContainer.innerHTML = '';
      const sortedProducts = products.sort((a, b) => b.price - a.price);

      sortedProducts.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
      });

      productCountElement.textContent = sortedProducts.length + " Products";
    })
    .catch(error => console.error(error));
}

// Функція створення елемента продукту
function createProductElement(product) {
  const productElement = document.createElement('li');
  productElement.classList.add('product');
  productElement.setAttribute('data-id', product.id);
  productElement.innerHTML = `
    <img class="itemi" src="${product.photo}" alt="product" />
    <h3>${product.name}</h3>
    <div class="category">${product.subcategory} ${product.category}</div>
    <div class="price">${product.price}</div>
    <button class="buy_now">Buy now</button>
  `;

  return productElement;
}



const lowHighCheckbox = document.getElementById('low-high');
const highLowCheckbox = document.getElementById('high-low');

lowHighCheckbox.addEventListener('change', function () {
  if (lowHighCheckbox.checked) {
    highLowCheckbox.checked = false;
  }
});

highLowCheckbox.addEventListener('change', function () {
  if (highLowCheckbox.checked) {
    lowHighCheckbox.checked = false;
  }
});


/* -------------------------------------------------------------------------------------------------- */


const aToZCheckbox = document.getElementById('a-z');
const zToACheckbox = document.getElementById('z-a');

aToZCheckbox.addEventListener('change', function () {
  if (aToZCheckbox.checked) {
    zToACheckbox.checked = false;
  }
});

zToACheckbox.addEventListener('change', function () {
  if (zToACheckbox.checked) {
    aToZCheckbox.checked = false;
  }
});



// Додаємо обробники подій кліку на чекбокси
aToZCheckbox.addEventListener('click', sortProductsByNameAtoZ);
zToACheckbox.addEventListener('click', sortProductsByNameZtoA);

// Функція сортування продуктів за назвою (від "A" до "Z")
function sortProductsByNameAtoZ() {
  const productsContainer = document.getElementById('products-list');
  const productCountElement = document.getElementById('product-count');

  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      productsContainer.innerHTML = '';
      const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));

      sortedProducts.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
      });

      productCountElement.textContent = sortedProducts.length + " Products";
    })
    .catch(error => console.error(error));
}

// Функція сортування продуктів за назвою (від "Z" до "A")
function sortProductsByNameZtoA() {
  const productsContainer = document.getElementById('products-list');
  const productCountElement = document.getElementById('product-count');

  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      productsContainer.innerHTML = '';
      const sortedProducts = products.sort((a, b) => b.name.localeCompare(a.name));

      sortedProducts.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
      });

      productCountElement.textContent = sortedProducts.length + " Products";
    })
    .catch(error => console.error(error));
}


/* -------------------------------------------------------------------------------------------------- */


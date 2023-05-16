const emailField = document.querySelector('.Email input[name="email"]');
const hideEmailBtn = document.querySelector('.Email input[type="submit"]');

hideEmailBtn.addEventListener('click', function () {
  emailField.style.display = 'none';
  hideEmailBtn.style.display = 'none';
});


/* -------------------------------------------------------------------------------------------------- */


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

/* // Функція сортування продуктів за ціною (від найнижчої до найвищої)
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
}*/


function sortProductsByPriceLowHigh() {
  const productsContainer = document.getElementById('products-list');
  const productCountElement = document.getElementById('product-count');

  const productElements = Array.from(productsContainer.getElementsByClassName('product'));
  const products = productElements.map(productElement => getProductData(productElement));

  const sortedProducts = products.sort((a, b) => a.price - b.price);

  productsContainer.innerHTML = '';
  sortedProducts.forEach(product => {
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
  });

  productCountElement.textContent = sortedProducts.length + " Products";
}

function sortProductsByPriceHighLow() {
  const productsContainer = document.getElementById('products-list');
  const productCountElement = document.getElementById('product-count');

  const productElements = Array.from(productsContainer.getElementsByClassName('product'));
  const products = productElements.map(productElement => getProductData(productElement));

  const sortedProducts = products.sort((a, b) => b.price - a.price);

  productsContainer.innerHTML = '';
  sortedProducts.forEach(product => {
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
  });

  productCountElement.textContent = sortedProducts.length + " Products";
}

function getProductData(productElement) {
  const productId = productElement.getAttribute('data-id');
  const productName = productElement.querySelector('h3').textContent;
  const productCategory = productElement.querySelector('.category').textContent;
  const productPrice = parseFloat(productElement.querySelector('.price').textContent);
  const productPhoto = productElement.querySelector('.itemi').getAttribute('src');

  return {
    id: productId,
    name: productName,
    category: productCategory,
    price: productPrice,
    photo: productPhoto
  };
}


// Функція створення елемента продукту
function createProductElement(product) {
  const productElement = document.createElement('li');
  productElement.classList.add('product');
  productElement.setAttribute('data-id', product.id);
  productElement.innerHTML = `
    <img class="itemi" src="${product.photo}" alt="product" />
    <h3>${product.name}</h3>
    <div class="category">${product.category}</div>
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

/*// Функція сортування продуктів за назвою (від "A" до "Z")
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
}*/

function sortProductsByNameAtoZ() {
  const productsContainer = document.getElementById('products-list');
  const productCountElement = document.getElementById('product-count');

  const productElements = Array.from(productsContainer.getElementsByClassName('product'));
  const products = productElements.map(productElement => getProductData(productElement));

  const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));

  productsContainer.innerHTML = '';
  sortedProducts.forEach(product => {
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
  });

  productCountElement.textContent = sortedProducts.length + " Products";
}

function sortProductsByNameZtoA() {
  const productsContainer = document.getElementById('products-list');
  const productCountElement = document.getElementById('product-count');

  const productElements = Array.from(productsContainer.getElementsByClassName('product'));
  const products = productElements.map(productElement => getProductData(productElement));

  const sortedProducts = products.sort((a, b) => b.name.localeCompare(a.name));

  productsContainer.innerHTML = '';
  sortedProducts.forEach(product => {
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
  });

  productCountElement.textContent = sortedProducts.length + " Products";
}


function getProductData(productElement) {
  const productId = productElement.getAttribute('data-id');
  const productName = productElement.querySelector('h3').textContent;
  const productCategory = productElement.querySelector('.category').textContent;
  const productSubcategory = productCategory.split(' ')[0];
  const productPrice = productElement.querySelector('.price').textContent;
  const productPhoto = productElement.querySelector('.itemi').getAttribute('src');

  return {
    id: productId,
    name: productName,
    category: productCategory,
    subcategory: productSubcategory,
    price: productPrice,
    photo: productPhoto
  };
}




/* -------------------------------------------------------------------------------------------------- */

function filterProducts() {
  const selectedCategories = [];

  const guitarsSelect = document.getElementById('select-guitars');
  const drumsSelect = document.getElementById('select-drums');
  const keyboardsSelect = document.getElementById('select-keyboards');

  if (guitarsSelect.value !== "") {
    selectedCategories.push(guitarsSelect.value);
  }
  if (drumsSelect.value !== "") {
    selectedCategories.push(drumsSelect.value);
  }
  if (keyboardsSelect.value !== "") {
    selectedCategories.push(keyboardsSelect.value);
  }

  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const filteredProducts = products.filter(product => {
        return selectedCategories.includes(product.subcategory);
      });

      // Виведення відфільтрованих продуктів
      renderProducts(filteredProducts);
    })
    .catch(error => console.error(error));
}

function renderProducts(products) {
  const productsContainer = document.getElementById('products-list');
  const productCountElement = document.getElementById('product-count');

  productsContainer.innerHTML = '';

  products.forEach(product => {
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

  productCountElement.textContent = products.length + " Products";
}

// Додати обробники подій для виклику функції filterProducts
const selectElements = document.querySelectorAll('select[name="select"]');
selectElements.forEach(select => {
  select.addEventListener('change', filterProducts);
});


/* -------------------------------------------------------------------------------------------------- */


// Отримуємо посилання на елементи DOM
const minPriceSlider = document.querySelector('.min-price');
const maxPriceSlider = document.querySelector('.max-price');
const minPriceInput = document.getElementById('Min');
const maxPriceInput = document.getElementById('Max');

// Додаємо обробники подій input до повзунків
minPriceSlider.addEventListener('input', updateMinPriceInput);
maxPriceSlider.addEventListener('input', updateMaxPriceInput);

// Функція оновлення значення текстового поля мінімальної ціни при зміні повзунка
function updateMinPriceInput() {
  minPriceInput.value = minPriceSlider.value + "$";
}

// Функція оновлення значення текстового поля максимальної ціни при зміні повзунка
function updateMaxPriceInput() {
  maxPriceInput.value = maxPriceSlider.value + "$";
}

// Додаємо обробники подій input до текстових полів
minPriceInput.addEventListener('input', updateMinPriceSlider);
maxPriceInput.addEventListener('input', updateMaxPriceSlider);

// Функція оновлення значення повзунка мінімальної ціни при зміні текстового поля
function updateMinPriceSlider() {
  const minPrice = parseInt(minPriceInput.value);
  if (!isNaN(minPrice)) {
    minPriceSlider.value = minPrice;
  }
}

// Функція оновлення значення повзунка максимальної ціни при зміні текстового поля
function updateMaxPriceSlider() {
  const maxPrice = parseInt(maxPriceInput.value);
  if (!isNaN(maxPrice)) {
    maxPriceSlider.value = maxPrice;
  }
}


/* -------------------------------------------------------------------------------------------------- */


const btn = document.getElementById("apply-filters-button");
btn.addEventListener('click', (event) => {
  let checkboxes = document.querySelectorAll('input[name="color"]:checked');
  let values = [];
  checkboxes.forEach((checkbox) => {
    values.push(checkbox.value);
  });

  const productsContainer = document.getElementById('products-list');
  productsContainer.innerHTML = ""; // Очистити контейнер перед виводом нових продуктів

  // Завантажуємо JSON-файл зі списком продуктів
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const filteredProducts = filterProductsByCategoryAndSubcategory(products, values);
      searchProductsByPrice(filteredProducts, productsContainer); // Викликаємо функцію для пошуку продуктів за ціною
    })
    .catch(error => console.error(error));
});

function filterProductsByCategoryAndSubcategory(products, values) {
  return products.filter(product => {
    let categoryMatch = false;
    let subcategoryMatch = false;

    // Перевіряємо збіг категорії продукту зі списком обраних категорій
    if (values.includes(product.category)) {
      categoryMatch = true;
    }

    // Перевіряємо збіг підкатегорії продукту зі списком обраних підкатегорій
    if (values.includes(product.subcategory)) {
      subcategoryMatch = true;
    }

    return categoryMatch || subcategoryMatch;
  });
}

function searchProductsByPrice(products, productsContainer) {
  const productCountElement = document.getElementById('product-count');
  const minPrice = parseInt(document.getElementById('Min').value);
  const maxPrice = parseInt(document.getElementById('Max').value);

  const filteredProducts = products.filter(product => {
    const productPrice = parseInt(product.price);
    return productPrice >= minPrice && productPrice <= maxPrice;
  });

  filteredProducts.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.setAttribute('data-id', product.id);
    productElement.innerHTML = `
    <img class="itemi" src="${product.photo}" alt="product" />
    <h3>${product.name}</h3>
    <div class="category">${product.subcategory} ${product.category}</div>
    <div class="price">${product.price}</div>
    <button class="buy_now">Buy now</button>
    `;

    // Додаємо HTML-блок до контейнера
    productsContainer.appendChild(productElement);
  });

  productCountElement.textContent = filteredProducts.length + " Products";
}




const resetButton = document.getElementById("reset-filters-button");
resetButton.addEventListener('click', (event) => {
  // Забираємо галочки зі списку
  const checkboxes = document.querySelectorAll('input[name="color"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
  });

  // Очищаємо значення ціни
  document.getElementById('Min').value = '';
  document.getElementById('Max').value = '';

  // Очищаємо контейнер з продуктами
  const productsContainer = document.getElementById('products-list');
  productsContainer.innerHTML = '';

  // Відновлюємо всі доступні товари
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.setAttribute('data-id', product.id);
        productElement.innerHTML = `
        <img class="itemi" src="${product.photo}" alt="product" />
        <h3>${product.name}</h3>
        <div class="category">${product.subcategory} ${product.category}</div>
        <div class="price">${product.price}</div>
        <button class="buy_now">Buy now</button>
        `;

        // Додаємо HTML-блок до контейнера
        productsContainer.appendChild(productElement);
      });
    })
    .catch(error => console.error(error));
});


/*

 чернетка

const btn = document.getElementById("apply-filters-button");
btn.addEventListener('click', (event) => {
  let checkboxes = document.querySelectorAll('input[name="color"]:checked');
  let values = [];
  checkboxes.forEach((checkbox) => {
    values.push(checkbox.value);
  });

  const productsContainer = document.getElementById('products-list');
  productsContainer.innerHTML = ""; // Очистити контейнер перед виводом нових продуктів

  // Завантажуємо JSON-файл зі списком продуктів
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      // Для кожного продукту в JSON-файлі перевіряємо, чи він відповідає обраним категоріям та підкатегоріям
      products.forEach(product => {
        let categoryMatch = false;
        let subcategoryMatch = false;

        // Перевіряємо збіг категорії продукту зі списком обраних категорій
        if (values.includes(product.category)) {
          categoryMatch = true;
        }

        // Перевіряємо збіг підкатегорії продукту зі списком обраних підкатегорій
        if (values.includes(product.subcategory)) {
          subcategoryMatch = true;
        }

        // Якщо знайдено збіг категорії або підкатегорії, виводимо продукт
        if (categoryMatch || subcategoryMatch) {
          const productElement = document.createElement('div');
          productElement.classList.add('product');
          productElement.setAttribute('data-id', product.id);
          productElement.innerHTML = `
            <h2>${product.name}</h2>
            <p class="category">Category: ${product.category}</p>
            <p>Subcategory: ${product.subcategory}</p>
            <p>Price: ${product.price}</p>
            <img src="${product.photo}" alt="photo${product.id}">
          `;

          // Додаємо HTML-блок до контейнера
          productsContainer.appendChild(productElement);
        }
      });
    })
    .catch(error => console.error(error));

});


function searchProductsByPrice() {
  const productsContainer = document.getElementById('products-list');
  const productCountElement = document.getElementById('product-count');
  const minPrice = parseInt(document.getElementById('Min').value);
  const maxPrice = parseInt(document.getElementById('Max').value);

  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      productsContainer.innerHTML = '';
      const filteredProducts = products.filter(product => {
        const productPrice = parseInt(product.price);
        return productPrice >= minPrice && productPrice <= maxPrice;
      });

      filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
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
const applyButton = document.getElementById('apply-filters-button');
//applyButton.addEventListener('click', searchProductsByPrice); */
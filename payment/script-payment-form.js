const emailField = document.querySelector('.Email input[name="email"]');
const hideEmailBtn = document.querySelector('.Email input[type="submit"]');

hideEmailBtn.addEventListener('click', function () {
  const email = emailField.value; // Отримуємо значення введеної електронної пошти
  
  // Перевіряємо, чи введено значення електронної пошти
  if (email) {
    emailField.style.display = 'none';
    hideEmailBtn.style.display = 'none';
    // Виводимо повідомлення з підтвердженням
  alert(`Вашу пошту (${email}) успішно записано. Дякуємо!`);
  } else {
    alert("Введіть пошту!");
  }
});



function getProductDetails(productId) {
    return fetch('products.json')
      .then(response => response.json())
      .then(products => {
        const parsedProductId = parseInt(productId, 10);
        const product = products.find(item => item.id === parsedProductId);
  
        if (product) {
          const productIdField = document.getElementById('product-id');
          const productCostField = document.getElementById('product-cost');
  
          productIdField.value = product.id;
          productCostField.value = product.price;
        } else {
          alert(`Product not found! ${parsedProductId}`);
        }
      })
      .catch(error => console.error(error));
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  
  getProductDetails(id);
  
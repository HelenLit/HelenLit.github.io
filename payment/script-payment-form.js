const emailField = document.querySelector('.Email input[name="email"]');
const hideEmailBtn = document.querySelector('.Email input[type="submit"]');

hideEmailBtn.addEventListener('click', function () {
    const email = emailField.value; // Отримуємо значення введеної електронної пошти

    // Перевіряємо, чи введено значення електронної пошти
    if (email) {
        emailField.style.display = 'none';
        hideEmailBtn.style.display = 'none';
        // Виводимо повідомлення з підтвердженням
        alert(`Your email (${email}) has been successfully recorded. Thank you!`);
    } else {
        alert("Please enter an email!");
    }
});



// ---------------------- PRODUCT INFO ----------------------



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



// ---------------------- CHECBOX DELIVERY METHOD ----------------------



const fedexCheckbox = document.getElementById('FedEx');
const dhlCheckbox = document.getElementById('DHL');

fedexCheckbox.addEventListener('change', function () {
    if (fedexCheckbox.checked) {
        dhlCheckbox.checked = false;
    }
});

dhlCheckbox.addEventListener('change', function () {
    if (dhlCheckbox.checked) {
        fedexCheckbox.checked = false;
    }
});



// ---------------------- CHECBOX PAY METHOD ----------------------



const paypalCheckbox = document.getElementById('PayPal');
const bitcoinCheckbox = document.getElementById('Bitcoin');

paypalCheckbox.addEventListener('change', function () {
    if (paypalCheckbox.checked) {
        bitcoinCheckbox.checked = false;
    }
});

bitcoinCheckbox.addEventListener('change', function () {
    if (bitcoinCheckbox.checked) {
        paypalCheckbox.checked = false;
    }
});



// ---------------------- SUBMIT BUTTON ----------------------



const submitButton = document.getElementById('submit-order');
const privacyCheckbox = document.getElementById('privacy');

submitButton.addEventListener('click', function(event) {
  if (!privacyCheckbox.checked) {
    event.preventDefault(); // Зупиняє відправку форми
    alert("You haven't agreed with our privacy policy! Check it and repeat submit.");
  } else {
    alert("Thank you for your order. Our manager will contact you soon!");
    window.open("about.html", "_blank");  /// Відкриває сторінку "about.html"
    window.close(); // Закриває поточну сторінку
  }
});


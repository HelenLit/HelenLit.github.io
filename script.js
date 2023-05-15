const emailField = document.querySelector('.Email input[name="email"]');
const hideEmailBtn = document.querySelector('.Email input[type="submit"]');

hideEmailBtn.addEventListener('click', function () {
  emailField.style.display = 'none';
  hideEmailBtn.style.display = 'none';
});

// Отримуємо посилання на елемент кнопки
var shopNowButton = document.getElementById('shop-now');

// Додаємо обробник події для кліку на кнопку
shopNowButton.addEventListener('click', function () {
  // Відкриваємо нове вікно з URL './main.html'
  window.open('./main.html', '_blank');
});

// Отримуємо посилання на елемент <div> за допомогою його ідентифікатора
var exploreNowGuitars = document.getElementById('explore-now-guitars');

// Додаємо обробник події для кліку на елемент <div>
exploreNowGuitars.addEventListener('click', function () {
  redirectToNewPage('guitar');
});

// Отримуємо посилання на елемент <div> за допомогою його ідентифікатора
var exploreNowDrums = document.getElementById('explore-now-drums');

// Додаємо обробник події для кліку на елемент <div>
exploreNowDrums.addEventListener('click', function() {
  redirectToNewPage('drums');
});

// Отримуємо посилання на елемент <div> за допомогою його ідентифікатора
var exploreNowKeyboards = document.getElementById('explore-now-keyboards');

// Додаємо обробник події для кліку на елемент <div>
exploreNowKeyboards.addEventListener('click', function() {
  redirectToNewPage('keyboards');
});

function redirectToNewPage(category) {
  //window.location.href = './main.html?category=' + category;
  // Переходимо на нову сторінку з використанням значення параметра
  var url = './main.html?category=' + category; // Приклад URL з параметром "category"
  window.open(url, '_blank');
}

// Отримуємо посилання на елемент <div> за допомогою його ідентифікатора
var exploreNowUkuleles = document.getElementById('explore-now-ukuleles');

// Додаємо обробник події для кліку на елемент <div>
exploreNowUkuleles.addEventListener('click', function() {
  redirectToNewPageSubCategory('ukulele');
});

// Отримуємо посилання на елемент <div> за допомогою його ідентифікатора
var exploreNowHandDrums = document.getElementById('explore-now-hand-drums');

// Додаємо обробник події для кліку на елемент <div>
exploreNowHandDrums.addEventListener('click', function() {
  redirectToNewPageSubCategory('hand');
});

function redirectToNewPageSubCategory(subcategory) {
  var url = './main.html?subcategory=' + subcategory;
  window.open(url, '_blank');
}

const shopNowButtonPrice = document.getElementById('shop-now-price');

shopNowButtonPrice.addEventListener('click', function() {
  redirectToNewPageWithRange(100, 10000);
});

function redirectToNewPageWithRange(min, max) {
  var url = './main.html?min=' + min + '&max=' + max;
  window.open(url, '_blank');
}
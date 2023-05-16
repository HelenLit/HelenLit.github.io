                  /* HIDE EMAIL FORM IN PAGE*/

const emailField = document.querySelector('.Email input[name="email"]');
const hideEmailBtn = document.querySelector('.Email input[type="submit"]');

hideEmailBtn.addEventListener('click', function () {
  emailField.style.display = 'none';
  hideEmailBtn.style.display = 'none';
});

/* -------------------------------------------------------------------------------- */



          /* REDIRECT TO CATALOGUE PAGE WITH NO FILTERS */

var shopNowButton = document.getElementById('shop-now');

shopNowButton.addEventListener('click', function () {
  window.open('./main.html', '_blank');
});

/* -------------------------------------------------------------------------------- */



    /* REDIRECT TO CATALOGUE PAGE WITH GUITAR CATEGORY FILTER */

var exploreNowGuitars = document.getElementById('explore-now-guitars');

exploreNowGuitars.addEventListener('click', function () {
  redirectToNewPage('guitar');
});

/* -------------------------------------------------------------------------------- */



    /* REDIRECT TO CATALOGUE PAGE WITH DRUMS CATEGORY FILTER */

var exploreNowDrums = document.getElementById('explore-now-drums');

exploreNowDrums.addEventListener('click', function() {
  redirectToNewPage('drums');
});

/* -------------------------------------------------------------------------------- */



    /* REDIRECT TO CATALOGUE PAGE WITH KEYBOARDS CATEGORY FILTER */

var exploreNowKeyboards = document.getElementById('explore-now-keyboards');

exploreNowKeyboards.addEventListener('click', function() {
  redirectToNewPage('keyboards');
});

/* -------------------------------------------------------------------------------- */



    /* REDIRECT TO CATALOGUE PAGE WITH UKULELE SUBCATEGORY FILTER */

var exploreNowUkuleles = document.getElementById('explore-now-ukuleles');

exploreNowUkuleles.addEventListener('click', function() {
  redirectToNewPageSubCategory('ukulele');
});

/* -------------------------------------------------------------------------------- */



    /* REDIRECT TO CATALOGUE PAGE WITH HAND SUBCATEGORY FILTER */

var exploreNowHandDrums = document.getElementById('explore-now-hand-drums');

exploreNowHandDrums.addEventListener('click', function() {
  redirectToNewPageSubCategory('hand');
});

/* -------------------------------------------------------------------------------- */



function redirectToNewPage(category) {
  //window.location.href = './main.html?category=' + category;
  // Переходимо на нову сторінку з використанням значення параметра
  var url = './main.html?category=' + category; // Приклад URL з параметром "category"
  window.open(url, '_blank');
}



function redirectToNewPageSubCategory(subcategory) {
  var url = './main.html?subcategory=' + subcategory;
  window.open(url, '_blank');
}

/* -------------------------------------------------------------------------------- */



    /* REDIRECT TO CATALOGUE PAGE WITH PRICE FILTER */

const shopNowButtonPrice = document.getElementById('shop-now-price');

shopNowButtonPrice.addEventListener('click', function() {
  redirectToNewPageWithRange(100, 10000);
});

function redirectToNewPageWithRange(min, max) {
  var url = './main.html?min=' + min + '&max=' + max;
  window.open(url, '_blank');
}
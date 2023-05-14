const emailField = document.querySelector('.Email input[name="email"]');
const hideEmailBtn = document.querySelector('.Email input[type="submit"]');

hideEmailBtn.addEventListener('click', function() {
  emailField.style.display = 'none';
  hideEmailBtn.style.display = 'none';
});



function redirectToNewPage(category) {
    window.location.href = './main.html?category=' + category;
  }



  // onclick="window.open('./main.html', '_blank');"
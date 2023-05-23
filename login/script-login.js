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




/*const submitButton = document.getElementById("submit-log-in");
submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Щоб запобігти перезавантаженню сторінки

  // Отримуємо значення введеного електронного адресу
  const emailInput = document.getElementById("user-email-login");
  const email = emailInput.value;

  // Очищаємо поля для вводу
  emailInput.value = '';
  document.getElementById("user-password-login").value = '';

  // Виводимо повідомлення з вітанням
  
});*/

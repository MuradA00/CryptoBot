document.querySelector(".enter-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const password = document.querySelector("input").value;

  document.cookie =`pass=${password}`;

  window.location.replace('/bot')
});



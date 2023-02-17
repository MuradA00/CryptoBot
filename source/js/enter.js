const instance = axios.create({
  headers: {
    password: localStorage.getItem("password-test")
  }
});

let newHTML = null;

// fetch(`http://52.29.157.23:3000/validtoken?token=${toket}`)
//   // .then()
//   .then((res) => {
//     if (res.status === 200) {
//       window.location.replace(`http://52.29.157.23:3000/bot?token=${toket}`);
//     }
//   });

document.querySelector(".enter-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const password = +document.querySelector("input").value;

  localStorage.setItem("password-test", password);

  // instance.get('http://52.29.157.23:3000/bot')


  window.location.replace(`http://52.29.157.23:3000/bot?pass=${localStorage.getItem("password-test")}`);

  // fetch(`http://52.29.157.23:3000/bot`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);

  //     localStorage.setItem('token-test', data.token)
  //   });
});

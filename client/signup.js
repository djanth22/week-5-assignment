const signUp = document.querySelector("#signup");
function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(loginform);
  const formValues = Object.fromEntries(formData);
  console.table(formValues);
}

signUp.addEventListener("submit", handleSubmit);

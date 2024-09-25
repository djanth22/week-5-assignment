// fetch("localhost:8080/add", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ formvalues }),
// });
import { markdown } from "markdown";
console.log(markdown.toHTML("Hello *World*!"));
function Editor(input, preview) {
  this.update = function () {
    preview.innerHTML = markdown.toHTML(input.value);
  };
  input.editor = this;
  this.update();
}
var $ = function (id) {
  return document.getElementById(id);
};
new Editor($("text-input"), $("preview"));

// const markdownTest = document.createElement("p");
// markdownTest.innerHTML = "Hello *World*!";
// document.body.appendChild(markdownTest);

const form = document.getElementById(`form-container`);
const toggle = document.getElementById(`hide-show`);
let display = true;

function reveal() {
  if (display == true) {
    form.style.display = "none";
    display = false;
    toggle.textContent = "show form";
  } else {
    form.style.display = "block";
    display = true;
    toggle.textContent = "hide form";
  }
}

toggle.addEventListener("click", reveal);

const loginform = document.querySelector("#login-form");
async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(loginform);
  const formValues = Object.fromEntries(formData);
  console.table(formValues);

  const msgRes = await fetch("http://localhost:8080/add", {
    method: "POST", // This is where we set the POST HTTP verb
    headers: {
      "Content-Type": "application/json", // This tells the server we're sending stringified JSON data
    },
    body: JSON.stringify({ formValues }),
  });
  const msg = await msgRes.json();

  const msgCheker = document.querySelector("#login_massage");

  if (msgCheker === null) {
    const h1 = document.createElement("h1");
    h1.id = "login_massage";
    h1.textContent = msg.massage;
    form.appendChild(h1);
  } else {
    msgCheker.textContent = msg.massage;
  }

  form.reset();
}
form.addEventListener("submit", handleSubmit);

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

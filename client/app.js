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

//Importing Markdown package
import { markdown } from "markdown";
//Function copied from package documentation
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
new Editor($("personalsummary"), $("preview"));
new Editor($("mainsection"), $("preview1"));
new Editor($("education"), $("preview2"));
new Editor($("socials"), $("preview3"));
new Editor($("skills"), $("preview4"));
new Editor($("projects"), $("preview5"));

//Reveal/Hide CV
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

//reveal/hide cheatsheet
const cs = document.querySelector(`.cheatsheet-content`);
const csButton = document.querySelector(`.cheatsheet-button`);
let csdisplay = false;

function cheatsheet() {
  if (csdisplay == true) {
    cs.style.display = "none";
    csdisplay = false;
    csButton.textContent = "show cheatsheet";
  } else {
    cs.style.display = "block";
    csdisplay = true;
    csButton.textContent = "hide cheatsheet";
  }
}

//Get the feedback data from the read-data endpoint (Hanifah)
async function getFeedback() {
  const response = await fetch("http://localhost:8080/read-data");
  // console.log(response);
  const feedback = await response.json();
  // console.log(upgrades);

  return feedback;
}
const loginform = document.querySelector("#login-form");
//Show the data collected from the database if the user exists  (Hanifah)
let email = undefined;
async function showData() {
  const cvData = await getFeedback();
  const userEmail = document.querySelector("#user-email");
  const firstName = document.querySelector("#first-name");
  const lastName = document.querySelector("#last-name");
  const personalsummary = document.querySelector("#personalsummary");
  const mainsection = document.querySelector("#mainsection");
  const education = document.querySelector("#education");
  const socials = document.querySelector("#socials");
  const skills = document.querySelector("#skills");
  const projects = document.querySelector("#projects");

  // const msgCheker = document.querySelector("#login_massage");

  // const email = "ayinkxafinowi@gmail.com";
  let index;
  for (let i = 0; i++; i < cvData.length) {
    console.log(cvData[i].useremail);
    if (cvData[i].useremail === email.your_name) {
      return (index = i);
    }
  }
  console.log(email.your_name);
  console.log(cvData[0].useremail);
  console.log(index);

  firstName.value = cvData[index].firstname;
  userEmail.value = cvData[index].useremail;
  lastName.value = cvData[index].lastname;
  personalsummary.value = cvData[index].personalsummary;
  mainsection.value = cvData[index].mainsection;
  education.value = cvData[index].education;
  socials.value = cvData[index].linkstosocials;
  skills.value = cvData[index].skills;
  projects.value = cvData[index].projects;
}
const cvForm = document.getElementById("cv-form");
//When you click submit on the cv-form
async function cvSumbit(event) {
  event.preventDefault();
  const formData = new FormData(cvForm);
  const formValues = Object.fromEntries(formData);
  console.log(formValues);

  await fetch("http://localhost:8080/addcv", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
}

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(loginform);
  const formValues = Object.fromEntries(formData);
  email = formValues;
  console.table(formValues);
  console.log(formValues);
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
    loginform.appendChild(h1);
    showData();
  } else {
    msgCheker.textContent = msg.massage;
  }

  loginform.reset();
}

//Event Listeners
loginform.addEventListener("submit", handleSubmit);
toggle.addEventListener("click", reveal);
csButton.addEventListener("click", cheatsheet);
cvForm.addEventListener("submit", cvSumbit);

//Update Preview
function updatePreviews() {
  document.getElementById("preview").innerHTML = markdown.toHTML(
    document.getElementById("personalsummary").value
  );
}
updatePreviews();

// signup form

const signUp = document.querySelector("#register-form");
// console.log(signUp);
async function submitSignUp(event) {
  event.preventDefault();

  const formData = new FormData(signUp);
  // console.log(formData);
  const formValues = Object.fromEntries(formData);
  console.table(formValues);
  const queres = await fetch("http://localhost:8080/addData", {
    method: "POST", // This is where we set the POST HTTP verb
    headers: {
      "Content-Type": "application/json", // This tells the server we're sending stringified JSON data
    },
    body: JSON.stringify({ formValues }),
  });
  signUp.reset();
};
signUp.addEventListener("submit", submitSignUp);

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

//Show the data collected from the database if the user exists  (Hanifah)
async function showData() {
  const personalsummary = document.querySelector("#personalsummary");
  const mainsection = document.querySelector("#mainsection");
  const education = document.querySelector("#education");
  const socials = document.querySelector("#socials");
  const skills = document.querySelector("#skills");
  const projects = document.querySelector("#projects");
  const cvData = await getFeedback();
  const index = undefined;

  for (i = 0; i++; i < cvData.length) {
    if (cvData.username == cvData) {
      index = i;
    }
  }
  personalsummary.textContent = cvData[index].personalsummary;
  mainsection.textContent = cvData[index].mainsection;
  education.textContent = cvData[index].education;
  socials.textContent = cvData[index].socials;
  skills.textContent = cvData[index].skills;
  projects.textContent = cvData[index].projects;
}
const cvForm = document.getElementById("cv-form");
//When you click submit on the cv-form
function cvSumbit(event) {
  event.preventDefault();
  const formData = new FormData(guestbookForm);
  const formValues = Object.fromEntries(formData);
  console.log(formValues);

  fetch("http://localhost:8080//add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
}

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

//Event Listeners
form.addEventListener("submit", handleSubmit);
toggle.addEventListener("click", reveal);
csButton.addEventListener("click", cheatsheet);





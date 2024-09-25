

const form = document.querySelector("#login-form");
async function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(form);
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
    
    if(msgCheker === null){
        const h1 = document.createElement("h1");
        h1.id = "login_massage";
        h1.textContent = msg.massage;
        form.appendChild(h1);
    }else{
        msgCheker.textContent =msg.massage;
    };

    form.reset();


};
form.addEventListener("submit", handleSubmit);  
const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

async function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const aadharID = document.getElementById('ID').value;
  const gender = document.getElementById('gender').value;
  const pincode = document.getElementById('pincode').value;
  const address = document.getElementById('address').value;
  const dob = document.getElementById('dob').value;
  const name = document.getElementById('name').value;
  const contact = document.getElementById('contact').value;

  const request = {
    email: email,
    password: password,
    aadhaar_number: aadharID,
    contact_number: contact,
    city: "City1",
    gender: gender,
    pincode: pincode,
    address: address,
    name: name,
    dob: dob
  }

  request["type"] = "Employee";

   var requestUrl = "http://localhost:3000/signupCitizen" ;

   fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // You may need to include additional headers depending on your server requirements
    },
    body: JSON.stringify(request)
  })
    .then(response => {
      // Check if the response status is OK (200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Parse the JSON data in the response
      return response.json();
    })
    .then(data => {
      // Handle the JSON data returned from the server
      console.log('Data from the server:', data);
      window.location.href = "../Dashboard/Employee/Edashboard.html?email=" + encodeURIComponent(email);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Fetch error:', error);
    });

}
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})
if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})
// Generate a random CAPTCHA string
function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        captcha += chars[randomIndex];
    }
    return captcha;
}

// Refresh CAPTCHA when the page loads
document.addEventListener("DOMContentLoaded", function () {
    refreshCaptcha();
});

// Function to refresh the CAPTCHA
function refreshCaptcha() {
    const captcha = generateCaptcha();
    const captchaDiv = document.getElementById("captcha");
    captchaDiv.textContent = captcha;
}

// Function to handle form submission
document.getElementById("submitGrievance").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the form from submitting by default

    const service = document.getElementById("serviceDropdown").value;
    const query = document.getElementById("queryBox").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const enteredCaptcha = document.getElementById("enteredCaptcha").value;
    const captchaDiv = document.getElementById("captcha").textContent;
	 // Check if all required fields are filled
	 if (service === "" || query === "" || phoneNumber === "") {
        alert("Please fill in all the required fields.");
        return;
    }
    // Verify CAPTCHA
    if (enteredCaptcha !== captchaDiv) {
        alert("CAPTCHA is incorrect. Please try again.");
        refreshCaptcha();
        return;
    }

	const request = {
		service: service,
		query: query,
		phoneNumber: phoneNumber
	  }
		
	   var requestUrl = "http://localhost:3000/signupEmployee" ;
	
	   fetch(requestUrl, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		  // You may need to include additional headers depending on your server requirements
		},
		body: JSON.stringify(request)
	  })
		.then(response => {
		  if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		  }
		  // Parse the JSON data in the response
		  return response.json();
		})
		.then(data => {
		  // Handle the JSON data returned from the server
		  console.log('Data from the server:', data);
		  window.location.href = "../Dashboard/Employee/Edashboard.html";
		})
		.catch(error => {
		  // Handle any errors that occurred during the fetch
		  console.error('Fetch error:', error);
		});
    // If all checks pass, you can submit the form
    alert("Your query is registered successfully.");
    // Here, you can add code to submit the form or perform other actions.


});

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
document.addEventListener("DOMContentLoaded", function () {
    const switchMode = document.getElementById('switch-mode');
    
    // Function to set the dark mode state and update local storage
    function setDarkMode(enabled) {
        if (enabled) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', 'disabled');
        }
    }
    // Check local storage for the dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        switchMode.checked = true;
        setDarkMode(true);
    } else {
        switchMode.checked = false;
        setDarkMode(false);
    }
    // Add event listener to toggle dark mode
    switchMode.addEventListener('change', function () {
        setDarkMode(this.checked);
    });
});
document.addEventListener("DOMContentLoaded", function() {
    // Function to generate a random CAPTCHA
    function generateCaptcha() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        let captcha = "";
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            captcha += characters[randomIndex];
        }
        return captcha;
    }

    // Generate and display a random CAPTCHA
    const captchaText = generateCaptcha();
    document.getElementById("captcha").textContent = captchaText;

    // Select necessary elements
    const serviceDropdown = document.getElementById("serviceDropdown");
    const otherServiceInput = document.getElementById("otherServiceInput");
    const queryBox = document.getElementById("queryBox");
    const phoneInput = document.getElementById("phoneNumber");
    const submitButton = document.getElementById("submitGrievance");
    const verificationMessage = document.getElementById("verification-message");

    // Add a click event listener to the Submit Grievance button
    submitButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the form from being submitted

        // Hide any existing messages
        verificationMessage.style.display = "none";

        // Check if the form is fully filled
        if (isFormValid()) {
            // Check if the entered CAPTCHA matches the generated CAPTCHA
            if (phoneInput.value === captchaText) {
                // Display success message
                displayVerificationMessage("Your query is registered successfully.", "green");
            } else {
                // Display CAPTCHA mismatch error message
                displayVerificationMessage("CAPTCHA mismatch. Please try again.", "red");
            }
        } else {
            // Display a message to fill the form completely
            displayVerificationMessage("Please fill the form completely.", "red");
        }
    });

    serviceDropdown.addEventListener("change", function() {
        const otherServiceSection = document.querySelector('.other-service-section');
        if (serviceDropdown.value === "Any Other") {
            otherServiceSection.style.display = "block"; // Show the "Other Service" section
        } else {
            otherServiceSection.style.display = "none"; // Hide the "Other Service" section
        }
    });

    // Add an input event listener to the Phone Number input
    phoneInput.addEventListener("input", function() {
        // Check if the input is a valid integer
        const phoneNumber = parseInt(phoneInput.value);
        if (isNaN(phoneNumber)) {
            verificationMessage.textContent = "Phone number must be an integer.";
            verificationMessage.style.color = "red";
        } else {
            verificationMessage.textContent = ""; // Clear any previous error message
        }
    });

    // Function to check if the form is fully filled
    function isFormValid() {
        const selectedService = serviceDropdown.value;
        const otherService = otherServiceInput.value;
        const query = queryBox.value;
        const phoneNumber = phoneInput.value;
        return (selectedService && ((selectedService !== "Any Other") || (selectedService === "Any Other" && otherService)) && query && phoneNumber);
    }

    // Function to display the verification message
    function displayVerificationMessage(message, color) {
        verificationMessage.textContent = message;
        verificationMessage.style.color = color;
        verificationMessage.style.display = "block"; // Show the message
        verificationMessage.style.fontSize = "24px";
        verificationMessage.style.textAlign = "center";
        verificationMessage.style.marginTop = "20px";
    }
});

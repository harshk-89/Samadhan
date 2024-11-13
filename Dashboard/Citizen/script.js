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
// Function to generate a random number within a specified range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Get the elements that display the numbers in your HTML
const resolvedElement = document.querySelector('.box-info li:nth-child(1) h3');
const totalElement = document.querySelector('.box-info li:nth-child(2) h3');
const pendingElement = document.querySelector('.box-info li:nth-child(3) h3');
// Generate random numbers for Graviances Resolved, Total Graviances, and Graviances Pending
const totalGraviances = getRandomNumber(1000, 5000); // Adjust the range as needed
const resolvedGraviances = getRandomNumber(1000, totalGraviances);
const pendingGraviances = totalGraviances - resolvedGraviances;
// Update the HTML elements with the generated numbers
resolvedElement.textContent = resolvedGraviances;
totalElement.textContent = totalGraviances;
pendingElement.textContent = pendingGraviances;
function processPayment() {
    // Generate a random total amount between 1 and 100
    const randomAmount = (Math.random() * 100).toFixed(2);

    // Update the #totalAmount element with the generated random amount
    document.getElementById('totalAmount').textContent = `Total Amount: $${randomAmount}`;
    alert('Payment processed successfully!');
}



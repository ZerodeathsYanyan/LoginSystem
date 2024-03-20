// For the title
const title = document.querySelector('#title');
// For reg form
const regForm = document.querySelector('.regForm');

// For reg form fields
const usernameReg = document.getElementById('usernameReg');
const passwordReg = document.getElementById('passwordReg');

// For login form
const logForm = document.querySelector('.logForm');

// For login form fields
const username = document.getElementById('username');
const password = document.getElementById('password');

// For username and passwords
const usernameAndPasswords = {}

// For getting the date and time today
const time = new Date().toLocaleString();

// For checking if a username already exists
function checkIfUserExists(username, usernameAndPasswords) {
	if (usernameAndPasswords.hasOwnProperty(username)) {
		return true
	}
}

// For validating username and passwords stored 
function validateUserNameAndPassword(username, password, usernameAndPasswords,) {
	if(usernameAndPasswords.hasOwnProperty(username) && usernameAndPasswords[username] == password) {
		return true;
	}
}

regForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Remove previous error messages
    document.getElementById("passwordErrors").innerHTML = "";

    // Validate if one of the fields are empty
    if (usernameReg.value.length === 0 || passwordReg.value.length === 0) {
        displayError("Fill out all the forms first");
        return; // Exit the function if any field is empty
    }

    // Check if the password is less than 8 characters
    if (passwordReg.value.length < 8) {
        displayError("Password must be at least 8 characters long");
        return; // Exit the function if the password is too short
    }

    // Check if the password contains at least one number
    if (!/\d/.test(passwordReg.value)) {
        displayError("Password must contain at least one number");
        return; // Exit the function if the password does not contain a number
    }

    // Check if the password contains both uppercase and lowercase characters
    if (!/[a-z]/.test(passwordReg.value) || !/[A-Z]/.test(passwordReg.value)) {
        displayError("Password must contain both uppercase and lowercase characters");
        return; // Exit the function if the password does not contain both uppercase and lowercase characters
    }

    // Store username and password to JS object
    if (checkIfUserExists(usernameReg.value, usernameAndPasswords)) {
        alert('Username is already taken');
    } else {
        // Store the username and passwords inside the JavaScript Object 
        usernameAndPasswords[usernameReg.value] = passwordReg.value;
        console.log(usernameAndPasswords);

        // Display the login form and get rid of the registration form on the page
        logForm.style.display = "block";
        regForm.style.display = "none";
    }
});

// Function to display error messages
function displayError(errorMessage) {
    const errorDiv = document.createElement("div");
    errorDiv.textContent = errorMessage;
    errorDiv.style.color = "red";
    document.getElementById("passwordErrors").appendChild(errorDiv);
}

logForm.addEventListener('submit', function (e) {

	// Passing username and password to the function
	if (validateUserNameAndPassword(username.value, password.value, usernameAndPasswords)) {

		// Hide the login form and title after user has been validated
		logForm.style.display = "none";
		title.style.display = "none";

		// Greet user who just logged in
		document.querySelector('.welcomePanel #greeting').innerHTML = "Good day! " + username.value + ". It's currently " + time;
	}
	else {

		// Login invalid
		alert("Username and password don't match or incorrect");

	}

})
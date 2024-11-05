// Load the stored counter value from localStorage, default to 0 if not found
let number = parseInt(localStorage.getItem('number_save')) || 0; 
let increment_ammount = parseInt(localStorage.getItem('increment_ammount_save')) || 1; 

// Function to increment the counter
function increment() {
    number += increment_ammount; // Increment the number by 1
    update();    // Update the display and check the button state
}

function increment_upgrade() {
    number -= 100;
    increment_ammount += 1
    update();
}
// Function to update the display and save the new value to localStorage
function update() {
    document.getElementById('counter').textContent = number;  // Update the counter on the page
    document.getElementById('main_button').textContent = 'Increment by +' + increment_ammount;
    localStorage.setItem('number_save', number);  // Save the updated number to localStorage
    localStorage.setItem('increment_ammount_save', increment_ammount);

    if (number < 0) {
        number = 0
    }
    // Get the button element
    const button = document.getElementById('increment_upgrade'); 

    // Disable/Enable the button based on the value of `number`
    if (number < 100) {
        button.disabled = true;  // Disable if number is less than 100
    } else {
        button.disabled = false; // Enable if number is 100 or greater
    }
}

// When the page loads, initialize the display and button state
document.addEventListener('DOMContentLoaded', function() {
    update();  // Update the display with the value from localStorage and check button state
});

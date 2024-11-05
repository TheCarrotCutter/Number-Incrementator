// Load the stored counter value from localStorage, default to 0 if not found
let number = parseInt(localStorage.getItem('counter')) || 0; 

// Function to increment the counter
function increment() {
    number += 1; // Increment the number by 1
    update();    // Update the display and check the button state
}

function increment_upgrade() {
    number -= 100;
    update();
}
// Function to update the display and save the new value to localStorage
function update() {
    document.getElementById('counter').textContent = number;  // Update the counter on the page
    localStorage.setItem('counter', number);  // Save the updated number to localStorage

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

// Load the stored counter value from localStorage, default to 0 if not found
let number = parseInt(localStorage.getItem('number_save')) || 0; 
let increment_ammount = parseInt(localStorage.getItem('increment_ammount_save')) || 1; 
let total = parseInt(localStorage.getItem('total_save')) || 0; 

// Function to increment the counter
function increment() {
    number += increment_ammount; // Increment the number by 1
    total += increment_ammount;
    update();    // Update the display and check the button state
}

function increment_upgrade() {
    number -= 100;
    increment_ammount += 1;
    update();
}

function increment_upgrade_10() {
    number -= 1000;
    increment_ammount += 10;
    update();
}

// Function to update the display and save the new value to localStorage
function update() {
    console.log("Updating... Current number: ", number); // Debugging: Check current number
    document.getElementById('counter').textContent = number;  // Update the counter on the page
    document.getElementById('main_button').textContent = 'Increment by +' + increment_ammount;
    document.getElementById('total').textContent = 'Total: ' + total;
    
    // Save the updated values to localStorage
    localStorage.setItem('number_save', number);  
    localStorage.setItem('increment_ammount_save', increment_ammount);
    localStorage.setItem('total_save', total);

    if (number < 0) {
        number = 0;
    }

    // Handle "Upgrade" button for 100 increments
    const Button = document.getElementById('increment_upgrade'); 
    if (number < 100) {
        console.log("Disabling upgrade button (100):", number); // Debugging: Track button disable state
        upgradeButton.disabled = true;  // Disable if number is less than 100
    } else {
        console.log("Enabling upgrade button (100):", number); // Debugging: Track button enable state
        upgradeButton.disabled = false; // Enable if number is 100 or greater
    }

    // Handle "Upgrade 10" button for 1000 increments
    const upgradeButton10 = document.getElementById('increment_upgrade_10'); 
    if (number < 1000) {
        console.log("Disabling upgrade button (1000):", number); // Debugging: Track button disable state
        upgradeButton10.disabled = true;  // Disable if number is less than 1000
    } else {
        console.log("Enabling upgrade button (1000):", number); // Debugging: Track button enable state
        upgradeButton10.disabled = false; // Enable if number is 1000 or greater
    }
}

// When the page loads, initialize the display and button state
document.addEventListener('DOMContentLoaded', function() {
    update();  // Update the display with the value from localStorage and check button state
});

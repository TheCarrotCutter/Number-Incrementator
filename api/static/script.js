// Load the stored counter value from localStorage, default to 0 if not found
let number = parseInt(localStorage.getItem('number_save')) || 0; 
let increment_ammount = parseInt(localStorage.getItem('increment_ammount_save')) || 1; 
let total = parseInt(localStorage.getItem('total_save')) || 0; 

// Function to increment the counter
function increment() {
    number += increment_ammount; // Increment the number by increment_ammount
    total += increment_ammount;
    update();    // Update the display and check the button state
}

function increment_upgrade() {
    number -= 100;  // Decrease number by 100 for the upgrade
    increment_ammount += 1; // Increase the increment amount
    update(); // Update the display and check button state
}

function increment_upgrade_100() {
    number -= 1000;  // Decrease number by 10000 for the upgrade
    increment_ammount += 100; // Increase the increment amount by 100
    update(); // Update the display and check button state
}

// Function to update the display and save the new value to localStorage
function update() {
    console.log("Updating... Current number: ", number); // Debugging: Check current number

    // Update the counter, increment button text, and total display
    document.getElementById('counter').textContent = number;  
    document.getElementById('main_button').textContent = 'Increment by +' + increment_ammount;
    document.getElementById('total').textContent = 'Total: ' + total;
    
    // Save the updated values to localStorage
    localStorage.setItem('number_save', number);  
    localStorage.setItem('increment_ammount_save', increment_ammount);
    localStorage.setItem('total_save', total);

    // Prevent the counter from going negative
    if (number < 0) {
        number = 0;
    }

    // Handle "Upgrade" button for 100 increments
    const upgradeButton = document.getElementById('increment_upgrade'); 
    if (number < 100) {
        console.log("Disabling upgrade button (100):", number); // Debugging: Track button disable state
        upgradeButton.disabled = true;  // Disable if number is less than 100
    } else {
        console.log("Enabling upgrade button (100):", number); // Debugging: Track button enable state
        upgradeButton.disabled = false; // Enable if number is 100 or greater
    }

    // Handle "Upgrade 100" button for 10000 increments
    const upgradeButton100 = document.getElementById('increment_upgrade_100'); 
    if (number < 10000) {
        console.log("Disabling upgrade button (10000):", number); // Debugging: Track button disable state
        upgradeButton100.disabled = true;  // Disable if number is less than 10000
    } else {
        console.log("Enabling upgrade button (10000):", number); // Debugging: Track button enable state
        upgradeButton100.disabled = false; // Enable if number is 10000 or greater
    }
}

// When the page loads, initialize the display and button state
document.addEventListener('DOMContentLoaded', function() {
    update();  // Update the display with the value from localStorage and check button state
});

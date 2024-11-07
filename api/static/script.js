// Load the stored counter value from localStorage, default to 0 if not found
let number = parseInt(localStorage.getItem('number_save')) || 0; 
let increment_ammount = parseInt(localStorage.getItem('increment_ammount_save')) || 1; 
let total = parseInt(localStorage.getItem('total_save')) || 0; 
let roundedNumber = Math.round(number / 100) * 100;

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

function increment_upgrade_1000() {
    number -= 100000;  // Decrease number by 10000 for the upgrade
    increment_ammount += 1000; // Increase the increment amount by 1000
    update(); // Update the display and check button state
}

function increment_upgrade_max() {
    number -= roundedNumber;  // Decrease number by 10000 for the upgrade
    increment_ammount += (roundedNumber / 100) / 3; // Increase the increment amount by 100
    update(); // Update the display and check button state
}

// Function to update the display and save the new value to localStorage
function update() {

    
    roundedNumber = Math.round(number / 100) * 100 - 100;

    console.log("Current number: ", number);

    const formattedNumber = number.toLocaleString();
    const formattedTotal = total.toLocaleString();
    
    // Update the counter, increment button text, and total display
    document.getElementById('counter').textContent = formattedNumber;  
    document.getElementById('main_button').textContent = 'Increment by +' + increment_ammount;
    document.getElementById('total').textContent = 'Total: ' + formattedTotal;
    
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
        upgradeButton.disabled = true;  // Disable if number is less than 100
    } else {
        upgradeButton.disabled = false; // Enable if number is 100 or greater
    }

    // Handle "Upgrade 100" button for 10000 increments
    const upgradeButton100 = document.getElementById('increment_upgrade_100'); 
    if (number < 10000) {
        upgradeButton100.disabled = true;  // Disable if number is less than 10000
    } else {
        upgradeButton100.disabled = false; // Enable if number is 10000 or greater
    }
}

// When the page loads, initialize the display and button state
document.addEventListener('DOMContentLoaded', function() {
    update();  // Update the display with the value from localStorage and check button state
});

// Load the stored counter value from localStorage, default to 0 if not found
let number = 0; 
let increment_ammount = 1; 
let total = 0;
let price = 100;

// Declare roundedNumber globally to avoid issues with scope
let roundedNumber = Math.round(number / 100) * 100;

// Function to increment the counter
function increment() {
    number += increment_ammount; // Increment the number by increment_ammount
    total += increment_ammount;
    update();    // Update the display and check the button state
}

function increment_upgrade() {
    number -= price;  // Decrease number by the current price for the upgrade
    increment_ammount += 1; // Increase the increment amount
    price += 1;  // Increase the price for the next upgrade
    update(); // Update the display and check button state
}

function increment_upgrade_1000() {
    number -= (price * 1000);  // Decrease number by the price * 1000 for the upgrade
    increment_ammount += 1000; // Increase the increment amount by 1000
    price += 1000;  // Increase the price for the next upgrade
    update(); // Update the display and check button state
}

function increment_upgrade_max() {
    // Recalculate roundedNumber before upgrading
    roundedNumber = Math.round(number / 100) * 100;

    if (number >= roundedNumber) {
        // Decrease the number by some function of roundedNumber and price
        number -= ((roundedNumber / 100) * price) - 50;  // You may want to adjust this formula

        // Increase increment_ammount based on the roundedNumber
        increment_ammount += Math.round((roundedNumber / 100) / 20); // This increases increment_ammount based on 1/20 of the rounded number

        // Increase price for the next upgrade
        price += (roundedNumber / 100);
    }

    update(); // Update the display and check button state
}

// Function to update the display and save the new value to localStorage
function update() {
    const formattedNumber = number.toLocaleString();
    const formattedTotal = total.toLocaleString();

    // Update the counter, increment button text, and total display
    document.getElementById('counter').textContent = formattedNumber;  
    document.getElementById('main_button').textContent = 'Increment by +' + increment_ammount;
    document.getElementById('total').textContent = 'Total: ' + formattedTotal;
    document.getElementById('increment_upgrade').textContent = 'Upgrade (' + price + ')';
    document.getElementById('increment_upgrade_1000').textContent = 'Upgrade (' + (price * 1000) + ')';
    document.getElementById('increment_upgrade_max').textContent = 'Max Upgrades (95% Less Value)';
    
    // Save the updated values to localStorage
    localStorage.setItem('number_save', number);  
    localStorage.setItem('increment_ammount_save', increment_ammount);
    localStorage.setItem('total_save', total);
    localStorage.setItem('price_save', price);

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

    // Handle "Upgrade 1000" button for 10000 increments
    const upgradeButton1000 = document.getElementById('increment_upgrade_1000'); 
    if (number < 100000) {
        upgradeButton1000.disabled = true;  // Disable if number is less than 10000
    } else {
        upgradeButton1000.disabled = false; // Enable if number is 10000 or greater
    }

    // Handle "Upgrade Max" button (new) based on the rounded number
    const upgradeButtonMax = document.getElementById('increment_upgrade_max');
    if (number >= price) {
        upgradeButtonMax.disabled = true;  // Disable if not enough number for the upgrade
    } else {
        upgradeButtonMax.disabled = false; // Enable if enough number for max upgrade
    }
}

// When the page loads, initialize the display and button state
document.addEventListener('DOMContentLoaded', function() {
    update();  // Update the display with the value from localStorage and check button state
});

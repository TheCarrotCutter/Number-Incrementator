// Load the stored counter value from localStorage, default to 0 if not found
let number = 0;
let increment_ammount = 1;
let total = 0;
    

let price = 99 + increment_ammount

let P1_start = Price;   // Starting price for Button 1
let P1_increase = 1;   // Price increase for Button 1
let P2_start = Price * 1000; // Starting price for Button 2
let P2_increase = 1000; // Price increase for Button 2

// Number of purchases for each button
let purchases_1 = 1000; // Number of times Button 1 is bought
let purchases_2 = 1;    // Button 2 is bought once

// Calculate total cost for Button 1
let totalCostButton1 = (purchases_1 / 2) * (P1_start + (P1_start + (purchases_1 - 1) * P1_increase));

// Calculate total cost for Button 2 (only once)
let totalCostButton2 = P2_start;

// Calculate percentage difference in value
let percentMoreValue = ((totalCostButton1 - totalCostButton2) / totalCostButton2) * 100;




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
    update(); // Update the display and check button state
}

function increment_upgrade_1000() {
    number -= (price * 1000);  // Decrease number by the price * 1000 for the upgrade
    increment_ammount += 1000; // Increase the increment amount by 1000
    update(); // Update the display and check button state
}

function increment_upgrade_max() {
    // Recalculate roundedNumber before upgrading
    roundedNumber = Math.round(number / 100) * 100;

    if (number >= roundedNumber) {
        // Decrease the number by some function of roundedNumber and price
        number -= ((roundedNumber / 100) * price) - 50;  // You may want to adjust this formula

        // Increase increment_ammount based on the roundedNumber
        increment_ammount += Math.round((roundedNumber / 100) / 5); // This increases increment_ammount based on 1/20 of the rounded number

    }

    update(); // Update the display and check button state
}

// Function to update the display and save the new value to localStorage
function update() {
    const formattedNumber = number.toLocaleString();
    const formattedTotal = total.toLocaleString();
    price = 99 + increment_ammount;

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
    
    
    // Define button parameters
    P1_start = Price;   // Starting price for Button 1
    P1_increase = 1;   // Price increase for Button 1
    P2_start = Price * 1000; // Starting price for Button 2
    P2_increase = 1000; // Price increase for Button 2

    // Number of purchases for each button
    purchases_1 = 1000; // Number of times Button 1 is bought
    purchases_2 = 1;    // Button 2 is bought once

    // Calculate total cost for Button 1
    totalCostButton1 = (purchases_1 / 2) * (P1_start + (P1_start + (purchases_1 - 1) * P1_increase));

    // Calculate total cost for Button 2 (only once)
    totalCostButton2 = P2_start;

    // Calculate percentage difference in value
    percentMoreValue = ((totalCostButton1 - totalCostButton2) / totalCostButton2) * 100;

    console.log(`Button 2 gives ${percentMoreValue.toFixed(2)}% more value.`);


    // Prevent the counter from going negative
    if (number < 0) {
        number = 0;
    }

    // Handle "Upgrade" button for 100 increments
    const upgradeButton = document.getElementById('increment_upgrade'); 
    if (number < price) {
        upgradeButton.disabled = true;  // Disable if number is less than 100
    } else {
        upgradeButton.disabled = false; // Enable if number is 100 or greater
    }

    // Handle "Upgrade 1000" button for 10000 increments
    const upgradeButton1000 = document.getElementById('increment_upgrade_1000'); 
    if (number < price * 1000) {
        upgradeButton1000.disabled = true;  // Disable if number is less than 10000
    } else {
        upgradeButton1000.disabled = false; // Enable if number is 10000 or greater
    }

    // Handle "Upgrade Max" button (new) based on the rounded number
    const upgradeButtonMax = document.getElementById('increment_upgrade_max');
    if (number < price) {
        upgradeButtonMax.disabled = true;  // Disable if not enough number for the upgrade
    } else {
        upgradeButtonMax.disabled = false; // Enable if enough number for max upgrade
    }
}

// When the page loads, initialize the display and button state
document.addEventListener('DOMContentLoaded', function() {
    update();  // Update the display with the value from localStorage and check button state
});

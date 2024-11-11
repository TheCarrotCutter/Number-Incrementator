// Load the stored counter value from localStorage, default to 0 if not found
let number = parseInt(localStorage.getItem('number_save')) || 0;
let increment_ammount = parseInt(localStorage.getItem('increment_ammount_save')) || 1;
let total = parseInt(localStorage.getItem('total_save')) || 0;

// Starting price of buttons, default to 99 + increment_ammount
let price = 99 + increment_ammount;

let P1_start = price;  // Starting price for Button 1
let P1_increase = 1;   // Price increase for Button 1
let P2_start = price * 1000; // Starting price for Button 2
let P2_increase = 1000; // Price increase for Button 2

// Number of purchases for each button
let purchases_1 = 1000; // Number of times Button 1 is bought
let purchases_2 = 1;    // Button 2 is bought once

// Function to calculate the total cost for Button 1 (x1 button)
function calculateTotalCostButton1(purchases) {
    return (purchases / 2) * (P1_start + (P1_start + (purchases - 1) * P1_increase));
}

// Function to calculate the percentage of more value for Button 2 (x1000)
function calculatePercentMoreValue() {
    let totalCostButton1 = calculateTotalCostButton1(purchases_1);
    let totalCostButton2 = P2_start;
    let percentMoreValue = ((totalCostButton1 - totalCostButton2) / totalCostButton2) * 100;
}

// Function to increment the counter
function increment() {
    number += increment_ammount; // Increment the number by increment_ammount
    total += increment_ammount;
    update();  // Update the display and check the button state
}

// Upgrade function (Button 1)
function increment_upgrade() {
    if (number >= price) {
        number -= price; // Decrease number by the current price for the upgrade
        increment_ammount += 1; // Increase the increment amount
        update(); // Update the display and check button state
    }
}

// Upgrade function (Button 2)
function increment_upgrade_1000() {
    if (number >= price * 1000) {
        number -= price * 1000;  // Decrease number by the price * 1000 for the upgrade
        increment_ammount += 1000; // Increase the increment amount by 1000
        update(); // Update the display and check button state
    }
}

// Max upgrade function
function increment_upgrade_max() {
    // Calculate how many upgrades can be bought
    let upgradesBought = Math.floor(number / price);

    // If at least one upgrade can be bought
    if (upgradesBought > 0) {
        let totalCost = upgradesBought * price; // Total cost for all upgrades

        // Subtract the total cost of all upgrades
        number -= totalCost;

        // Increase increment_ammount based on the number of upgrades bought
        increment_ammount += upgradesBought;

        // Update the price for the next upgrade (after the purchase)
        price = 99 + increment_ammount;

        // Update the display and localStorage
        update();
    }
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
    document.getElementById('increment_upgrade_1000').textContent = 'Upgrade (' + (price * 1000) + ') (' + percentMoreValue + '% More Value!)';
    document.getElementById('increment_upgrade_max').textContent = 'Max Upgrades';

    // Save the updated values to localStorage
    localStorage.setItem('number_save', number);
    localStorage.setItem('increment_ammount_save', increment_ammount);
    localStorage.setItem('total_save', total);
    localStorage.setItem('price_save', price);

    // Handle button states
    handleButtonStates();

    let P1_start = price;  // Starting price for Button 1
    let P1_increase = 1;   // Price increase for Button 1
    let P2_start = price * 1000; // Starting price for Button 2
    let P2_increase = 1000; // Price increase for Button 2

    // Number of purchases for each button
    let purchases_1 = 1000; // Number of times Button 1 is bought
    let purchases_2 = 1;    // Button 2 is bought once

    // Function to calculate the total cost for Button 1 (x1 button)
    
    let totalCostButton1 = (purchases / 2) * (P1_start + (P1_start + (purchases - 1) * P1_increase));

    // Function to calculate the percentage of more value for Button 2 (x1000)

    let percentMoreValue = ((totalCostButton1 - P2_start) / totalCostButton2) * 100;

// Handle button states
function handleButtonStates() {
    // Prevent the counter from going negative
    if (number < 0) {
        number = 0;
    }

    // Handle "Upgrade" button for 100 increments
    const upgradeButton = document.getElementById('increment_upgrade');
    upgradeButton.disabled = number < price;

    // Handle "Upgrade 1000" button for 10000 increments
    const upgradeButton1000 = document.getElementById('increment_upgrade_1000');
    upgradeButton1000.disabled = number < price * 1000;

    // Handle "Upgrade Max" button
    const upgradeButtonMax = document.getElementById('increment_upgrade_max');
    upgradeButtonMax.disabled = number < price;
}

// When the page loads, initialize the display and button state
document.addEventListener('DOMContentLoaded', function() {
    update();  // Update the display with the value from localStorage and check button state
});

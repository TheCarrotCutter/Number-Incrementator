// Load the stored counter value from localStorage, default to 0 if not found
let number = parseInt(localStorage.getItem('number_save')) || 0;
let increment_ammount = parseInt(localStorage.getItem('increment_ammount_save')) || 1;
let total = parseInt(localStorage.getItem('total_save')) || 0;

// Starting price of buttons, default to 99 + increment_ammount
let price = 99 + increment_ammount;

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
    price = 99 + increment_ammount; // Recalculate the price

    // Calculate the total cost for Button 1 after buying it 1000 times with increasing prices
    let totalCostButton1 = 1000 * (2 * price + 999) / 2;

    // Calculate the total cost of Button 2
    let totalCostButton2 = price * 1000;

    // Calculate the percentage difference (More value of Button 2)
    let percentMoreValue = ((totalCostButton2 - totalCostButton1) / totalCostButton1) * 100;

    // Debugging: log percentMoreValue to check if it's calculating correctly
    console.log("percentMoreValue: ", percentMoreValue);

    // Update the counter, increment button text, and total display
    document.getElementById('counter').textContent = formattedNumber;
    document.getElementById('main_button').textContent = 'Increment by +' + increment_ammount;
    document.getElementById('total').textContent = 'Total: ' + formattedTotal;
    document.getElementById('increment_upgrade').textContent = 'Upgrade (' + price + ')';
    document.getElementById('increment_upgrade_1000').textContent = 'Upgrade (' + (price * 1000) + ') (' + percentMoreValue.toFixed(2) + '% More Value!)';
    document.getElementById('increment_upgrade_max').textContent = 'Max Upgrades';

    // Save the updated values to localStorage
    localStorage.setItem('number_save', number);
    localStorage.setItem('increment_ammount_save', increment_ammount);
    localStorage.setItem('total_save', total);
    localStorage.setItem('price_save', price);

    // Handle button states (enable/disable based on number)
    handleButtonStates();
}

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

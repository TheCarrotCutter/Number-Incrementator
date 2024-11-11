// Load the stored counter value from localStorage, default to 0 if not found
let number = parseInt(localStorage.getItem('number_save')) || 0;
let increment_ammount = parseInt(localStorage.getItem('increment_ammount_save')) || 1;
let total = parseInt(localStorage.getItem('total_save')) || 0;

// Starting price of buttons, default to 99 + increment_ammount
let price = 99 + increment_ammount;

// Function to update the display and handle all logic
function update() {
    // Calculate the total cost for Button 1 (x1 button)
    let totalCostButton1 = (1000 / 2) * (price + (price + (1000 - 1) * 1)); // Assuming purchases_1 is 1000

    // Calculate the price for Button 2 (x1000 button)
    let P2_start = price * 1000;

    // Calculate the percentage more value for Button 2
    let percentMoreValue = ((totalCostButton1 - P2_start) / P2_start) * 100;

    // Calculate how many upgrades can be bought
    let upgradesBought = Math.floor(number / price);

    // If at least one upgrade can be bought, perform the upgrade
    if (upgradesBought > 0) {
        let totalCost = upgradesBought * price; // Total cost for all upgrades
        number -= totalCost; // Subtract the total cost of all upgrades
        increment_ammount += upgradesBought; // Increase increment_ammount based on the number of upgrades bought
    }

    // Recalculate price for the next upgrade
    price = 99 + increment_ammount;

    // Update the display with formatted values
    const formattedNumber = number.toLocaleString();
    const formattedTotal = total.toLocaleString();

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

// Function to increment the counter
function increment() {
    number += increment_ammount; // Increment the number by increment_ammount
    total += increment_ammount;
    update();  // Update the display and check the button state
}

// When the page loads, initialize the display and button state
document.addEventListener('DOMContentLoaded', function() {
    update();  // Update the display with the value from localStorage and check button state
});

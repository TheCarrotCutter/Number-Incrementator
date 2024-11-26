// Load the stored counter value from localStorage, default to 0 if not found
let number = parseInt(localStorage.getItem('number_save')) || 0;
let increment_ammount = parseInt(localStorage.getItem('increment_ammount_save')) || 1;
let total = parseInt(localStorage.getItem('total_save')) || 0;

let visible_items = ['increment_upgrade_max'];  // List of visible item IDs
const items = document.querySelectorAll('.showable'); // Select elements with class 'showable'

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

function buy(item) {
    if (item === 'max_upgrade') {
        if (number >= 10000000) {  // Check if player has enough resources (10,000,000)
            number -= 10000000;  // Subtract the cost for the max upgrade
            document.getElementById('increment_upgrade_max').style.display = 'inline';  // Show Max Upgrades button
            document.getElementById('max_upgrade_buy').style.display = 'none';  // Hide the Max Upgrades purchase button
            update();  // Update the display
        }
    }
}


// Function to update the display and save the new value to localStorage
function update() {
    const formattedNumber = number.toLocaleString();
    const formattedTotal = total.toLocaleString();
    price = 99 + increment_ammount; // Recalculate the price

    // Loop through each item (elements with 'showable' class)
    items.forEach(item => {
      // Check if the item's id is in the visibleItems list
      if (visible_items.includes(item.id)) {
        item.style.display = 'block';  // Show the item
      } else {
        item.style.display = 'none';   // Hide the item
      }
    });
  
    // Update the counter, increment button text, and total display
    document.getElementById('counter').textContent = formattedNumber;
    document.getElementById('main_button').textContent = 'Increment by +' + increment_ammount.toLocaleString();
    document.getElementById('total').textContent = 'Total: ' + formattedTotal;
    document.getElementById('increment_upgrade').textContent = 'Upgrade (' + price.toLocaleString() + ')';
    document.getElementById('increment_upgrade_max').textContent = 'Max Upgrades';
    document.getElementById('increment_upgrade_1000').textContent = 'Upgrade (' + (price * 1000).toLocaleString() + ')';

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
    const upgradeButton = document.getElementById('increment_upgrade');
    upgradeButton.disabled = number < price;

    const upgradeButton1000 = document.getElementById('increment_upgrade_1000');
    upgradeButton1000.disabled = number < price * 1000;

    const upgradeButtonMax = document.getElementById('increment_upgrade_max');
    upgradeButtonMax.disabled = number < price;

    const buyMaxUpgrade = document.getElementById('max_upgrade_buy');
    buyMaxUpgrade.disabled = number < 10000000;
}

// When the page loads, initialize the display and button state
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('increment_upgrade_max').style.display = 'none';
    update();  // Update the display with the value from localStorage and check button state
});

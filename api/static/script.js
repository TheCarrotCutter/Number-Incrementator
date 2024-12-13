// Load the stored counter value from localStorage, default to 0 if not found
let number = parseInt(localStorage.getItem('number_save')) || 0;
let increment_ammount = parseInt(localStorage.getItem('increment_ammount_save')) || 1;
let idle_ammount = parseInt(localStorage.getItem('idle_ammount_save')) || 0;
let total = parseInt(localStorage.getItem('total_save')) || 0;

let visible_items = JSON.parse(localStorage.getItem('visible_items_save')) || [''];
// items that start invisible (if not on the list), and become visible (if on the list)

let bought_items = JSON.parse(localStorage.getItem('bought_items_save')) || [''];
// items that start visible (if not on the list), and become invisible (if on the list)

const items = document.querySelectorAll('.showable'); // Select elements with class 'showable'
const shop_items = document.querySelectorAll('.shop_item'); // Select elements with class 'shop_item'

// Starting price of buttons, default to 99 + increment_ammount
let price = 99 + increment_ammount;
let idle_price = 10000 + (idle_ammount * 100);

function reset() {
  number = 0;
  increment_ammount = 1;
  idle_ammount = 0;
  total = 0;
  visible_items = [''];
  bought_items = [''];
  update()
}

function grant() {
  number += 1000000000000000;
  update()
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function debug_box_open() {
    if (document.getElementById('debug_code').value === "debug_on") {
        visible_items.push('debug_box');
        update();
    }
    if (document.getElementById('debug_code').value === "debug_off") {
        visible_items = visible_items.filter(item => item !== 'debug_box');
        update();
    }
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

function idle_upgrade() {
     if (number >= idle_price) {
        number -= idle_price; // Decrease number by the current price for the upgrade
        idle_ammount += 1; // Increase the increment amount
        update(); // Update the display and check button state
    }
}

async function idle_tick() { 
    number += idle_ammount
    await sleep(1000)
    update()
    idle_tick()
}

function buy(item) {
    if (item === 'max_upgrade') {
        if (number >= 10000000) {
            number -= 10000000;
            visible_items.push('increment_upgrade_max');
            bought_items.push('max_upgrade_buy');
            update();
        }
    }

    if (item === 'idle_box') {
        if (number >= 100000000) {
            number -= 100000000;
            visible_items.push('idle_box');
            bought_items.push('idle_box_buy');
            update(); // Add update here if needed
        }
    }
}  // This is the closing brace for the 'buy' function


// Function to update the display and save the new value to localStorage
function update() {
    const formattedNumber = number.toLocaleString();
    const formattedTotal = total.toLocaleString();
    price = 99 + increment_ammount; // Recalculate the price
    idle_price = 10000 + (idle_ammount * 100);

    // Loop through each item (elements with 'showable' class)
    items.forEach(item => {
        // Check if the item's id is in the visibleItems list
        if (visible_items.includes(item.id)) {
           if (item.tagName === 'DIV') {
               item.style.display = 'block';  // Show the item
           } else {
               item.style.display = 'inline';  // Show the item
           }

        } else {
            item.style.display = 'none';   // Hide the item
        }
    });

    shop_items.forEach(item => {
        // Check if the item's id is in the visibleItems list
        if (bought_items.includes(item.id)) {
            item.style.display = 'none';  // Show the item
        } else {
            item.style.display = 'inline';   // Hide the item
        }
    });

    // Update the counter, increment button text, and total display
    document.getElementById('counter').textContent = formattedNumber;
    document.getElementById('main_button').textContent = 'Increment by +' + increment_ammount.toLocaleString();
    document.getElementById('total').textContent = 'Total: ' + formattedTotal;
    document.getElementById('increment_upgrade').textContent = 'Upgrade (' + price.toLocaleString() + ')';
    document.getElementById('idle_upgrade').textContent = 'Upgrade (' + idle_price.toLocaleString() + ')';
    document.getElementById('increment_upgrade_max').textContent = 'Max Upgrades';
    document.getElementById('increment_upgrade_1000').textContent = 'Upgrade (' + (price * 1000).toLocaleString() + ')';
    document.getElementById('persec_counter').textContent = idle_ammount.toLocaleString() + '/second';

    // Save the updated values to localStorage
    localStorage.setItem('visible_items_save', JSON.stringify(visible_items));
    localStorage.setItem('bought_items_save', JSON.stringify(bought_items));
    localStorage.setItem('number_save', number);
    localStorage.setItem('increment_ammount_save', increment_ammount);
    localStorage.setItem('idle_ammount_save', idle_ammount);
    localStorage.setItem('total_save', total);

    const upgradeButton = document.getElementById('increment_upgrade');
    upgradeButton.disabled = number < price;

    const upgradeButton1000 = document.getElementById('increment_upgrade_1000');
    upgradeButton1000.disabled = number < price * 1000;

    const upgradeButtonMax = document.getElementById('increment_upgrade_max');
    upgradeButtonMax.disabled = number < price;

    const buyMaxUpgrade = document.getElementById('max_upgrade_buy');
    buyMaxUpgrade.disabled = number < 10000000;

    const buyIdleUpgrades = document.getElementById('idle_box_buy');
    buyIdleUpgrades.disabled = number < 100000000;

    const IdleUpgrades = document.getElementById('idle_upgrade');
    IdleUpgrades.disabled = number < idle_price;
}

// When the page loads, initialize the display and button state
document.addEventListener('DOMContentLoaded', function() {

    idle_tick()
    
    // Ensure that the max upgrade button starts visible
    update();  // Update the display with the value from localStorage and check button state
});

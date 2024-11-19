async function loadGameState() {
    try {
        const response = await fetch('/api/get_game_state');
        const data = await response.json();
        
        if (data.success) {
            number = data.gameState.number || 0;
            increment_ammount = data.gameState.increment_amount || 1;
            total = data.gameState.total || 0;
            update();
        } else {
            console.error('Error loading game state');
        }
    } catch (error) {
        console.error('Error loading game state:', error);
    }
}

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
            document.getElementById('max_upgrade_buy').style.display = 'none';  // Show Max Upgrades button
            update();  // Update the display
        } else {
            alert("Not enough resources for Max Upgrade!");  // Alert if not enough resources
        }
    }
}


// Function to update the display and save the new value to localStorage
async function update() {
    const formattedNumber = number.toLocaleString();
    const formattedTotal = total.toLocaleString();
    price = 99 + increment_ammount; // Recalculate the price

    // Update the UI elements as usual
    document.getElementById('counter').textContent = formattedNumber;
    document.getElementById('main_button').textContent = 'Increment by +' + increment_ammount.toLocaleString();
    document.getElementById('total').textContent = 'Total: ' + formattedTotal;
    document.getElementById('increment_upgrade').textContent = 'Upgrade (' + price.toLocaleString() + ')';
    document.getElementById('increment_upgrade_max').textContent = 'Max Upgrades';
    document.getElementById('increment_upgrade_1000').textContent = 'Upgrade (' + (price * 1000).toLocaleString() + ')';

    // Send the updated state to the backend
    try {
        const response = await fetch('/api/update_game_state', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number: number,
                increment_ammount: increment_ammount,
                total: total,
                price: price
            })
        });
        const data = await response.json();
        if (!data.success) {
            console.error('Error updating game state');
        }
    } catch (error) {
        console.error('Error updating game state:', error);
    }
}
// Handle button states
function handleButtonStates() {

    // Handle "Upgrade" button for 100 increments
    const upgradeButton = document.getElementById('increment_upgrade');
    upgradeButton.disabled = number < price;

    // Handle "Upgrade 1000" button for 10000 increments
    const upgradeButton1000 = document.getElementById('increment_upgrade_1000');
    upgradeButton1000.disabled = number < price * 1000;

    // Handle "Upgrade Max" button
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

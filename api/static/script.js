let username = prompt("Enter your username:");
if (!username) {
    username = 'Player_' + Math.floor(Math.random() * 1000000);  // Generate a random username if not entered
}

// Load player data from the server
window.addEventListener('load', function() {
    loadPlayerData(username);
});

function loadPlayerData(username) {
    fetch(`/load_progress/${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                document.getElementById('counter').textContent = data.number;
                document.getElementById('total').textContent = data.total;
                increment_amount = data.increment_amount; // Load increment amount
            } else {
                console.log('Player data not found, starting fresh');
            }
        })
        .catch(error => console.error('Error loading player data:', error));
}

// Save progress to the server
function saveProgress() {
    const number = parseInt(document.getElementById('counter').textContent);
    const total = parseFloat(document.getElementById('total').textContent);

    const progressData = {
        username: username,
        number: number,
        total: total,
        increment_amount: increment_amount  // Send the increment amount too
    };

    fetch('/save_progress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);  // Success message
    })
    .catch(error => console.error('Error saving progress:', error));
}

// Increment function (for the main button)
function increment() {
    let currentCount = parseInt(document.getElementById('counter').textContent);
    document.getElementById('counter').textContent = currentCount + increment_amount;
    saveProgress();  // Save progress after increment
}

// Upgrade function (for the increment upgrade button)
function upgradeIncrementAmount() {
    let currentCount = parseInt(document.getElementById('counter').textContent);
    if (currentCount >= 100) {  // Check if enough progress is made to upgrade
        increment_amount += 1;  // Increase the increment amount
        document.getElementById('counter').textContent = currentCount + increment_amount;  // Apply the upgrade immediately
        saveProgress();  // Save progress after upgrade
    } else {
        alert("Not enough points to upgrade!");
    }
}

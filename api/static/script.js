// Load player data from the server
function loadPlayerData(username) {
    fetch(`http://localhost:5000/load_progress/${username}`)  // Specify full URL
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

    fetch('http://localhost:5000/save_progress', {  // Specify full URL
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

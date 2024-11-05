let number = parseInt(localStorage.getItem('counter')) || 0; // Default to 0 if no value exists in localStorage


function increment() {
    number+=1;
    update()
}

function update() {
    document.getElementById('counter').textContent = number;
    localStorage.setItem('counter', number); // Save the current number in localStorage
}

document.addEventListener('DOMContentLoaded', function() {
    number = parseInt(localStorage.getItem('counter')) || 0; // Default to 0 if no value exists in localStorage
    update()
});

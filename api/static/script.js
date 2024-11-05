let number = parseInt(localStorage.getItem('counter')) || 0; // Default to 0 if no value exists in localStorage


function increment() {
    number+=1;
    update()
}

function update() {
    document.getElementById('counter').textContent = number;
    localStorage.setItem('counter', number); // Save the current number in localStorage


    const button = document.getElementById('Increment_Upgrade');  // Get the button element
    if (number < 100) {
        button.disabled = true
}    else    {
        button.disabled = false

document.addEventListener('DOMContentLoaded', function() {
    number = parseInt(localStorage.getItem('counter')) || 0; // Default to 0 if no value exists in localStorage
    update()
});

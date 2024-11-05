let number = 0;

function increment() {
    number+=1;
    update()
}

function update() {
    document.getElementById('counter').textContent = number;
    localStorage.setItem('counter', number); // Save the current number in localStorage
}

document.addEventListener('DOMContentLoaded', function() {
    number = 0;
    update()
});

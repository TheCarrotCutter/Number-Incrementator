let number = 0;

function increment() {
    number+=1;
    update()
}

function update() {
    document.getElementById('counter').textContent = number;
}

document.addEventListener('DOMContentLoaded', function() {
            let number = 0;

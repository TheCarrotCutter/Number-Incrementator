let number = 0;

function increment() {
    //number+=0;
    update()
}

function update() {
    document.getElementById('counter').textContent = number;
}

document.addEventListener('DOMContentLoaded', function() {
    number = 0;
    update()
});

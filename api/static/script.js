let number = -1;

function increment() {
    number+=1;
    update()
}

function update() {
    document.getElementById('counter').textContent = number;
}

let number = 0;

function increment() {
    number+=1;
    update()
}

function update() {
    document.getElementById('counter').textContent = number;
}

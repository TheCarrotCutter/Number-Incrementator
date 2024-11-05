let number = 1;

document.getElementById('counter').textContent = number;



function increment() {
    number+=1;
    update()
}

function update() {
    document.getElementById('counter').textContent = number;
}

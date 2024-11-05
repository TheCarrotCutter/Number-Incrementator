let number = 0;

function increment() {
    number+=1;
    update()
}
let number = 0
function update() {
    document.getElementById('counter').textContent = number;
}

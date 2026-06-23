const cube = document.getElementById("cube");

let rotationX = -25;
let rotationY = 35;

let dragging = false;

let lastX = 0;
let lastY = 0;

function updateCube() {
    cube.style.transform =
        `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
}

updateCube();

cube.addEventListener("mousedown", (e) => {
    dragging = true;

    lastX = e.clientX;
    lastY = e.clientY;

    cube.style.cursor = "grabbing";
});

window.addEventListener("mouseup", () => {
    dragging = false;
    cube.style.cursor = "grab";
});

window.addEventListener("mousemove", (e) => {

    if (!dragging) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    rotationY += dx * 0.5;
    rotationX -= dy * 0.5;

    updateCube();

    lastX = e.clientX;
    lastY = e.clientY;
});
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const PANEL_HEIGHT = 80;
const MAX_PULL = 150;

const world = {
    x: 20,
    y: PANEL_HEIGHT + 20,
    width: window.innerWidth - 40,
    height: window.innerHeight - PANEL_HEIGHT - 40
};

let gravity = 0.5;
let mass = 1.0;
let damping = 0.99;

const bounce = 0.8;

const ball = {
    x: 400,
    y: 200,

    vx: 0,
    vy: 0,

    radius: 25,

    mass: 1
};

let aiming = false;

let mouseX = 0;
let mouseY = 0;

function distance(x1, y1, x2, y2) {
    return Math.hypot(
        x1 - x2,
        y1 - y2
    );
}

function updateWorldSize() {

    world.width =
        window.innerWidth - 40;

    world.height =
        window.innerHeight -
        PANEL_HEIGHT -
        40;
}

canvas.addEventListener("mousedown", (e) => {

    if (
        distance(
            e.clientX,
            e.clientY,
            ball.x,
            ball.y
        ) <= ball.radius
    ) {

        aiming = true;

        ball.vx = 0;
        ball.vy = 0;
    }
});

canvas.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;
});

canvas.addEventListener("mouseup", () => {

    if (!aiming) return;

    let dx = mouseX - ball.x;
    let dy = mouseY - ball.y;

    const dist = Math.hypot(dx, dy);

    if (dist > MAX_PULL) {

        const scale =
            MAX_PULL / dist;

        dx *= scale;
        dy *= scale;
    }

    const power = 0.15;

    ball.vx =
        (dx * power) /
        ball.mass;

    ball.vy =
        (dy * power) /
        ball.mass;

    aiming = false;
});

function update() {

    if (!aiming) {

        ball.vy += gravity;

        ball.vx *= damping;
        ball.vy *= damping;

        ball.x += ball.vx;
        ball.y += ball.vy;

        // 왼쪽 벽
        if (
            ball.x - ball.radius <
            world.x
        ) {

            ball.x =
                world.x +
                ball.radius;

            ball.vx *= -bounce;
        }

        // 오른쪽 벽
        if (
            ball.x + ball.radius >
            world.x + world.width
        ) {

            ball.x =
                world.x +
                world.width -
                ball.radius;

            ball.vx *= -bounce;
        }

        // 바닥
        if (
            ball.y + ball.radius >
            world.y + world.height
        ) {

            ball.y =
                world.y +
                world.height -
                ball.radius;

            ball.vy *= -bounce;
        }

        // 천장
        if (
            ball.y - ball.radius <
            world.y
        ) {

            ball.y =
                world.y +
                ball.radius;

            ball.vy *= -bounce;
        }
    }
}

function drawArrow() {

    let dx = mouseX - ball.x;
    let dy = mouseY - ball.y;

    const dist = Math.hypot(dx, dy);

    if (dist > MAX_PULL) {

        const scale =
            MAX_PULL / dist;

        dx *= scale;
        dy *= scale;
    }

    const endX = ball.x + dx;
    const endY = ball.y + dy;

    const angle =
        Math.atan2(
            dy,
            dx
        );

    const headLength = 15;

    // 최대 거리 원

    ctx.beginPath();

    ctx.arc(
        ball.x,
        ball.y,
        MAX_PULL,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        "rgba(0,255,255,0.2)";

    ctx.lineWidth = 1;

    ctx.stroke();

    // 화살표

    ctx.beginPath();

    ctx.moveTo(
        ball.x,
        ball.y
    );

    ctx.lineTo(
        endX,
        endY
    );

    ctx.strokeStyle =
        "cyan";

    ctx.lineWidth = 3;

    ctx.stroke();

    // 화살촉

    ctx.beginPath();

    ctx.moveTo(
        endX,
        endY
    );

    ctx.lineTo(
        endX -
        headLength *
        Math.cos(angle - 0.4),

        endY -
        headLength *
        Math.sin(angle - 0.4)
    );

    ctx.moveTo(
        endX,
        endY
    );

    ctx.lineTo(
        endX -
        headLength *
        Math.cos(angle + 0.4),

        endY -
        headLength *
        Math.sin(angle + 0.4)
    );

    ctx.stroke();
}

function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // 물리 영역

    ctx.strokeStyle =
        "white";

    ctx.lineWidth = 2;

    ctx.strokeRect(
        world.x,
        world.y,
        world.width,
        world.height
    );

    // 공

    ctx.beginPath();

    ctx.arc(
        ball.x,
        ball.y,
        ball.radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        aiming
        ? "lime"
        : "orange";

    ctx.fill();

    if (aiming) {
        drawArrow();
    }
}

function loop() {

    update();

    draw();

    requestAnimationFrame(loop);
}

loop();

window.addEventListener("resize", () => {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

    updateWorldSize();
});

// Gravity

gPlus.onclick = () => {

    gravity += 0.1;

    gValue.textContent =
        gravity.toFixed(1);
};

gMinus.onclick = () => {

    gravity = Math.max(
        0,
        gravity - 0.1
    );

    gValue.textContent =
        gravity.toFixed(1);
};

// Mass

mPlus.onclick = () => {

    mass += 0.1;

    ball.mass = mass;

    mValue.textContent =
        mass.toFixed(1);
};

mMinus.onclick = () => {

    mass = Math.max(
        0.1,
        mass - 0.1
    );

    ball.mass = mass;

    mValue.textContent =
        mass.toFixed(1);
};

// Damping

dPlus.onclick = () => {

    damping = Math.min(
        1,
        damping + 0.01
    );

    dValue.textContent =
        damping.toFixed(2);
};

dMinus.onclick = () => {

    damping = Math.max(
        0.80,
        damping - 0.01
    );

    dValue.textContent =
        damping.toFixed(2);
};
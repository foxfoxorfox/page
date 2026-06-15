const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const gravity = 0.5;
        const bounce = 0.8;

        const ball = {
            x: 300,
            y: 100,
            vx: 4,
            vy: 0,
            radius: 25
        };

        let dragging = false;

        // 던지기용
        let lastMouseX = 0;
        let lastMouseY = 0;
        let mouseVX = 0;
        let mouseVY = 0;

        function distance(x1, y1, x2, y2) {
            return Math.hypot(x1 - x2, y1 - y2);
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
                dragging = true;

                ball.vx = 0;
                ball.vy = 0;

                lastMouseX = e.clientX;
                lastMouseY = e.clientY;
            }
        });

        canvas.addEventListener("mousemove", (e) => {

            mouseVX = e.clientX - lastMouseX;
            mouseVY = e.clientY - lastMouseY;

            lastMouseX = e.clientX;
            lastMouseY = e.clientY;

            if (dragging) {
                ball.x = e.clientX;
                ball.y = e.clientY;
            }
        });

        canvas.addEventListener("mouseup", () => {
            if (dragging) {

                // 던지기 효과
                ball.vx = mouseVX;
                ball.vy = mouseVY;

                dragging = false;
            }
        });

        function update() {

            if (!dragging) {

                ball.vy += gravity;

                ball.x += ball.vx;
                ball.y += ball.vy;

                // 좌우 벽
                if (ball.x - ball.radius < 0) {
                    ball.x = ball.radius;
                    ball.vx *= -bounce;
                }

                if (ball.x + ball.radius > canvas.width) {
                    ball.x = canvas.width - ball.radius;
                    ball.vx *= -bounce;
                }

                // 바닥
                if (ball.y + ball.radius > canvas.height) {
                    ball.y = canvas.height - ball.radius;
                    ball.vy *= -bounce;
                }

                // 천장
                if (ball.y - ball.radius < 0) {
                    ball.y = ball.radius;
                    ball.vy *= -bounce;
                }
            }
        }

        function draw() {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = dragging ? "lime" : "orange";
            ctx.fill();
        }

        function loop() {
            update();
            draw();
            requestAnimationFrame(loop);
        }

        loop();

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
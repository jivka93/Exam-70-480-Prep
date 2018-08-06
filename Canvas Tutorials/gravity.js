var GravityModule = (function () {
    var canvas = document.getElementById('gravity');

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    var c = canvas.getContext('2d'); // context

    var ballArray = [];
    var gravity = 1;
    var friction = 0.96;

    function init() {

        for (var i = 0; i < colorArray.length; i++) {
            var radius = 40;
            var x = (Math.random() * canvas.width);
            var y = (Math.random() * (canvas.height / 2));
            var dy = 3;

            ballArray.push(new Ball(x, y, radius, colorArray[i], dy));
        }
    };

    window.addEventListener('resize',
        function () {
            canvas.width = window.innerWidth / 2 - 40;
            canvas.height = window.innerHeight / 2 - 40;

            c.clearRect(0, 0, innerWidth, innerHeight);
            init();
        }
    );

    init();

    // Object oriented
    function Ball(x, y, radius, color, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dy = dy;

        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.strokeStyle = 'rgb(0, 0, 0, 0.1)';
            c.fillStyle = this.color;
            c.stroke();
            c.fill();
        }

        this.update = function () {

            if (this.y + this.radius > canvas.height) {
                this.dy = -this.dy * friction;
            } else {
                this.dy += gravity;
            }

            this.y += this.dy;
            this.draw();
        }
    }

    // Animation:
    (function animate() {

        requestAnimationFrame(animate);

        c.clearRect(0, 0, window.innerWidth / 2 - 40, window.innerHeight / 2);
        c.clearRect(0, 0, canvas.width, canvas.height);

        ballArray.forEach(ball => {
            ball.update();
        });

    })();

})();
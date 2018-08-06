var GravityModule = (function () {

    var canvas = document.querySelector('canvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var c = canvas.getContext('2d'); // context

    var ballArray = [];
    var gravity = 1;
    var friction = 0.96;

    function init() {

        ballArray = [];

        for (var i = 0; i < 30; i++) {

            var radius = randomIntFromRange(30, 40);
            var x = randomIntFromRange(radius, canvas.width - radius);
            var y = randomIntFromRange(radius, (canvas.height - radius)/2);
            var dy = randomIntFromRange(-2, 2);;
            var dx = randomIntFromRange(-2, 2);
            var color = randomColor(colorArray);

            ballArray.push(new Ball(x, y, radius, color, dx, dy));
        }
    };

    window.addEventListener('resize',
        function () {

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            init();
        }
    );

    window.addEventListener('click',
        function () {
            init();
        }
    );

    init();

    // Object oriented
    function Ball(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
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

            if (this.y + this.radius + this.dy > canvas.height) {
                this.dy = -this.dy * friction;
            } else {
                this.dy += gravity;
            }

            if (this.x + this.radius + this.dx > canvas.width
                || this.x - this.radius <= 0) {
                this.dx = -this.dx;
            }

            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        }
    }

    // Animation:
    (function animate() {

        requestAnimationFrame(animate);

        c.clearRect(0, 0, canvas.width, canvas.height);

        ballArray.forEach(ball => {
            ball.update();
        });

    })();

})();
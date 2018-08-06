var BouncingBallsModule = (function () {

    var canvas = document.getElementById('bouncing-balls');

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    var c = canvas.getContext('2d'); // context

    var maxRadius = 70;
    var minRadius = 3;

    var mouse = {
        x: undefined,
        y: undefined
    };

    window.addEventListener('mousemove', 
        function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        }
    );

    var circleArray = [];

    function init() {
        circleArray = [];

        for (var i = 0; i < 3000; i++) {

            var radius = minRadius;
            var x = Math.random() * (innerWidth - radius * 2) + radius;
            var y = Math.random() * (innerHeight - radius * 2) + radius;
            var dx = (Math.random() - 0.5) * 3;
            var dy = (Math.random() - 0.5) * 3;

            circleArray.push(new Circle(x, y, radius, dx, dy));
        }
    };

    window.addEventListener('resize', 
        function() {
            canvas.width = window.innerWidth / 2 - 40;
            canvas.height = window.innerHeight / 2 - 40;

            init();
        }
    );

    init();

    // Object oriented
    function Circle(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 3 + 1;
        this.minRadius = this.radius;
        this.dx = dx; // speed of x
        this.dy = dy;  // speed of y
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

        this.draw = function() {
            c.beginPath();
            c.arc(this.x, this.y , this.radius, 0, Math.PI * 2, false);
            c.strokeStyle = 'rgb(0, 0, 0, 0.1)';
            c.fillStyle = this.color;
            c.stroke();
            c.fill();
        }

        this.update = function() {
            if (this.x + this.radius > innerWidth 
                || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
    
            if (this.y + this.radius > innerHeight 
                || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
    
            this.x += this.dx;
            this.y += this.dy;

            // interactivity:
            if (mouse.x - this.x < 40 && 
                mouse.x - this.x > -40 &&
                mouse.y - this.y < 40 && 
                mouse.y - this.y > -40) {

                if (this.radius < maxRadius) {
                    this.radius += 1;
                }
            
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
            }

            this.draw();
        }
    }

    // Animation:
    (function animate() {

        requestAnimationFrame(animate);

        c.clearRect(0, 0, innerWidth, innerHeight);

        circleArray.forEach(circle => {
            circle.update();
        });

    })();

}());
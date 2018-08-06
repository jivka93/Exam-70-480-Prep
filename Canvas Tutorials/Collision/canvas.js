var CollisionModule = (function () {

    var canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var c = canvas.getContext('2d');


    var bigBall;
    var smallBall;

    function init() {

        bigBall = new Ball(innerWidth/2, innerHeight/2, 50, colorArray[5]);
        smallBall = new Ball(innerWidth/2, innerHeight/2, 20, colorArray[0]);
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

    window.addEventListener('mousemove',
        function (event) {

            mouse.x = event.x;
            mouse.y = event.y;

        }
    );

    init();

    // Object oriented
    function Ball(x, y, radius, color ){ //, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.strokeStyle = 'rgb(0, 0, 0, 0.1)';
            c.fillStyle = this.color;
            c.stroke();
            c.fill();
        }

        this.update = function () {

            this.draw();
        }
    }

    // Animation:
    (function animate() {

        requestAnimationFrame(animate);

        c.clearRect(0, 0, canvas.width, canvas.height);

        bigBall.update();
        
        smallBall.x = mouse.x;
        smallBall.y = mouse.y;
        
        smallBall.update();

        if ((getDistance(smallBall.x, smallBall.y, bigBall.x, bigBall.y )) < smallBall.radius + bigBall.radius) {
            bigBall.color = colorArray[1];
        } else {
            bigBall.color = colorArray[5];
        }

    })();

})();
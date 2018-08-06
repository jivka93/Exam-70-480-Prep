var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d'); // context

// Fill a rectangle:
// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(400, 300, 130, 100); // (x, y, width, height);

// c.fillStyle = "rgba(0, 0, 255, 0.4)";
// c.fillRect(450, 110, 100, 90);

// c.fillStyle = "rgba(0, 255, 0, 0.5)";
// c.fillRect(50, 50, 100, 80);


// // Line:
// c.beginPath();
// c.moveTo(50, 300); // x, y
// c.lineTo(300, 100);
// c.lineTo(400, 200);
// c.lineTo(600, 100);
// c.strokeStyle = "#fa34a5";
// c.stroke();


// // Multiple circles
// for (var i = 0; i < 20; i++) {

//     var x = Math.random() * window.innerWidth; // random is from 0 to 1
//     var y = Math.random() * window.innerHeight;

//     // Arc/Circle
//     //(x:int, y:int, r:int, startAngle:float, endAngle:float, counterClockwise:bool)
//     c.beginPath();
//     c.arc(x, y , 30, 0, Math.PI * 2, false);
//     c.strokeStyle = "blue";
//     c.stroke();
// }

var maxRadius = 70;
var minRadius = 3;

var colorArray = [
    '#7d0552',
    '#8d7b8d',
    '#4863a0',
    '#2b3856',
    '#342d7e',
];

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', 
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

var circleArray = [];

function init() {
    circleArray = [];

    for (var i = 0; i < 700; i++) {

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
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

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
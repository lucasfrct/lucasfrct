var canvas = document.querySelector('canvas');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

console.log ( "aa ", canvas );

var coor = {
  x: 0,
  y: 400,
};

var pos = {
    x: 0,
    y: 150,
}

var ctx = canvas.getContext('2d');

var center = {
    x: (canvas.width / 2),
    y: (canvas.height / 2),
    deg: 0,
    scale: ( 5 / 1506) * canvas.width,
};

drawFibonacciSpiral(pos, coor);

function drawFibonacciSpiral (p1, p2){
    // Draw spiral -> center viewport at 0,0
    
    var step = 0;
    var deg = center.deg || 0;

    ctx.translate(center.x, center.y);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.translate(-center.x, -center.y);

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        step = step + 0.1;

        if ( step <= 12 ) { 
            window.requestAnimationFrame(loop);
            drawStroke(getSpiral(p1, p2, step, center.scale), center, "rgba(255,0,0,0.9)", (13 - step));
        };


    };

    window.requestAnimationFrame(loop);
};

function getDistance (p1, p2){
    return Math.sqrt(Math.pow(p1.x-p2.x, 2) + Math.pow(p1.y-p2.y, 2));
};

function getAngle (p1, p2){
    return Math.atan2(p2.y-p1.y, p2.x-p1.x);
};

function drawStroke (points, offset, strokeColor, lineWidth ){
    var p = points[0];
    var lineWidth = lineWidth || 1;

    // Default value
    offset = offset || {x:0,y:0}; // Offset to center on screen
    strokeColor = strokeColor || "black";

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;

    ctx.beginPath();
    ctx.moveTo(offset.x + p.x, offset.y + p.y);

    for(var i = 1; i < points.length; i++){
        p = points[i];
        ctx.lineTo(offset.x + p.x, offset.y + p.y);
    }
    ctx.stroke();  // draw it all
    ctx.closePath();
};

function FibonacciGenerator (){
    var thisFibonacci = this;

    thisFibonacci.array = [0, 1, 2];

    thisFibonacci.getDiscrete = function(n){

        // If the Fibonacci number is not in the array, calculate it
        while (n >= thisFibonacci.array.length){
            var length = thisFibonacci.array.length;
            var nextFibonacci = thisFibonacci.array[length - 1] + thisFibonacci.array[length - 2];
            thisFibonacci.array.push(nextFibonacci);
        }

        return thisFibonacci.array[n];
    };

    thisFibonacci.getNumber = function(n){
        var floor = Math.floor(n);
        var ceil = Math.ceil(n);

        if (Math.floor(n) == n){
            return thisFibonacci.getDiscrete(n);
        }

        var a = Math.pow(n - floor, 1.15);

        var fibFloor = thisFibonacci.getDiscrete(floor);
        var fibCeil = thisFibonacci.getDiscrete(ceil);

        return fibFloor + a * (fibCeil - fibFloor);
    };

    return thisFibonacci;
};

function getSpiral (pA, pB, step, scale){

    var precision = 500;
    var startStep = 12 - (step || 0);
    var endStep = 12; // Each "step" is 90º, so 4 steps is a full turn
    var scale = scale || 0.5;

    var angleToPointB = getAngle(pA,pB); // Angle between pA and pB
    var distToPointB = getDistance(pA,pB); // Distance between pA and pB

    var fibonacci = new FibonacciGenerator();

    // Find scale so that the last point of the curve is at distance to pB
    var endRadius = fibonacci.getNumber(endStep);

    // Find angle offset so that last point of the curve is at angle to pB
    var angleOffset = angleToPointB - ( endStep * Math.PI / 2);

    var path = [];

    for (var i = (startStep * precision); i <= (endStep * precision); i++){
        var step = i / precision;

        var radius = fibonacci.getNumber(step);
        var angle = step * Math.PI / 2;

        var p = {
            x: (scale * radius * Math.cos(angle + angleOffset)) + pA.x,
            y: (scale * radius * Math.sin(angle + angleOffset)) + pA.y
        };

        path.push(p);
    }

    return path;
};
var capture;
var pic;
var mask;
let w = 1000;
let h = 500;

//Below I set up the webcam function
function setup() {
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h,
        }
    }, function() {
        console.log('Ready to peep!')
    });
    capture.elt.setAttribute('playsinline', '');
    var canvas = createCanvas(w, h);
    capture.hide();

    pic = loadImage("../assets/Argument.png");
    mask = loadImage("mask.png");
}

//Here I find the brightest pixel in the webcam feed by processing a for loop through each pixel
function findBrightest(video) {
    var brightestValue = 0;
    var brightestPosition = createVector(0, 0);
    var pixels = video.pixels;
    var i = 0;
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var r = pixels[i++];
            var g = pixels[i++];
            var b = pixels[i++];
            i++; 
            var brightness = r + g + b;
            if (brightness > brightestValue) {
                brightestValue = brightness;
                brightestPosition.set(x, y);
              
            }
        }
    }
  
    return brightestPosition;
}

//Create a function that smooths out the points stored so my web feed is not as jittery 
var lastPoint;
function smoothPoint(point, amt) {
    if (!lastPoint) {
        lastPoint = point;
    } else {
        lastPoint.lerp(point, amt);
    }
    return lastPoint.copy();
}

var trailPointsLength = 100;
var trailPoints = [];
function drawTrail(nextPoint) {
    trailPoints.push(nextPoint);
    if (trailPoints.length > trailPointsLength) {
        trailPoints.shift();
    }
    beginShape();
    trailPoints.forEach(function (point) {
        vertex(point.x, point.y);
    })
    endShape();
}

//Here I clear trail so I can use the updated pixel value through every loop
function clearTrail() {
    trailPoints = [];
}
var anotherLastPoint;

function draw() {
    //This acts as the clear so I don't get a trail of my clipping mask
    background(0);

    capture.loadPixels();
    if (capture.pixels.length > 0) { 
        var brightest = findBrightest(capture);

        //Ignore points that are too far from current point
        if (anotherLastPoint) {
            var dist = anotherLastPoint.dist(brightest);
            if (dist > 30) {
                brightest = anotherLastPoint;
            }
        }

        //Smooth out the brightest point movement
        lastPoint = smoothPoint(brightest, 0.01)

        //Masking the mask photo with the Esalen photos

        blendMode(LIGHTEST);
        imageMode(CENTER);

        //Setting the mask to be positioned where the brightest point is
        image(mask,lastPoint.x,lastPoint.y,300,300);

        blendMode(DARKEST);
        imageMode(CORNER);
        image(pic, 0, 0);

                //This first point is the smooothed point 
                var radius = 8;
                noStroke();
                fill(0, 0, 255);

                // And then draw the webcam output and the original jittery point
                //  underneath. This is all offset by height (480)
                image(capture, 0, h, w, h);
                fill(255, 0, 0);
                // ellipse(brightest.x, brightest.y + h, radius, radius);
    }
    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
      }
}
//need to resize the images and make radius bigger.
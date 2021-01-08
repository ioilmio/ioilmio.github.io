let canvas;

let maxParticles, particleBreakDistance, repelDist;
let particles = [];

function setup() {
    canvas = createCanvas((windowWidth), (windowHeight));

    console.log("Canvas Size :" + width + "x" + height);
    canvas.parent('particle');
    frameRate(60);
    strokeWeight(2);
    stroke(255);

    maxParticles = 200;
    repelDist = max(width, height)/8;
    particleBreakDistance = max(width, height) / 40;
    while (particles.length < maxParticles) {
        obj = [createVector(random(width), random(height)), createVector(random(4) - 2, random(4) - 2)];
        particles.push(obj);
    }
}

function drawParticles() {

    colorMode(HSB, 100);
    for (let i = 0; i < particles.length; i++) {
        let posi = particles[i][0];
        for (let j = i + 1; j < particles.length; j++) {
            let posj = particles[j][0];
            let dist = posi.dist(posj);
            if (dist <= particleBreakDistance) {
                strokeWeight(2-(dist/particleBreakDistance));
                stroke(100*(posi.x/width), 90, 90, 255 - 255*dist/particleBreakDistance );
                line(posi.x, posi.y, posj.x, posj.y);
            }
        }
    }

    colorMode(RGB, 255);
    fill(255, 255, 255, 200);
    noStroke();

    let mousePos = createVector(mouseX, mouseY);

    for (let i = 0; i < particles.length; i++) {
        let pos = particles[i][0];
        let speed = particles[i][1];
        let randSize = 3 + random(4);
        ellipse(pos.x, pos.y, randSize, randSize);
        pos.add(speed);

        let distToMouse = mousePos.dist(pos);

        if (distToMouse < repelDist) {
            let repel = createVector(pos.x - mousePos.x, pos.y - mousePos.y);
            let distFrac = (repelDist - distToMouse) / repelDist
            repel.setMag(50 * distFrac * distFrac);
            pos.add(repel);
        }

        if (pos.x > width) {
            pos.x -= width;
            pos.y += random(height / 10) - height / 20;
        }
        else if (pos.x < 0) {
            pos.x += width;
            pos.y += random(height / 10) - height / 20;
        }

        if (pos.y > height) {
            pos.y -= height;
            pos.x += random(width / 10) - width / 20;
        }
        else if (pos.y < 0) {
            pos.y += height;
            pos.x += random(width / 10) - width / 20;
        }
    }

}

function draw() {

    background(0,0,0);

    drawParticles();
    particleBreakDistance = min(particleBreakDistance + 1, width / 12);
    
} 
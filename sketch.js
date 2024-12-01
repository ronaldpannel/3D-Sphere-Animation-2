let r = 150;
let density;
let densitySlider;

let thetaMax, phiMax;
let thetaMaxSlider, phiMaxSlider;
let frequencySlider, frequencySlider2;
let frequency, frequency2;

function setup() {
  canvas = createCanvas(600, 600, WEBGL);
  canvas.parent("container");
  angleMode(DEGREES);
  colorMode(HSB);

  stroke(199, 80, 88);
  strokeWeight(3);
  noFill();

  thetaMax = createDiv();
  thetaMax.parent("container");
  thetaMaxSlider = createSlider(0, 360, 360, 10);
  thetaMaxSlider.parent("container");
  thetaMax.class("valueDisplay");
  thetaMaxSlider.class("Slider");

  phiMax = createDiv();
  phiMax.parent("container");
  phiMaxSlider = createSlider(0, 180, 180, 10);
  phiMaxSlider.parent("container");
  phiMax.class("valueDisplay");
  phiMaxSlider.class("Slider");

  density = createDiv();
  density.parent("container");
  densitySlider = createSlider(0.1, 1, 0.2, 0.1);
  densitySlider.parent("container");
  density.class("valueDisplay");
  densitySlider.class("Slider");

  frequency = createDiv();
  frequency.parent("container");
  frequencySlider = createSlider(1, 10, 1, 0.1);
  frequencySlider.parent("container");
  frequency.class("valueDisplay");
  frequencySlider.class("Slider");

  frequency2 = createDiv();
  frequency2.parent("container");
  frequencySlider2 = createSlider(1, 10, 1, 0.1);
  frequencySlider2.parent("container");
  frequency2.class("valueDisplay");
  frequencySlider2.class("Slider");
}

function draw() {
  background(230, 50, 15);
  orbitControl(4, 4);

  rotateY(90);
  rotateZ(65);
 
  bumpySphere();

  thetaMax.html("Theta max value: " + thetaMaxSlider.value());
  phiMax.html("Phi max value: " + phiMaxSlider.value());

  let displayDensity = int(map(densitySlider.value(), 3, 62, 1, 60));
  density.html("Density value: " + displayDensity);

  frequency.html("Frequency: " + frequencySlider.value());
  frequency2.html("Frequency2: " + frequencySlider2.value());
}
function windowResized() {
  resizeCanvas(600, 600);
}


function bumpySphere() {
  for (let phi = 0; phi < phiMaxSlider.value(); phi += 2) {
    beginShape(POINTS);
    for (let theta = 0; theta < thetaMaxSlider.value(); theta += 2) {
      let x = r * (1 + densitySlider.value() * sin(theta * 6) * sin(phi * 5)) * cos(phi);
      let y =
        r *
        (1 +
          0.2 *
            sin(theta * frequencySlider.value()) *
            sin(phi * frequencySlider2.value())) *
        sin(phi) *
        sin(theta);
      let z =
        r *
        (1 +
          densitySlider.value() *
            sin(theta * frequencySlider.value()) *
            sin(phi * frequencySlider2.value())) *
        sin(phi) *
        cos(theta);
      vertex(x, y, z);
    }
    endShape();
  }
}

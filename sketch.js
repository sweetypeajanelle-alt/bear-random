let gifs = [];
let sequence = [];
let currentIndex = 0;
let startTime = 0;
let isWaiting = false;
let delayTime = 1000; // 1 second
let delayStart = 0;
function preload() {
	gifs = [{
			img: loadImage('bear-heart.gif'),
			duration: 8800
		},
		{
			img: loadImage('bear-shy.gif'),
			duration: 11900
		},
		{
			img: loadImage('bear-walking.gif'),
			duration: 7000
		}
	];
}

function setup() {
	createCanvas(800, 800);
	sequence = shuffle(gifs);
	startGif();

}

function draw() {
  background("white");

  let currentGif = sequence[currentIndex];

  imageMode(CENTER);

  // Only draw gif if we're not in delay
  if (!isWaiting) {
    image(currentGif.img, width / 2, height / 2, 800, 800);

    // check if gif finished
    if (millis() - startTime > currentGif.duration) {
      isWaiting = true;
      delayStart = millis();
    }
  } else {
    // during delay (screen stays blank or background only)

    if (millis() - delayStart > delayTime) {
      // move to next gif after delay
      currentIndex++;

      if (currentIndex >= sequence.length) {
        sequence = shuffle(gifs);
        currentIndex = 0;
      }

      startGif();
      isWaiting = false;
    }
  }
}

function startGif() {
	startTime = millis();

	// restart gif from beginning
	sequence[currentIndex].img.reset();
}

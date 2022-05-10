let config = {
    type: Phaser.CANVAS,
    width: 1080,
    height: 720,
    scene: [ Menu, Play ],
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    }
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = 0;
let borderPadding = 0;

let highscore = 0;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, pointer;
let keyW, keyQ, keyE, keyA, keyS, keyD, keyP;


let centerX = game.config.width/2;
let centerY = game.config.height/2;

let player;
let kill_count = 0;
let in_bossfight = false;

let current_phase = 0;

let padding = 70;
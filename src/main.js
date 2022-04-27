let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
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
let keyF, keyR, keyLEFT, keyRIGHT;
let keyW, keyQ, keyE, keyA, keyS, keyD, keyP;


let centerX = game.config.width/2;
let centerY = game.config.height/2;

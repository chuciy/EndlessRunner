class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2, 'W to start, P to turn on/off debug', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 50, 'WASD moving, left key to shoot', menuConfig).setOrigin(0.5);
        // define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.keyLEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.keyRIGHT);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
          game.settings = {
            gameTimer: 60000    
          }

          this.scene.start("playScene");    
        }
      }
}
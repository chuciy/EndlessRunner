class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
      this.load.image('cover', './assets/Night_of_the_Hunt.png');



      this.load.audio('bgm', 'assets/background_music .mp3');
      this.load.audio('sfx_arrow', 'assets/sfx_arrow.wav');
      this.load.audio('sfx_bloodmoon', 'assets/sfx_bloodmoon.wav');
      this.load.audio('sfx_enemy_death', 'assets/sfx_enemy_death.wav');
      this.load.audio('sfx_magic_bullet', 'assets/sfx_magic_bullet.wav');
      this.load.audio('sfx_miniboss_death', 'assets/sfx_miniboss_death.wav');
      this.load.audio('sfx_player_hurt', 'assets/sfx_player_hurt.wav');
      this.load.audio('sfx_teleport', 'assets/sfx_teleport.wav');
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#101010',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.background = this.add.image(0, 0, 'cover').setOrigin(0, 0);
        // show menu text

        this.add.text(10, game.config.height/1.5, 'W to start, P to turn on/off debug', menuConfig).setOrigin(0);
        this.add.text(10, game.config.height/1.5 + 50, ' Mouse moving,\n F to fire, SPACE to dodge', menuConfig).setOrigin(0);
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
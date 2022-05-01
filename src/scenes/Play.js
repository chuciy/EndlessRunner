class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('self', './assets/self.png');
        this.load.image('bullet', './assets/bullet.png');
        this.load.image('enemy1', './assets/enemy1.png');
        this.load.image('boss', './assets/boss.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('particle', './assets/particle.png');
    }

    create() {
        this.physics.world.setFPS(144);
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background

        player = new Rocket(this, 0, 0, 'self').setOrigin(0.5, 0.5);
        this.bullets = this.bullets = new Bullets(this);
        this.input.on('pointerdown', (pointer) => {
            this.bullets.fireBullet(player.x, player.y);
        });

        this.input.keyboard.on('keydown-P', () => {
            this.physics.world.drawDebug = !this.physics.world.drawDebug;
            this.physics.world.debugGraphic.clear();
        });

        this.input.keyboard.on('keydown-P', () => {
            this.physics.world.drawDebug = !this.physics.world.drawDebug;
            this.physics.world.debugGraphic.clear();
        });

        // # particle
        this.particles = this.add.particles('particle');
        this.emitter = this.particles.createEmitter();

        this.enemy_group = this.add.group({runChildUpdate: true});
        this.addEnemy(1);
        this.addEnemy2();

        
        // define keys
        this.defineKeys();

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.hitpoint = 0;
        // #text
        this.timer_text = this.add.text(32, 32);
        this.debugging_text = this.add.text(32, 400);
        this.debugging_text.setText("hit: " + String(this.hitpoint));

        // GAME OVER flag
        this.gameOver = false;


        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            // # update high score
            highscore = Math.max(highscore, this.p1Score);
            this.scoreRight = highscore;
        }, null, this);

        this.level = 0;
        this.timePassed = 0;
        this.generalTimer = this.time.addEvent({
            delay: 1000,
            callback: this.generateEnemy,
            callbackScope: this,
            loop: true
        });


    }

    generateEnemy(){
        this.timePassed += 1;
        this.level = this.timePassed / 5 + 1;
        if( this.timePassed % 2 == 0){
            this.addEnemy(this.level);
        }
        if(this.timePassed % 10 == 0){
            this.addEnemy2();
        }
    }

    addEnemy(level) {
        this.enemy = new Enemy(this, "enemy1", level);
        this.enemy_group.add(this.enemy);
    }

    addEnemy2(){
        this.boss = new CleverEnemy(this, "boss");
        this.enemy_group.add(this.boss);
    }
    enemyCollision(player, var2){
        this.hitpoint += 1;
        this.debugging_text.setText("hit: " + String(this.hitpoint));
        console.log(var2.body.velocity);
        var2.destroy();
        
    }

    bullet_hit_enemy(enemy, var2){
        enemy.destroy();
        var2.setActive(false);
        var2.setVisible(false);
        var2.y = 0;
    }

    update() {
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= (4 + this.level);  // update tile sprite

        if(!this.gameOver) {
            
            this.physics.world.collide(player, this.enemy_group, this.enemyCollision, null, this);
            this.physics.world.collide(this.bullets, this.enemy_group, this.bullet_hit_enemy, null, this);
            //timer
            this.timer_text.setText('Time remaining: ' + this.clock.getRemainingSeconds().toString().substr(0, 4));
            // ----------------------
            player.update();    
        }



    }

    
    defineKeys() {
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }
}
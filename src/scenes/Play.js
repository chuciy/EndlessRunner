class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('self', './assets/player.png');
        this.load.image('bullet', './assets/bullet.png');
        this.load.image('enemy1', './assets/enemy1.png');
        this.load.image('boss', './assets/boss.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('particle', './assets/particle.png');
    }

    create() {
        
        
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 1080, 720, 'starfield').setOrigin(0, 0);
        // green UI background

        player = new Rocket(this, 0, 0, 'self').setOrigin(0.5, 0.5);

        let tst = new Phaser.Math.Vector2(10, 29);
        console.log(tst.normalize());

        this.bullets = this.bullets = new Bullets(this);
        /*
        this.input.on('pointerdown', (pointer) => {
            this.bullets.fireBullet(player.x, player.y);
        });
        */
        this.input.keyboard.on('keydown-F', () => {
            this.bullets.fireBullet(player.x, player.y);
        });


        this.input.keyboard.on('keydown-P', () => {
            this.physics.world.drawDebug = !this.physics.world.drawDebug;
            this.physics.world.debugGraphic.clear();
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            player.skill();
        });


        this.enemy_group = this.add.group({runChildUpdate: true});
        this.addEnemy(1);

        
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

        this.debugging_text2 = this.add.text(32, 700);

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


        in_bossfight = false;
    }

    generateEnemy(){
        if(!this.gameOver){
            this.timePassed += 1;
            let t = this.timePassed;
            this.level = -1/1200 * t * t + 0.1 * t;
            this.debugging_text2.setText("speed: " + String(this.level));
            
            if(!in_bossfight){
                if( this.timePassed % 2 == 0){
                    this.addEnemy(this.level);
                }
            }            
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
        enemy.on_hit();
        var2.setActive(false);
        var2.setVisible(false);
        var2.y = 0;
    }

    on_kill(){
        kill_count += 1;
        if(kill_count == 2){
            in_bossfight = true;
            this.addEnemy2();
            kill_count == 0;
        }
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
        pointer = this.input.mousePointer;
    }
}
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('self', './assets/player_1.png');
        //this.load.image('bullet', './assets/magic_bullet.png');
        //this.load.image('enemy1', './assets/enemy1.png');
        //this.load.image('boss', './assets/boss.png');
        this.load.image('starfield', './assets/night_background.png');
        this.load.image('bloodmoon', './assets/blood_moon_background.png');
        this.load.image('particle', './assets/particle.png');
        this.load.image('item1', './assets/item1.png');
        this.load.image('item2', './assets/item2.png');
        this.load.image('forest', './assets/Forest_Background.png');
        //this.load.image('projectile', './assets/projectile.png');

        this.load.spritesheet('boss', './assets/Spirit_Archer-Sheet.png', {frameWidth: 96, frameHeight: 128, startFrame: 0, endFrame: 3});
        this.load.spritesheet('projectile', './assets/Spirit_Arrow-Sheet.png', {frameWidth: 128, frameHeight: 32, startFrame: 0, endFrame: 1});
        this.load.spritesheet('bullet', './assets/magic_bullet-Sheet.png', {frameWidth: 48, frameHeight: 32, startFrame: 0, endFrame: 6});
        this.load.spritesheet('enemy1', './assets/Spirit_enemy-Sheet.png', {frameWidth: 64, frameHeight: 48, startFrame: 0, endFrame: 3});



        this.load.spritesheet('player_idle', './assets/witch_player-sheet.png', {frameWidth: 138, frameHeight: 96, startFrame: 0, endFrame: 3});
    }
    create_animation(){
        this.anims.create({
            key: 'boss',
            frames: 'boss',
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'player_idle',
            frames: 'player_idle',
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'projectile',
            frames: 'projectile',
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'bullet',
            frames: 'bullet',
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'enemy1',
            frames: 'enemy1',
            frameRate: 20,
            repeat: -1
        });


    }

    create() {
        this.physics.world.drawDebug = !this.physics.world.drawDebug;
        this.physics.world.debugGraphic.clear();

        this.ITEMLIST = ["item1", "item2", "ITEM3"];
        this.BGLIST = ['starfield', 'bloodmoon']
        
        this.create_animation();

        this.background = this.add.image(0, 0, 'starfield').setOrigin(0, 0);
        this.forest = this.add.tileSprite(0, 0, 1080, 720, 'forest').setOrigin(0, 0);

        this.p_health_bar = this.makeBar(10,20,0x2ecc71)
        this.end = false;
        this.cam = this.cameras.main;


        this.bgm = this.sound.play("bgm", {loop: -1});

        player = new Rocket(this, 0, 0, 'player_idle').setOrigin(0.5, 0.5);
        player.anims.play("player_idle");


        this.bullets = new Bullets(this);
        this.projectiles = new Projectiles(this);

        this.input.keyboard.on('keydown-F', () => {
            this.sound.play("sfx_magic_bullet");
            this.bullets.fireBullet(player.x + 46, player.y -26);
        });


        this.input.keyboard.on('keydown-P', () => {
            this.physics.world.drawDebug = !this.physics.world.drawDebug;
            this.physics.world.debugGraphic.clear();
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            //let cooldown = this.total_timer - 3;
            //if(cooldown < ){
            player.skill();
            //}
        });


        this.enemy_group = this.add.group({runChildUpdate: true});
        this.item_group = this.add.group({runChildUpdate: true});
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


        // GAME OVER flag
        this.gameOver = false;


        scoreConfig.fixedWidth = 0;
        /*
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            // # update high score
            highscore = Math.max(highscore, this.p1Score);
            this.scoreRight = highscore;
        }, null, this);
        */

        this.level = 0;

        this.total_timer = 1;
        this.loop_timer = 1;
        in_bossfight = false;

        // #text
        this.timer_text = this.add.text(32, 32);
        this.debugging_text = this.add.text(32, 400);
        this.debugging_text.setText("Distance: " + String(this.total_timer));

        this.debugging_text2 = this.add.text(32, 700);


        
    }
    
    onKillingBoss(){
        console.log("Bosskilled");
        current_phase++;
        in_bossfight = false;
        this.background.setTexture(this.BGLIST[current_phase < 2 ? 0 : 1]);
        if(current_phase == 2){
            this.sound.play("sfx_bloodmoon");

        }
    }

    generateItem(){
        console.log("test");
    }
    generateEnemy(){
        if(!this.gameOver){
            let t = this.total_timer;
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
        let enemy = new Enemy(this, "enemy1", level);
        this.enemy_group.add(enemy);
        enemy.anims.play('enemy1', true);  
    }

    addEnemy2(){
        let boss = new CleverEnemy(this, "boss");
        this.enemy_group.add(boss);
        boss.anims.play('boss', true);  
    }

    addItem(){
        let r = Math.floor(Math.random() * 2);
        let item = new Item(this, this.ITEMLIST[r]);
        this.item_group.add(item);
    }

    itemCollision(player, var2){
        var2.on_collide();
    }

    enemyCollision(player, var2){
        this.sound.play("sfx_player_hurt");
        this.hitpoint += 1;
        var2.on_hit();
        
    }

    bullet_hit_enemy(enemy, var2){
        enemy.on_hit();
        var2.setActive(false);
        var2.setVisible(false);
        var2.y = -50;
    }

    on_kill(){
        kill_count += 1;
        console.log(kill_count);
        if(kill_count % 3 == 0){
            in_bossfight = true;
            this.addEnemy2();
        }
    }

    player_on_hit(player, ps){
        this.sound.play("sfx_player_hurt");
        this.hitpoint += 1;
        ps.setActive(false);
        ps.setVisible(false);
        ps.y = -50;
    }
    makeBar(x, y,color) {
        //draw the bar
        let bar = this.add.graphics();

        //color the bar
        bar.fillStyle(color, 1);

        //fill the bar with a rectangle
        bar.fillRect(0, 0, 500, 25);
        
        //position the bar
        bar.x = x;
        bar.y = y;

        //return the bar
        return bar;
    }



    //=-====================================================
    //=-====================================================
    update(time, delta) {

        if(this.end){return;}

        if(this.hitpoint >= 20){
            this.end = true;
            this.cam.pan(player.x, player.y, 2000, 'Sine.easeInOut');
            this.cam.zoomTo(1, 12);
            player.setVelocity(0,0);

            this.time.delayedCall(3000, () => {
                this.scene.start("menuScene");  
            });
            return;
        }



        this.loop_timer += delta;
        this.debugging_text.setText("Distance: " + String(this.total_timer) + " m");
        if(this.loop_timer >= 1000){

            this.total_timer += 1;
            this.loop_timer -= 1000;

            this.level = -1/1200 * this.total_timer * this.total_timer + 0.1 * this.total_timer;
            this.debugging_text2.setText("speed: " + String(this.level));

            if(this.total_timer % 2 == 0){
                if(!this.gameOver){
                    if(!in_bossfight){
                        this.addEnemy(this.level);
                    }            
                }
            }
            if(this.total_timer % 10 == 0){
                this.addItem();
            }
        }

        this.forest.tilePositionX += 2.0 * this.level;


        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        //this.starfield.tilePositionX += (4 + this.level);  // update tile sprite

        if(!this.gameOver) {

            this.physics.world.collide(player, this.item_group, this.itemCollision, null, this);
            this.physics.world.collide(player, this.enemy_group, this.enemyCollision, null, this);
            this.physics.world.collide(player, this.projectiles, this.player_on_hit, null, this);
            this.physics.world.collide(this.bullets, this.enemy_group, this.bullet_hit_enemy, null, this);

            // ----------------------
            player.update();    
        }


        this.p_health_bar.scaleX = Math.max(20 - this.hitpoint, 0) / 20;

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
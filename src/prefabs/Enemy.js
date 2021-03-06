class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, texture, level) {
        super(scene, game.config.width, Phaser.Math.Between(padding, game.config.height - padding), texture); 
        scene.add.existing(this);              
        scene.physics.add.existing(this);    
        this.setImmovable();


        const BASE_SPEED = -200;
        this.setVelocityX(level * BASE_SPEED);
    }

    update() {
        if(this.x < -this.width) {
            this.destroy();
        }
    }
    on_hit(){
        this.scene.sound.play("sfx_enemy_death");
        this.scene.on_kill();
        this.destroy();
    }
    on_collide(){

    }
}



class CleverEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, texture) {
        super(scene, game.config.width, Phaser.Math.Between(padding, game.config.height - padding), texture); 
        scene.add.existing(this);             
        scene.physics.add.existing(this);       
        this.setImmovable();

        //this.setVelocityX(-100);                             
        this.setCollideWorldBounds(true);
        this.setBounce(0.5);

        this.shoot_cooldown = 0;

        this.setMaxVelocity(600, 500);

        this.hp = 6 + (Math.floor(Math.random() * 3) - 1);
        this.curvex = [0, 270, 70, 0];
        this.curvey = [0, 180, -360, 270];

        this.projectiles = scene.projectiles;

        this.move = false;
        this.v2 = new Phaser.Math.Vector2();
        this.t = 0;

        this.rotate = 0;

    }
    on_hit(){
        this.hp -= 1;
        console.log("remain: "+ String(this.hp));

        if(this.hp == 0){
            this.scene.sound.play("sfx_miniboss_death");
            this.scene.onKillingBoss();
            this.destroy();
            in_bossfight = false;
            return;
        }

        this.curve();

        this.scene.time.addEvent({
            delay: 1000,
            callback: function(){ 
                //this.curve();
            },
            callbackScope: this,
        });
    }

    on_collide(){
        
    }
    
    update(time, delta) {
        this.shoot_cooldown += delta;

        if(!this.move){
            if(this.shoot_cooldown >= 2000){
                this.scene.sound.play("sfx_arrow");
                this.shoot_cooldown -= 2000;
                this.setAccelerationX((Math.random() - 0.5) * 500);
                this.setAccelerationY((Math.random() - 0.5) * 500);
                this.projectiles.fireBullet(this.x, this.y);
            }
        }else{
            this.t += delta;

            let dx = Phaser.Math.Interpolation.Bezier(this.curvex, this.t / 1500);
            let dy = Phaser.Math.Interpolation.Bezier(this.curvey, this.t / 1500);
            let v = new Phaser.Math.Vector2(dx, dy);
            v.rotate(this.rotate);
            this.x = Math.max(Math.min(this.v2.x + v.x, 1040), 540);
            this.y = Math.max(Math.min(this.v2.y + v.y, 680), 40);

        }


        if(this.x <= game.config.width / 2){
            this.setVelocityX(250);
        }
        /*
        if(Phaser.Input.Keyboard.JustDown(keyE)) {
            this.move = true;
            this.v2 = new Phaser.Math.Vector2(this.x, this.y);
            this.t = 0;
            this.setVelocity(0, 0);
            this.setAcceleration(0, 0);
            let k = this;
            this.scene.time.delayedCall(1500, () => {
                k.move = false;
            }, null, this);
        }
        */

        this.setRotation(Math.atan((this.y - player.y) / (this.x - player.x))); //rotate towards player
    }

    curve(){
        this.move = true;
        this.v2 = new Phaser.Math.Vector2(this.x, this.y);
        this.t = 0;
        this.rotate = Math.random() * 2 * Math.PI;
        this.setVelocity(0, 0);
        this.setAcceleration(0, 0);
        let k = this;
        this.scene.time.delayedCall(1500, () => {
            k.move = false;
        }, null, this);
    }
}


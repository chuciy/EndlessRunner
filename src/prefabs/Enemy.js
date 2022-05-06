class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, texture, level) {
        super(scene, game.config.width, Phaser.Math.Between(padding, game.config.height - padding), texture); 
        scene.add.existing(this);              
        scene.physics.add.existing(this);    
        this.setImmovable();


        const BASE_SPEED = -250;
        this.setVelocityX(level * BASE_SPEED);
    }

    update() {
        if(this.x < -this.width) {
            this.destroy();
        }
    }
    on_hit(){
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

        this.hp = 2;

        this.projectiles = scene.projectiles;

    }
    on_hit(){
        this.hp -= 1;
        if(this.hp == 0){
            this.destroy();
            in_bossfight = false;
        }
    }

    on_collide(){
        
    }
    
    update(time, delta) {
        this.shoot_cooldown += delta;

        if(this.shoot_cooldown >= 2000){
            this.shoot_cooldown -= 2000;
            this.setAccelerationX((Math.random() - 0.5) * 500);
            this.setAccelerationY((Math.random() - 0.5) * 500);
            this.projectiles.fireBullet(this.x, this.y);
        }


        if(this.x <= game.config.width / 2){
            this.setVelocityX(250);
        }


        this.setRotation(Math.atan((this.y - player.y) / (this.x - player.x))); //rotate towards player
    }
}


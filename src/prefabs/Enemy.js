class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, texture, level) {
        super(scene, game.config.width, Phaser.Math.Between(0, game.config.height), texture); 
        scene.add.existing(this);              
        scene.physics.add.existing(this);    
        this.setImmovable();

        const vx = -250;
        this.setVelocityX(level * vx);                                       

    }

    update() {
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}

class CleverEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, texture) {
        super(scene, game.config.width, Phaser.Math.Between(0, game.config.height), texture); 
        scene.add.existing(this);             
        scene.physics.add.existing(this);       
        this.setImmovable();
        this.setVelocityX(-100);                             
        this.setCollideWorldBounds(true);
        this.setBounce(0.5);
        this.time_count = 0;
        this.setMaxVelocity(600, 500);

    }

    update() {

        this.time_count++;
        if(this.x <= game.config.width / 2){
            this.setVelocityX(250);
        }
        if(this.time_count == 144){
            //console.log(this.body.velocity);
            this.time_count = 0;
            this.setAccelerationX((Math.random() - 0.5) * 500);
            this.setAccelerationY((Math.random() - 0.5) * 500);
        }
    }
}
class Rocket extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, 50, 240, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);   
        this.moveSpeed = 2;         
        this.setImmovable();


        this.setCollideWorldBounds(true);
        this.setBounce(0.5);

        this.count = 0;

        //state
        
        this.STATES = {
            DEFAULT: 1,
            DASH: 2
        };
        this.state = this.STATES.DEFAULT;
    }
    update() {
        const BASE_SPEED = 200;
        if(this.state == this.STATES.DEFAULT){
            this.setVelocityX(this.body.velocity.x * 0.99);
            this.setVelocityY(this.body.velocity.y * 0.99);
    
            let dirX =  pointer.x - this.x;
            let dirY =  pointer.y - this.y;
            if(pointer.isDown && Math.abs(dirX) >= 20 && Math.abs(dirY) >= 20){
                
                let sqrtXY = Math.sqrt(dirX * dirX + dirY * dirY);
                this.setVelocityX(dirX / sqrtXY * BASE_SPEED * this.moveSpeed);
                this.setVelocityY(dirY / sqrtXY * BASE_SPEED * this.moveSpeed);
                
            }
        }
    }

    skill(){
        if(this.state == this.STATES.DEFAULT){
            let dir = (pointer.position.subtract(this.getCenter())).normalize();
            let tween = this.scene.tweens.add({
                targets: this,
                x: this.x + dir.x * 300,
                y: this.y + dir.y * 300,
                ease: 'Power1',
                duration: 400,
                onStart: function (tween, targets) {targets[0].state = targets[0].STATES.DASH;},
                onComplete: function (tween, targets) {targets[0].state = targets[0].STATES.DEFAULT;},
            });
        }
        
    }
    
}

class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 3,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x, y)
    {
        let bullet = this.getFirstDead(false);

        if (bullet)
        {
            bullet.fire(x, y);
        }
    }
}

class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');
    }

    fire (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityX(700);
        this.setAccelerationX(1000);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        if (this.x >= game.config.width)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
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

        /*
        let self = this;
        scene.input.on("pointermove", function(pointer){
            scene.tweens.add({
                targets: self,
                x: pointer.x,
                y: pointer.y,
                ease: 'Sine.easeOut',
                duration: 1000,
                onStart: function (tween, targets) {console.log(targets);},
            });
        });
        */


    }
    update() {
        const BASE_SPEED = 200;
        if(this.state == this.STATES.DEFAULT){
            //this.setVelocityX(this.body.velocity.x * 0.99);
            //this.setVelocityY(this.body.velocity.y * 0.99);
            
            /*
            let dirX =  pointer.x - this.x;
            let dirY =  pointer.y - this.y;
            if(pointer.isDown && Math.abs(dirX) >= 20 && Math.abs(dirY) >= 20){
                
                let sqrtXY = Math.sqrt(dirX * dirX + dirY * dirY);
                this.setVelocityX(dirX / sqrtXY * BASE_SPEED * this.moveSpeed);
                this.setVelocityY(dirY / sqrtXY * BASE_SPEED * this.moveSpeed);
                
            }
            */

            this.scene.tweens.add({
                targets: this,
                x: pointer.x,
                y: pointer.y,
                ease: 'Sine.easeOut',
                duration: 1000,
                onStart: function (tween, targets) {},
            });
        }
    }

    skill(){
        if(this.state == this.STATES.DEFAULT){
            
            let dir = (pointer.position.subtract(this.getCenter())).normalize();
            
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

        this.setVelocityX(350);
        this.setAccelerationX(500);
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
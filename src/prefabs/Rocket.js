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
        const BASE_SPEED = 135;
        if(this.state == this.STATES.DEFAULT){
            
            let dirX =  pointer.x - this.x;
            let dirY =  pointer.y - this.y;

            
            if((dirX * dirX + dirY * dirY)  >= 50){
                let sqrtXY = Math.sqrt(dirX * dirX + dirY * dirY);
                this.setVelocityX(dirX / sqrtXY * BASE_SPEED * this.moveSpeed);
                this.setVelocityY(dirY / sqrtXY * BASE_SPEED * this.moveSpeed);
                
            }else{
                this.setVelocityX(0);
                this.setVelocityY(0);
            }
            

            /*
            this.movement = this.scene.tweens.add({
                targets: this,
                x: pointer.x,
                y: pointer.y,
                ease: 'Power0',
                duration: 1000,
                onStart: function (tween, targets) {},
            });
            */
        }
    }

    skill(){

        if(this.state == this.STATES.DEFAULT){

            const RANGE = 150;
            this.tst = this.scene.tweens.add({
                targets: this,
                alpha: { from: 0, to: 1 }, 
                duration: 200, 
                onStart: function (tween, target) {
                    let self = target[0];
                    let dirX =  pointer.x - self.x;
                    let dirY =  pointer.y - self.y;
                    let sqrtXY = Math.sqrt(dirX * dirX + dirY * dirY);

                    if(dirX * dirX + dirY * dirY <= RANGE * RANGE){
                        self.setVelocityX(self.body.velocity.x * 0);
                        self.setVelocityY(self.body.velocity.y * 0);
                        self.x = pointer.x;
                        self.y = pointer.y;
                    }else{
                        self.x += dirX / sqrtXY * RANGE;
                        self.y += dirY / sqrtXY * RANGE;
                    }
                    target[0].state = target[0].STATES.DASH;
                },
                onComplete: function (tween, target) {target[0].state = target[0].STATES.DEFAULT;}
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
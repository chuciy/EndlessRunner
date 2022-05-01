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
    }
    update() {
        // WASD movement -> 8 direction
        this.count++;
        if(this.count % 60 == 0){
            console.log(1);
        }
        
        this.setVelocity(this.body.velocity.x * 0.99, this.body.velocity.y * 0.99);
        const base_v = 100;
        if(keyW.isDown) {
            this.setVelocityY(-base_v * this.moveSpeed);
        } else if (keyS.isDown) {
            this.setVelocityY(base_v * this.moveSpeed);
        }

        if (keyA.isDown) {
            this.setVelocityX(-base_v * this.moveSpeed);
        } else if (keyD.isDown) {
            this.setVelocityX(base_v * this.moveSpeed);
        }
    }

    skill(){

       this.x += 200 * (this.body.velocity.x) / Math.abs(this.body.velocity.x)
       this.y += 200 * (this.body.velocity.y) / Math.abs(this.body.velocity.y)
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

        this.setVelocityX(500);
        this.setAccelerationX(1000);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        if (this.x >= 700)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
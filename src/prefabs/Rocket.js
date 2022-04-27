class Rocket extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, 50, 240, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);   
        this.moveSpeed = 2;         
        this.setImmovable();
    }
    update() {
        // WASD movement -> 8 direction
        if(keyW.isDown && this.y >= this.height) {
            this.y -= this.moveSpeed;
        } else if (keyS.isDown && this.y <= game.config.height - this.height) {
            this.y += this.moveSpeed;
        }

        if (keyA.isDown && this.x >= this.width) {
            this.x -= this.moveSpeed;
        } else if (keyD.isDown && this.x <= game.config.width - this.width) {
            this.x += this.moveSpeed;
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
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
        this.loop_timer = 0;

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

class Projectiles extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 30,
            key: 'projectile',
            active: false,
            visible: false,
            classType: Projectile
        });
    }

    fireBullet (sx, sy)
    {
        let bullet = this.getFirstDead(false);

        if (bullet)
        {
            bullet.fire(sx, sy);
        }
    }
}

class Projectile extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'projectile');
    }

    fire (sx, sy)
    {
        let dirX =  player.x - sx;
        let dirY =  player.y - sy;
        console.log(this);
        this.body.reset(sx, sy);
        this.setRotation(Math.atan((dirY) / (dirX)));

        this.setActive(true);
        this.setVisible(true);


        let sqrtXY = Math.sqrt(dirX * dirX + dirY * dirY);

        this.setVelocityX(dirX / sqrtXY * 1000);
        this.setVelocityY(dirY / sqrtXY * 1000);
    }

    preUpdate (time, delta)
    {   

        super.preUpdate(time, delta);

        if (this.x <= -20)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
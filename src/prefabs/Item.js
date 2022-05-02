class Item extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, texture) {
        super(scene, game.config.width, Phaser.Math.Between(padding, game.config.height - padding), texture); 
        scene.add.existing(this);              
        scene.physics.add.existing(this);    
        this.setImmovable();


        const BASE_SPEED = -350;
        this.setVelocityX(BASE_SPEED);

        this.item_type = texture;
    }

    update() {
        this.rotation += 0.01;
        if(this.x < -this.width) {
            this.destroy();
        }
    }
    on_hit(){

    }
    on_collide(){
        
        if(this.item_type == "item1"){
            console.log("item1");
        }else if(this.item_type == "item2"){
            console.log('item2');
        }
        this.destroy();
    }
}

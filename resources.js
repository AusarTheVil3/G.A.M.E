export class Resources {
    constructor(scene) {
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(150,150,'Diamond').setScale(1);
        this.sprite.setAllowGravity(false);
        //setGravity(0, 0);
    }

    update() {

    }
}   
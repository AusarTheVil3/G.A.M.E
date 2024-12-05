
export class Level {
    constructor(scene) {
        this.scene = scene;
        this.createBase();
        this.createGround();
        this.createPlatforms();
    }

    createBase() {
        // Create the base at the top
        this.scene.add.image(window.innerWidth / 2, 100, 'base').setOrigin(0.5, 0.5).setScale(2);
    }

    createGround() {
        // Create the ground
        this.ground = this.scene.physics.add.staticGroup();
    }

    createPlatforms() {
        // Create platforms
        this.platforms = this.scene.physics.add.staticGroup();
    }
}

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
        this.ground.create(window.innerWidth / 2, window.innerHeight - 20, 'ground').setScale(7).refreshBody();
    }

    createPlatforms() {
        // Create platforms
        this.platforms = this.scene.physics.add.staticGroup();
        this.platforms.create(200, 400, 'ground').setScale(5).refreshBody();
        this.platforms.create(200, 200, 'ground').setScale(5).refreshBody();
        this.platforms.create(200, 300, 'ground').setScale(5).refreshBody();
        this.platforms.create(600, 300, 'ground').setScale(3).refreshBody();
        this.platforms.create(400, 200, 'ground').setScale(6).refreshBody();
        this.platforms.create(1000, 500, 'ground').setScale(1).refreshBody();
    }
}

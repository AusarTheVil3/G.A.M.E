export class Player {
    constructor(scene) {
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(100, 450, 'player').setScale(1);
        this.sprite.setBounce(0.2);
        this.sprite.setCollideWorldBounds(true);

        // Input controls (WASD)
        this.cursors = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
    }

    update() {
        // Player movement controls
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(160);
        } else {
            this.sprite.setVelocityX(0);
        }

        // Jumping mechanics
        if (this.cursors.space.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-300); // Jump height
        }
    }
}

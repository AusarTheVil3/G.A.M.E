var centerX = 1250 / 4, centerY = 850 / 4;
export class Player {

    preload(){
        // Load the spritesheets for idle and walking animations
        this.scene.load.spritesheet('player_idle', 'assets/spritesheets/hero_idlesheet.png', { frameWidth: 44, frameHeight: 48 });
        this.scene.load.spritesheet('player_walk', 'assets/spritesheets/hero_walkingsheet.png', { frameWidth: 44, frameHeight: 48 });
    }
    
    create(){
        console.log('Player creation');

        this.sprite.setScale(1.5);

        // Use the sprite initialized in the constructor
        this.sprite.setTexture('player_idle');

        // Define animations for idle and walking
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('player_idle', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('player_walk', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        // Start with the idle animation
        this.sprite.anims.play('idle');
    }

    constructor(scene) {
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(centerX, centerY, 'player_idle').setScale(1);
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
        // Movement controls
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-160);
            this.sprite.setScale(-1, 1);  // Flip sprite for left movement
            if (this.sprite.anims.currentAnim.key !== 'walk') {
                this.sprite.anims.play('walk');
            }
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(160);
            this.sprite.setScale(1, 1);  // Face sprite right
            if (this.sprite.anims.currentAnim.key !== 'walk') {
                this.sprite.anims.play('walk');
            }
        } else {
            // No horizontal input - go idle
            this.sprite.setVelocityX(0);
            if (this.sprite.anims.currentAnim.key !== 'idle') {
                this.sprite.anims.play('idle');
            }
        }

        // Jumping mechanics
        if (this.cursors.space.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-300); // Jump height
        }
    }
}

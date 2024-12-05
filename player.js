var centerX = 800 / 2, centerY = 800 / 2;
var scale = 2;
export class Player {

    static preload(scene){
        // Load the spritesheets for idle and walking animations
        scene.load.spritesheet('player_idle', 'assets/spritesheets/hero_idlesheet.png', { frameWidth: 44, frameHeight: 48 });
        scene.load.spritesheet('player_walk', 'assets/spritesheets/hero_walkingsheet.png', { frameWidth: 44, frameHeight: 48 });
        scene.load.spritesheet('player_jump', 'assets/spritesheets/hero_jumpsheet.png', { frameWidth: 44, frameHeight: 48 });
        scene.load.spritesheet('player_basicattack', 'assets/spritesheets/hero_walkingsheet.png', { frameWidth: 44, frameHeight: 48 });
        

    }   
    
    create(){
        console.log('Player creation');
        

        const scaleFactor = 0.7; // Example: scale down the collision box to 80%
        this.sprite.setScale(scale); // Scale the visual sprite
        this.sprite.body.setSize(
            this.sprite.width * scaleFactor - 10,
            this.sprite.height * scaleFactor
        );


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
            frameRate: 12,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNumbers('player_jump', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 0  // Play once per jump
        });


        // Start with the idle animation
        this.sprite.anims.play('idle');
    }

    constructor(scene) {
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(centerX, centerY, 'player_idle').setScale(1.5);
        this.sprite.setCollideWorldBounds(false); //allows player to go up infinitely
        this.sprite.setBounce(0.2);

        // Input controls (WASD)
        this.cursors = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            basic_attack: Phaser.Input.Keyboard.KeyCodes.J
        });
    }

    update() {
        // Movement controls
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-160);
            this.sprite.setFlipX(true);  // Flip sprite for left movement
            if (this.sprite.anims.currentAnim.key !== 'walk') {
                this.sprite.anims.play('walk');
            }
        } else if (this.cursors.right.isDown) {
            
            this.sprite.setVelocityX(160);
            this.sprite.setFlipX(false);  // Flip sprite for left movement
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
        if (this.cursors.space.isDown && this.jumpKeyReleased && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-350); // Jump height
            this.sprite.anims.play('jump', true);
            this.jumpKeyReleased = false; // Disable jumping until the key is released
        }

        // Reset jumpKeyReleased when the jump key is released
        if (!this.cursors.space.isDown) {
            this.jumpKeyReleased = true;
        }
        else {
            this.jumpKeyReleased = false;
        }
         // Constrain the player to the screen width
         if (this.sprite.x < 0) {
            this.sprite.x = 0; // Prevent moving past the left edge
        } else if (this.sprite.x > this.scene.scale.width) {
            this.sprite.x = this.scene.scale.width; // Prevent moving past the right edge
        }
    }
}

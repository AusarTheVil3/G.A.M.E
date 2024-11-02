var centerX = 1250 / 4, centerY = 850 / 4;
export class Player {

    preload(){
        this.scene.load.spritesheet('player_idle', 'assets/spritesheets/hero_idlesheet.png', { frameWidth: 44, frameHeight: 48 });
        this.preload.spritesheet('player_walk', 'assets/spritesheets/hero_walkingsheet.png', 44 , 48);
    }
    
    create(){
        console.log('player creation0');
        player = this.add.sprite(centerX, centerY, 'player_idle')
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

        this.sprite.anims.play('idle');


    }
    constructor(scene) {
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(100, 450, 'player_idle').setScale(1);
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
            this.sprite.setScale(-1,1)
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(160);
            this.sprite.setScale(1,1)

            //this.animations.play('walk', 14, true);
        } else {
            this.sprite.setVelocityX(0);
            //this.animations.play('idle', 14, true);
        }

        // Jumping mechanics
        if (this.cursors.space.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-300); // Jump height
        }
    }
}

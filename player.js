export class Player {

    static preload(scene){
	
        // Load the spritesheets for idle and walking animations
        scene.load.spritesheet('player_idle', 'assets/spritesheets/hero_idlesheet.png', { frameWidth: 44, frameHeight: 48 });
        scene.load.spritesheet('player_walk', 'assets/spritesheets/hero_walkingsheet.png', { frameWidth: 44, frameHeight: 48 });
        scene.load.spritesheet('player_jump', 'assets/spritesheets/hero_jumpsheet.png', { frameWidth: 44, frameHeight: 48 });
        scene.load.spritesheet('player_basicattack', 'assets/spritesheets/hero_walkingsheet.png', { frameWidth: 44, frameHeight: 48 });

        // Load the dc laser image as the projectile
       scene.load.image('dc', 'assets/resources/1 Icons/Icon14_35.png');
    }

    create() {
        console.log('Player creation');
        
        const scaleFactor = 0.7; // Example: scale down the collision box to 80%
        this.sprite.setScale(1.5); // Scale the visual sprite to 1.5 (fixing the 'scale' variable issue)
        this.sprite.body.setSize(
            this.sprite.width * scaleFactor - 13,
            this.sprite.height * scaleFactor
        );

        // Set the texture for the player sprite
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

        // Player resources (e.g., health)
        this.resources_Map = {
            "health": 100,
            "resource_one": 0,
            "resource_two": 0,
            "resource_three": 0,
            "resource_four": 0,
            "mining_Speed": 15   
        };
    }

constructor(scene) {
    this.scene = scene;

    // Set the center of the screen for positioning
    const centerX = this.scene.scale.width / 2;
    const centerY = this.scene.scale.height / 2;

    // Create the player sprite at the center
    this.sprite = this.scene.physics.add.sprite(centerX, centerY, 'player_idle').setScale(1.5);

    // Disable the world boundaries, allowing vertical movement
    this.sprite.setCollideWorldBounds(true); // Keeps the player inside the screen horizontally
    this.sprite.body.setCollideWorldBounds(false); // Disable vertical world bounds collision

    // Optionally set gravity (if needed)
    this.scene.physics.world.gravity.y = 1000; // Adjust gravity if the player should fall naturally

    this.sprite.setBounce(0); // No bounce

    // Input controls (WASD and basic attack, now using 'C' for shooting)
    this.cursors = this.scene.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        space: Phaser.Input.Keyboard.KeyCodes.SPACE,
        basic_attack: Phaser.Input.Keyboard.KeyCodes.C // Change to 'C' for shooting
    });

    // Flag to check when the basic attack key is pressed
    this.isAttacking = false;
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
            this.sprite.setFlipX(false);  // Flip sprite for right movement
            if (this.sprite.anims.currentAnim.key !== 'walk') {
                this.sprite.anims.play('walk');
            }
        } else {
            this.sprite.setVelocityX(0);
            if (this.sprite.anims.currentAnim.key !== 'idle') {
                this.sprite.anims.play('idle');
            }
        }

        // Jumping mechanics
        if (this.cursors.space.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-350); // Jump height
            this.sprite.anims.play('jump', true);
        }

        // Launch projectile when the 'C' key is pressed (basic_attack)
        if (this.cursors.basic_attack.isDown && !this.isAttacking) {
            this.isAttacking = true;  // Prevent multiple attacks at once
            this.fireProjectile();
        }

        if (!this.cursors.basic_attack.isDown) {
            this.isAttacking = false;
        }

        // Constrain the player to the screen width
        if (this.sprite.x < 0) {
            this.sprite.x = 0; // Prevent moving past the left edge
        } else if (this.sprite.x > this.scene.scale.width) {
            this.sprite.x = this.scene.scale.width; // Prevent moving past the right edge
        }
    }

fireProjectile() {
    // Create the projectile at the player's position
    const projectile = this.scene.physics.add.sprite(this.sprite.x, this.sprite.y, 'dc').setScale(1);

    // Disable gravity entirely
    projectile.body.allowGravity = false;
    // No gravity at all, no vertical movement

    // Explicitly set the horizontal velocity to ensure it goes in a straight line (no vertical movement)
    const velocityX = this.sprite.flipX ? -500 : 500; // Left (-500) or Right (500)
    projectile.setVelocity(velocityX, 0); // Velocity is set only in the X direction

    // Explicitly set the rotation to 0 (no rotation, just straight line)
    projectile.setRotation(0);

    // Make sure the projectile collides with the world bounds and disappears when it leaves the screen
    projectile.setCollideWorldBounds(true);
    projectile.body.onWorldBounds = true; // Trigger when projectile hits the world bounds
    this.scene.physics.world.on('worldbounds', (body) => {
        if (body.gameObject === projectile) {
            projectile.destroy(); // Destroy the projectile when it goes out of bounds
        }
    });

    // Optional: Destroy the projectile after a few seconds if it doesn't hit anything
    this.scene.time.delayedCall(2000, () => projectile.destroy());  // Destroy after 2 seconds if no collision

    // Optional: Add collision with enemies (if defined)
    this.scene.physics.add.collider(projectile, this.scene.enemyGroup, (projectile, enemy) => {
        enemy.takeDamage(10);  // Deal 10 damage to the enemy
        projectile.destroy();  // Destroy the projectile after hitting the enemy
    });
}

}

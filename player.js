var centerX = 700 / 2, centerY = 800 / 2;
var scale = 2;
export class Player {

    static preload(scene){
        // Load the spritesheets for idle and walking animations
        scene.load.spritesheet('player_idle', 'assets/spritesheets/hero_idlesheet.png', { frameWidth: 44, frameHeight: 48 });
        scene.load.spritesheet('player_walk', 'assets/spritesheets/hero_walkingsheet.png', { frameWidth: 44, frameHeight: 48 });
        scene.load.spritesheet('player_jump', 'assets/spritesheets/hero_jumpsheet.png', { frameWidth: 44, frameHeight: 48 });
        scene.load.spritesheet('player_basicattack', 'assets/spritesheets/hero_walkingsheet.png', { frameWidth: 44, frameHeight: 48 });
        scene.load.image('dc', 'assets/guns/5 Bullets/4_1.png');

    }   
    
    create(){
        console.log('Player creation');
        
        this.isAttacking = false;
        const scaleFactor = 0.7; // Example: scale down the collision box to 80%
        this.sprite.setScale(scale); // Scale the visual sprite
        this.sprite.body.setSize(
            this.sprite.width * scaleFactor - 13,
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

        this.resources_Map = {
            "health":100,
            "resource_one":0,
            "resource_two":0,
            "resource_three":0,
            "resource_four":0,
            "mining_Speed":15   
        }
    }

    constructor(scene) {
        
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(400, this.scene.base_plat_pos - 100, 'player_idle').setScale(1.5);
        this.sprite.setCollideWorldBounds(false); //allows player to go up infinitely
        this.sprite.setBounce(0);

        // Input controls (WASD)
        this.cursors = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            basic_attack: Phaser.Input.Keyboard.KeyCodes.C // Change to 'C' for shooting
        });
    }

    update() {

        
        // Movement controls
        if (this.cursors.left.isDown) {
            if (!this.sprite.body.touching.left){ //fixes wall sticking
                this.sprite.setVelocityX(-160);
            }
            this.sprite.setFlipX(true);  // Flip sprite for left movement
            if (this.sprite.anims.currentAnim.key !== 'walk') {
                this.sprite.anims.play('walk');
            }
        } else if (this.cursors.right.isDown) {
            
            if (!this.sprite.body.touching.right){ //fixes wall sticking
                this.sprite.setVelocityX(160);
            }
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

         // Launch projectile when the 'C' key is pressed (basic_attack)
         if (this.cursors.basic_attack.isDown && !this.isAttacking) {
            this.isAttacking = true;  // Prevent multiple attacks at once
            this.fireProjectile();
        }

        if (!this.cursors.basic_attack.isDown) {
            this.isAttacking = false;
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

    fireProjectile() {
        // Create the projectile at the player's position
        const projectile = this.scene.physics.add.sprite(this.sprite.x, this.sprite.y, 'dc').setScale(2);
    
        // Disable gravity entirely
        projectile.body.allowGravity = false;
        // No gravity at all, no vertical movement
    
        // Explicitly set the horizontal velocity to ensure it goes in a straight line (no vertical movement)
        const velocityX = this.sprite.flipX ? -500 : 500; // Left (-500) or Right (500)
        projectile.setVelocity(velocityX, 0); // Velocity is set only in the X direction
    
        // Explicitly set the rotation to 0 (no rotation, just straight line)
        projectile.setRotation(0);
    
        // Make sure the projectile collides with the world bounds and disappears when it leaves the screen
        projectile.setCollideWorldBounds(false);
        projectile.body.onWorldBounds = true; // Trigger when projectile hits the world bounds
    
        // Optional: Destroy the projectile after a few seconds if it doesn't hit anything
        this.scene.time.delayedCall(2000, () => projectile.destroy());  // Destroy after 2 seconds if no collision
    
        // Optional: Add collision with enemies (if defined)
        this.scene.physics.add.collider(projectile, this.scene.round.enemyGroup, (projectile, enemy) => {
            enemy.setVelocity(0);
            enemy.takeDamage(100);  // Deal 10 damage to the enemy
            projectile.destroy();  // Destroy the projectile after hitting the enemy
        });
    }
}
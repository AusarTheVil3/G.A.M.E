export class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, initialHealth) {
        super(scene, x, y, texture);

        this.scene = scene; // Store the scene reference

        // Add this enemy to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.health = initialHealth; // Enemy's health
        this.maxHealth = initialHealth; // Maximum health for scaling purposes

        this.setInteractive(); // Optional: Allow interaction
        this.body.setCollideWorldBounds(true); // Prevent going outside world bounds
        this.body.setImmovable(false); // Allow knockback or other forces
    }

    static preload(scene) {
        // Load shared assets (e.g., spritesheets)
        scene.load.spritesheet('tank_idle', 'assets/sprites/enemies/1/Idle.png', {
            frameWidth: 96,
            frameHeight: 96,
        });

        scene.load.spritesheet('flyguy_idle', 'assets/sprites/enemies/3/Idle.png', {
            frameWidth: 96,
            frameHeight: 96,
        });
    }

    // Take damage
    takeDamage(amount) {
        this.health -= amount;
        this.setTint(0xff0000); // Flash red to indicate damage
        this.scene.time.delayedCall(200, () => this.clearTint());

        if (this.health <= 0) {
            this.die();
        }
    }

    // Heal the enemy (optional)
    heal(amount) {
        this.health = Math.min(this.health + amount, this.maxHealth);
    }

    // Die logic
    die() {
        this.destroy();
    }
}

//===============================================================================================================================

export class Tank extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'tank_idle', 500); // Pass the texture and health

        this.setScale(1); // Adjust scale for size

        ///WE MUST NOT LEAVE ANIMATION CREATION IN CONSTRUCTORS, TEMPORARY
        scene.anims.create({
            key: 'tank_idle_anim',
            frames: scene.anims.generateFrameNumbers('tank_idle', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1, // Loop indefinitely
        });

        this.play('tank_idle_anim'); // Play idle animation
    }
}

//===============================================================================================================================
export class FlyGuy extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'flyguy_idle', 500); // Pass the texture and health


        this.body.setSize(25, 40); // Adjust size
        this.body.setOffset(13, 57); // Adjust offset
        this.setScale(1.5); // Adjust scale for size

        ///WE MUST NOT LEAVE ANIMATION CREATION IN CONSTRUCTORS, TEMPORARY
        scene.anims.create({
            key: 'flyguy_idle_anim',
            frames: scene.anims.generateFrameNumbers('flyguy_idle', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1, // Loop indefinitely
        });

        this.play('flyguy_idle_anim'); // Play idle animation
    }
}


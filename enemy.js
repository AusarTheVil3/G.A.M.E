import { createEnemyAnimations } from "./enemyAnims.js";

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

        this.speed = 30; // Default movement speed
        this.attackRange = 30; // Range at which the enemy stops to attack
    }

    static preload(scene) {
        // Load shared assets (e.g., spritesheets)
        //tank
        scene.load.spritesheet('tank_idle', 'assets/sprites/enemies/tank/Idle.png', { frameWidth : 96, frameHeight: 96 });
        scene.load.spritesheet('tank_move', 'assets/sprites/enemies/tank/Drive.png', { frameWidth : 96, frameHeight: 96 });
        scene.load.spritesheet('tank_attack', 'assets/sprites/enemies/tank/Attack4_1.png', { frameWidth : 96, frameHeight: 96 });
       
        //flyguy
        scene.load.spritesheet('flyguy_idle', 'assets/sprites/enemies/flyguy/Idle.png', { frameWidth : 96, frameHeight: 96 });
        scene.load.spritesheet('flyguy_move', 'assets/sprites/enemies/flyguy/Fly.png', { frameWidth : 96, frameHeight: 96 });
        scene.load.spritesheet('flyguy_attack', 'assets/sprites/enemies/flyguy/Attack2.png', { frameWidth : 96, frameHeight: 96 });

        scene.load.image('flyguy_bullet','./assets/sprites/enemies/flyguy/Bullet.png');
    }

    

    // Take damage
    takeDamage(amount) {
        //console.log(`${this.texture.key} took ${amount} damage.`);
        this.health -= amount;
        this.setTint(0xff0000); // Flash red to indicate damage
        this.scene.time.delayedCall(200, () => this.clearTint());

        if (this.health <= 0) {
            console.log(`${this.texture.key} is dying.`); 
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

    update(player) {
        const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
    
        if (distance < this.attackRange) {
            this.body.setVelocity(0, 0);
            if (!this.anims.currentAnim || this.anims.currentAnim.key !== `${this.texture.key}_attack_anim`) {
                this.play(`${this.texture.key.split('_')[0]}_attack_anim`, true);
            }
        } 
        else {
            this.moveToPlayer(player);
            if (!this.anims.currentAnim || this.anims.currentAnim.key !== `${this.texture.key}_move_anim`) {
                this.play(`${this.texture.key.split('_')[0]}_move_anim`, true);
            }
        }
    }
    
    moveToPlayer(player) {
        const speed = this.speed;
        this.scene.physics.moveToObject(this, player, speed);
    }
    
 
}
//===============================================================================================================================

export class Tank extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'tank_idle', 100); // Reduced health from 500 to 100 for testing

        this.setScale(1); // Adjust scale for size

        this.play('tank_idle_anim'); // Play idle animation
    }
}

//===============================================================================================================================
export class FlyGuy extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'flyguy_idle', 50); // Reduced health from 500 to 50 for testing

        this.body.setSize(25, 40); // Adjust size
        this.body.setOffset(13, 57); // Adjust offset
        this.setScale(1.5); // Adjust scale for size
    
        this.play('flyguy_idle_anim'); // Play idle animation

        this.shootInterval = 2000; // Time in milliseconds between each shot
        this.lastShotTime = 0; // Timestamp of the last shot
    }

    update(player) {
        super.update(player.sprite); // Pass the player sprite to the parent update method

        // Check if it's time to shoot
        if (this.scene.time.now > this.lastShotTime + this.shootInterval) {
            this.shootProjectile(player);
            this.lastShotTime = this.scene.time.now;
        }
    }

    shootProjectile(player) {
        const projectile = this.scene.physics.add.sprite(this.x, this.y, 'flyguy_bullet').setScale(3);

        // Disable gravity for the projectile
        projectile.body.allowGravity = false;

        // Calculate the direction to the player
        const angle = Phaser.Math.Angle.Between(this.x, this.y, player.sprite.x, player.sprite.y);
        const velocity = this.scene.physics.velocityFromRotation(angle, 300); // Adjust speed as needed

        // Set the velocity of the projectile
        projectile.setVelocity(velocity.x, velocity.y);

        // Destroy the projectile after a few seconds if it doesn't hit anything
        this.scene.time.delayedCall(3000, () => projectile.destroy());

        // Add collision with the player
        this.scene.physics.add.collider(projectile, player.sprite, (proj, playerSprite) => {
            player.takeDamage(10); // Adjust damage as needed
            proj.destroy();
        });
    }
}
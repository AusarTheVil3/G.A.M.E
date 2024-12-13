import { Tank, FlyGuy } from './enemy.js';

export class Round {
    constructor(scene) {
        this.scene = scene; // Reference to the Phaser scene
        this.roundNumber = 0;
        this.enemyGroup = this.scene.physics.add.group(); // Group to store all spawned enemies
        this.spawnInterval = 1000; // Time in milliseconds between each enemy spawn
        this.timerEvent = null; // Reference to the Phaser timer event
        this.enemyCount = 0; // Number of enemies spawned
    }

    // Start spawning enemies with a delay
    start() {
        this.enemyQueue = this.generateEnemyQueue(this.roundNumber);
        if (this.timerEvent) {
            this.timerEvent.remove(); // Remove any existing timer to avoid duplicates
        }

        // Create a repeating timer to spawn enemies
        this.timerEvent = this.scene.time.addEvent({
            delay: this.spawnInterval, // Delay between spawns
            callback: this.spawnEnemy, // Function to call
            callbackScope: this, // Ensure the correct `this` context
            loop: true, // Keep looping until manually stopped
        });
    }

    // Stop the timer event
    stop() {
        if (this.timerEvent) {
            this.timerEvent.remove(); // Remove the timer
            this.timerEvent = null;
        }
    }

    // Spawn the next enemy from the queue
    spawnEnemy() {
        if (this.enemyQueue.length > 0) {
            const type = this.enemyQueue.shift(); // Dequeue the next enemy type
            const x = Phaser.Math.Between(100, 700); // Random x-coordinate
            const y = Phaser.Math.Between(this.scene.base_plat_pos - 100, this.scene.base_plat_pos - 200); // Random y-coordinate
            let enemy;

            // Create the appropriate enemy type
            switch (type) {
                case 'flyguy':
                    enemy = new FlyGuy(this.scene, x, y);
                    break;
                case 'tank':
                    enemy = new Tank(this.scene, x, y);
                    break;
                default:
                    console.warn(`Unknown enemy type: ${type}`);
                    return;
            }

            this.enemyGroup.add(enemy); // Add the enemy to the group
            this.enemyCount += 1;
            console.log(`Enemy created. Total enemies: ${this.enemyCount}`);

        } else {
            this.stop(); // Stop spawning when the queue is empty
            console.log(`Round ${this.roundNumber} complete.`);
        }
    }

    // Kill all enemies currently in the enemy group
    killAllEnemies() {
        this.enemyGroup.getChildren().forEach((enemy) => {
            enemy.destroy(); // Destroy each enemy
        });
        this.enemyGroup.clear(true); // Clear the group
        this.enemyCount = 0; // Reset enemy count
    }

    // Check if the round is complete
    isComplete() {
        return this.enemyGroup.getChildren().length === 0 && this.enemyQueue.length === 0;
    }

    generateEnemyQueue(roundNumber) {
        const queue = [];
        const baseEnemies = 1;
        const scaleFactor = 1.5;

        const totalEnemies = Math.floor(baseEnemies + roundNumber * scaleFactor);

        for (let i = 0; i < totalEnemies; i++) {
            const enemyType = i % 2 === 0 ? 'flyguy' : 'tank';
            queue.push(enemyType);
        }

        return queue;
    }
}

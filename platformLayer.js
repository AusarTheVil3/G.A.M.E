export class PlatformLayer extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene) {
      super(scene.physics.world, scene);

      // Add this group to the scene
      scene.add.existing(this);
  }

  static preload(scene)

  {
    scene.load.image('platform_block', 'assets/tilesets/abandoned/1 Tiles/Tile_46.png');
  }

  addBasePlat(y) {
    const blockWidth = this.scene.scale.width / 30; // Divide screen width into blocks
    const numBlocks = Math.ceil(this.scene.scale.width / blockWidth); // Number of blocks needed

    for (let i = 0; i < numBlocks; i++) {
        const blockX = i * blockWidth + blockWidth / 2; // Center each block horizontally

        // Create a block
        const block = this.create(blockX, y, "platform_block");

        // Scale the block to match the desired width
        const scaleFactor = blockWidth / block.width;
        block.setScale(scaleFactor);

        // Update the physics body to match the scaled size
        block.body.updateFromGameObject();

        // Make the block immovable

        block.body.checkCollision.down = false;
        block.body.checkCollision.left = false;
        block.body.checkCollision.right = false;
    }
}

  addPlatform(x, y) {
      const numBlocks = 5; // Number of blocks in the platform
      const blockWidth = this.scene.scale.width / 30; // Smaller blocks for platform (1/30th screen width)
      const randomDelay = Phaser.Math.Between(0, 2500);

      for (let i = 0; i < numBlocks; i++) {
          const blockX = x + i * blockWidth + blockWidth / 2; // Position blocks side by side starting at x

          // Create a block
          const block = this.create(blockX, y, "platform_block");

          // Scale the block to match the desired width
          const scaleFactor = blockWidth / block.width;
          block.setScale(scaleFactor);

          // Update the physics body to match the scaled size
          block.body.updateFromGameObject();

          // Disable downward collisions for one-way platform behavior
          block.body.checkCollision.down = false;
          block.body.checkCollision.left = false;
          block.body.checkCollision.right = false;

          

          this.scene.tweens.add({
            targets: block,
            x: blockX + (800 - numBlocks * blockWidth), // Target position
            duration: 2500, // Duration of movement in milliseconds
            delay: randomDelay,
            yoyo: true, // Moves back to original position
            repeat: -1, // Infinite repetition
            ease: 'Linear', // Smooth linear motion
            onUpdate: () => {
              // Update the physics body position to follow the tween
              block.body.updateFromGameObject();
          },
        });
    
      }

      
  }
}
export class ResBlocks extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene) {
      // Initialize the StaticGroup
      super(scene.physics.world, scene);

      // Add this group to the scene
      scene.add.existing(this);
  }

  preload(){
    // Load the spritesheets for idle and walking animations
    this.scene.load.image('top_block', 'assets/blocks/ground_top.png');
    this.scene.load.image('middle_block', 'assets/blocks/ground_middle.png');
    }   


  addLayer(layerIndex, texture) {
      const blockWidth = this.scene.scale.width / 15; // 1/20th of screen width
      const blockHeight = blockWidth; // Assuming square blocks
      const layerY = layerIndex * blockHeight + blockHeight / 2; // Vertical stacking

      for (let i = 0; i < 20; i++) {
          const blockX = i * blockWidth + blockWidth / 2; // Center horizontally

          // Add a static block to the group
          const block = this.create(blockX, layerY, texture);

          // Scale the block
          const scaleFactor = blockWidth / block.width;
          block.setScale(scaleFactor);

          // Update the physics body to match the scaled size
          block.body.updateFromGameObject();
      }
  }

  addPlatform(x, y, texture) {
    const numBlocks = 5; // Number of blocks in the platform
    const blockWidth = this.scene.scale.width / 30; // Smaller blocks for platform (1/30th screen width)

    for (let i = 0; i < numBlocks; i++) {
        const blockX = x + i * blockWidth + blockWidth / 2; // Position blocks side by side starting at x

        // Create a block
        const block = this.create(blockX, y, texture);

        // Scale the block to match the desired width
        const scaleFactor = blockWidth / block.width;
        block.setScale(scaleFactor);

        // Update the physics body to match the scaled size
        block.body.updateFromGameObject();
        block.body.checkCollision.down = false;

    }
} 
}


export class ResBlocks extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene) {
      // Initialize the StaticGroup
      super(scene.physics.world, scene);

      // Add this group to the scene
      scene.add.existing(this);
      this.iconGroup = scene.add.group();
  }

  static preload(scene){
    // Load the spritesheets for idle and walking animations
    scene.load.image('top_block', 'assets/blocks/ground_top.png');
    scene.load.image('middle_block', 'assets/blocks/ground_middle.png');
    scene.load.image('platform_block', 'assets/tilesets/abandoned/1 Tiles/Tile_46.png')
    
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
          
          const resources = [
            { key: 'resource_one', weight: 10 },
            { key: 'resource_two', weight: 10 }, 
            { key: 'resource_three', weight: 10 }, 
            { key: 'resource_four', weight: 10 },  
            { key: 'puzzle', weight: 1 },  
            { key: null, weight: 55 },           
        ];

        const getRandomResource = (resources) => {
            const totalWeight = resources.reduce((sum, resource) => sum + resource.weight, 0);
            const random = Phaser.Math.FloatBetween(0, totalWeight);
    
            let runningSum = 0;
            for (const resource of resources) {
                runningSum += resource.weight;
                if (random <= runningSum) {
                    return resource.key;
                }
            }
            return null; // Fallback (no resource)
        };
        const randomResource = getRandomResource(resources);
          // Save the resource as a custom property on the block\

          block.setData('resource', randomResource);

          // Add the icon overlaying the block
          if (randomResource !== null) {
            const resourceIcon = this.scene.add.image(blockX, layerY, randomResource).setScale(1);
            this.iconGroup.add(resourceIcon);
          }

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
        block.body.checkCollision.left = false;
        block.body.checkCollision.right = false;
    }
} 
}


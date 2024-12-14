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
    scene.load.image('bottom_block', 'assets/tilesets/abandoned/1 Tiles/Tile_24.png');
    
  }   

  addLayer(layerIndex, texture) {
      const blockWidth = this.scene.scale.width / 16;
      const blockHeight = blockWidth; // Assuming square blocks
      const layerY = layerIndex * blockHeight + blockHeight / 2; // Vertical stacking

      for (let i = 0; i < 16; i++) {
          const blockX = i * blockWidth + blockWidth / 2; // Center horizontally

          // Add a static block to the group
          const block = this.create(blockX, layerY, texture);

          // Scale the block
          const scaleFactor = blockWidth / block.width;
          block.setScale(scaleFactor);

          block.body.setSize(block.displayWidth, block.displayHeight); // Match the scaled size
          block.body.setOffset(
              (block.width - block.body.width) / 2, // Center horizontally
              (block.height - block.body.height) / 2 // Center vertically
          );
          
          const resources = [
            { key: 'resource_one', weight: 10 },
            { key: 'resource_two', weight: 10 }, 
            { key: 'resource_three', weight: 10 }, 
            { key: 'resource_four', weight: 10 },  
            { key: 'puzzle', weight: 50 },  
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

        var randomResource = getRandomResource(resources);
          // Save the resource as a custom property on the block\

          if (texture == "bottom_block")
          {
            randomResource = null;
            block.setData('mineable', false);
          }
          else {
            block.setData('mineable', true);
          }
          
          block.setData('resource', randomResource);

          // Add the icon overlaying the block
          if (randomResource !== null) {
            const resourceIcon = this.scene.add.image(blockX, layerY, randomResource).setScale(1);
            this.iconGroup.add(resourceIcon);
          }

      }
  }

  deleteAll() {
    // Safely destroy all children in the group
    this.getChildren().forEach((child) => {
        if (child) {
            // Remove and destroy the physics body
            if (child.body) {
                this.scene.physics.world.remove(child.body);
                child.body.destroy();
            }

            // Destroy the block game object
            child.destroy();
        }
    });

    // Clear the group itself
    this.clear(true, true); // Ensure group is cleared and children are removed

    // Destroy all icons in the iconGroup
    this.iconGroup.getChildren().forEach((icon) => {
        icon.destroy();
    });

    // Clear the iconGroup
    this.iconGroup.clear(true, true);
}
}


export class BasePlat extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.y = 0;
    // Add this group to the scene
    scene.add.existing(this);
  }
      addBasePlat(y) {
        this.y = y;
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
    
      deleteAll() {
        // Safely destroy all children in the group
        this.getChildren().forEach((child) => {
            if (child && child.body) {
                child.body.destroy(); // Remove physics body
            }
            child.destroy(); // Destroy the game object
        });
    
        // Clear the group itself
        this.clear(true, true); // Remove from scene and destroy all children
    }
 }
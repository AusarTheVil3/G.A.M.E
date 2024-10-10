export class Enemy {
  constructor(scene) {
      this.scene = scene;
      this.sprite = this.scene.physics.add.sprite(800, 450, 'enemy').setScale(1);
      this.sprite.setBounce(1);
      this.sprite.setCollideWorldBounds(true);
      this.sprite.setVelocityX(200);
  }

  update() {
    // Update logic for the enemy's movement
    if (this.sprite.body.touching.down) {
      this.sprite.setVelocityY(0); 
    }
  }
}

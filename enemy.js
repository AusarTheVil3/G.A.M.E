var centerX = 1250 / 4, centerY = 850 / 4;
export class Enemy {
  constructor(scene) {
      this.scene = scene;
      this.sprite = this.scene.physics.add.sprite(centerX + 20, centerY, "enemy_idle");
      this.sprite.setBounce(1);
      this.sprite.setCollideWorldBounds(true);
      this.sprite.setVelocityX(200);
  }

  preload(){
    // Load the spritesheets for idle and walking animations
    this.scene.load.spritesheet('enemy_idle', 'assets/sprites/enemies/flyguy/flyguy_idlesheet.png', { frameWidth: 44, frameHeight: 48 });
    this.scene.load.spritesheet('enemy_walk', 'assets/sprites/enemies/flyguy/flyguy_walkingsheet.png', { frameWidth: 44, frameHeight: 48 });
    this.scene.load.spritesheet('enemy_up', 'assets/sprites/enemies/flyguy/flyguy_flysheet.png', { frameWidth: 44, frameHeight: 48 });
  }  

  create() {
      console.log('Fly Guy Enemy Creation');

      this.sprite.setScale(1.5);
      this.sprite.setTexture('enemy_idle');

      // Define animations
      this.scene.anims.create({
          key: 'eidle',
          frames: this.scene.anims.generateFrameNumbers('enemy_idle', { start: 0, end: 4}),
          frameRate: 8,
          repeat: -1
      });

      this.scene.anims.create({
          key: 'ewalk',
          frames: this.scene.anims.generateFrameNumbers('enemy_walk', { start: 0, end: 5 }),
          frameRate: 12,
          repeat: -1
      });

      this.scene.anims.create({
          key: 'eup',
          frames: this.scene.anims.generateFrameNumbers('enemy_up', { start: 0, end: 4 }),
          frameRate: 8,
          repeat: -1
      });

      // Play idle animation
      this.sprite.anims.play('ewalk');
  }

  update() {
      if (this.sprite.body.touching.down) {
          this.sprite.setVelocityY(0);
      }
      this.sprite.anims.play('walk');
  }
}

export class Flyguy extends Enemy {
  constructor(scene) {
      super(scene, centerX, centerY, 'enemy_idle');
  }
}

export function createEnemyAnimations(scene) {
    // Tank animations
    scene.anims.create({
        key: 'tank_idle_anim',
        frames: scene.anims.generateFrameNumbers('tank_idle', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });

    scene.anims.create({
        key: 'tank_move_anim',
        frames: scene.anims.generateFrameNumbers('tank_move', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });

    scene.anims.create({
        key: 'tank_attack_anim',
        frames: scene.anims.generateFrameNumbers('tank_attack', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: 0
    });

    // FlyGuy animations
    scene.anims.create({
        key: 'flyguy_idle_anim',
        frames: scene.anims.generateFrameNumbers('flyguy_idle', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });

    scene.anims.create({
        key: 'flyguy_move_anim',
        frames: scene.anims.generateFrameNumbers('flyguy_move', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });

    scene.anims.create({
        key: 'flyguy_attack_anim',
        frames: scene.anims.generateFrameNumbers('flyguy_attack', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: 0
    });
    scene.load.spritesheet('tank_bullet', 'assets/sprites/enemies/tank/Bullet.png', { frameWidth: 16, frameHeight: 16 });
    scene.load.spritesheet('flyguy_bullet', 'assets/sprites/enemies/flyguy/Bullet.png', { frameWidth: 16, frameHeight: 16 });
}
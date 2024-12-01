import { Player } from '../player.js';
import { Level } from '../level.js';
import { Enemy } from '../enemy.js';

class GameScene extends Phaser.Scene {
    constructor(){
        super('gameScene')
    }

    preload() {
        this.player = new Player(this);
        this.player.preload();
        this.enemy = new Enemy(this);
        this.enemy.preload();
        this.load.image('ground', 'https://opengameart.org/sites/default/files/styles/medium/public/asset/platform.png');
        this.load.image('base', 'https://opengameart.org/sites/default/files/styles/medium/public/asset/base.png');
    }
    
    create() {
        this.keyboardesc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyboardp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.level = new Level(this);
        this.player.create();     
        this.enemy.create();

        // Colliders
        this.physics.add.collider(this.player.sprite, this.level.ground);
        this.physics.add.collider(this.player.sprite, this.level.platforms);
        this.physics.add.collider(this.enemy.sprite, this.level.ground);
        this.physics.add.collider(this.enemy.sprite, this.level.platforms);
    }
    
    update() {
        
        if (Phaser.Input.Keyboard.JustDown(this.keyboardesc)) {
            this.scene.switch('titleScene');
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyboardp)) {
            this.scene.switch('pauseScene');
        }

        this.player.update();
        this.enemy.update();
    }

}

export default GameScene;

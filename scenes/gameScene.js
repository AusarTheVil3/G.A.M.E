import { Player } from '../player.js';
import { Level } from '../level.js';
import { Enemy } from '../enemy.js';
import { saveGame, loadGame } from '../savenload.js'; // Import the save/load module

class GameScene extends Phaser.Scene {
    constructor(){
        super('gameScene');
    }

    preload() {
        this.player = new Player(this);
        this.player.preload();
        this.load.image('enemy', 'https://opengameart.org/sites/default/files/styles/medium/public/asset/lol.png');
        this.load.image('ground', 'https://opengameart.org/sites/default/files/styles/medium/public/asset/platform.png');
        this.load.image('base', 'https://opengameart.org/sites/default/files/styles/medium/public/asset/base.png');
    }
    
    create() {
        this.keyboardesc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyboardp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.level = new Level(this);
        this.player.create();     
        this.enemy = new Enemy(this);
    
        // Colliders
        this.physics.add.collider(this.player.sprite, this.level.ground);
        this.physics.add.collider(this.player.sprite, this.level.platforms);
        this.physics.add.collider(this.enemy.sprite, this.level.ground);
        this.physics.add.collider(this.enemy.sprite, this.level.platforms);

        // Add Save/Load functionality
        this.input.keyboard.on('keydown-S', () => {
            saveGame(this.player, this.level, [this.enemy]); // Save the game
        });

        this.input.keyboard.on('keydown-L', () => {
            loadGame(this.player, this.level, [this.enemy]); // Load the game
        });
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

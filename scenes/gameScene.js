import { Player } from '../player.js';
import { Level } from '../level.js';
//import { Enemy } from '../enemy.js';
import {ResBlocks} from '../resblocks.js';


class GameScene extends Phaser.Scene {
    constructor(){
        super('gameScene')
    }

    preload() {
        this.player = new Player(this);
        this.player.preload();
        //this.enemy = new Enemy(this);
        //this.enemy.preload();
        this.resBlocks = new ResBlocks(this);
        this.resBlocks.preload();
        this.load.image('ground', 'https://opengameart.org/sites/default/files/styles/medium/public/asset/platform.png');
        this.load.image('base', 'https://opengameart.org/sites/default/files/styles/medium/public/asset/base.png');
        this.load.image('background', 'assets/background/sky.png');
    }
    
    create() {
        this.keyboardesc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyboardp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.scene.launch('HUDScene');

        this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0, 0);

        this.level = new Level(this);
        this.player = new Player(this);

        this.cameras.main.startFollow(this.player.sprite, false, 0, 1);

         // Add some blocks
        this.resBlocks = new ResBlocks(this);
        this.resBlocks.addLayer(10,'top_block');
        this.resBlocks.addLayer(11,'middle_block');
        this.resBlocks.addLayer(12,'middle_block');
        this.resBlocks.addLayer(13,'middle_block');
        this.resBlocks.addLayer(14,'middle_block');
        this.resBlocks.addLayer(15,'middle_block');
        this.resBlocks.addLayer(16,'middle_block');

        this.resBlocks.addPlatform(100,450, ""); // 10 blocks wide at y=400
        this.resBlocks.addPlatform(200,350, ""); // 10 blocks wide at y=400
        

        this.player.create();     
        //this.enemy.create();


        // Colliders
        this.physics.add.collider(this.player.sprite, this.level.ground);
        this.physics.add.collider(this.player.sprite, this.level.platforms);
        this.physics.add.collider(this.player.sprite, this.resBlocks);

        this.physics.world.createDebugGraphic()
    }
    
    update() {
        
        if (Phaser.Input.Keyboard.JustDown(this.keyboardesc)) {
            //this.scene.stop('HUDScene');
            this.scene.switch('titleScene');
            
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyboardp)) {
            //this.scene.stop('HUDScene');
            this.scene.switch('pauseScene');
        }
         
        this.registry.inc('health', -0.125);
        
        this.player.update();
        //this.enemy.update();
    }

}

export default GameScene;

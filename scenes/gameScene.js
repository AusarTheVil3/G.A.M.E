import { Player } from '../player.js';
import { Level } from '../level.js';
import {ResBlocks} from '../resblocks.js';
import { Enemy } from '../enemy.js';
import { PlatformLayer } from '../platformLayer.js';


class GameScene extends Phaser.Scene {
    constructor(){
        super('gameScene')
    }

    preload() {
        Player.preload(this, this.registry)
        ResBlocks.preload(this)
        Enemy.preload(this)
        PlatformLayer.preload(this)
        this.load.image('background', 'assets/background/sky.png');
        this.load.image('resource_one', 'assets/resources/1 icons/Icon14_01.png')
        this.load.image('resource_two', 'assets/resources/1 icons/Icon14_03.png')
        this.load.image('resource_three', 'assets/resources/1 icons/Icon14_05.png')
        this.load.image('resource_four', 'assets/resources/1 icons/Icon14_24.png')
        this.load.image('puzzle', 'assets/resources/1 icons/Icon14_22.png')
    }
    
    create() {
        this.keyboardesc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyboardp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.scene.launch('HUDScene');

        const bg = this.add.image(0, 0, 'background');

        // Set the origin to the top-left corner
        bg.setOrigin(0, 0);

        // Stretch the image to fill the screen
        bg.setDisplaySize(this.scale.width, this.scale.height);
        bg.setScrollFactor(0)

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

        this.platformLayer = new PlatformLayer(this);

        let base = 450
        let i = 0;
        for (i = 0; i < 10; i++) {
            this.platformLayer.addPlatform(0, base - (i * 110));
        }
        this.platformLayer.addBasePlat(base - (i * 110))

        this.player.create();     
        //this.enemy.create();


        // Colliders
        this.physics.add.collider(this.player.sprite, this.resBlocks);
        this.physics.add.collider(this.player.sprite, this.platformLayer);

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
         
        
        
        this.player.update();
        //this.enemy.update();
    }

}

export default GameScene;
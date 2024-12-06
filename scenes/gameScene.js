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
        Player.preload(this)
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
        this.keyboarde = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.miningTimer = 0;
        this.miningThreshold=500;
        this.keyboarde.on('down', () => {
            this.miningTimer = 0; // Reset timer when the key is pressed
          });
      
          this.keyboarde.on('up', () => {
            this.miningTimer = 0; // Reset timer when the key is released
          });

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
        this.platformLayer = new PlatformLayer(this);

        let base = 450
        let i = 0;
        for (i = 0; i < 10; i++) {
            this.platformLayer.addPlatform(0, base - (i * 110));
            this.resBlocks.addLayer(11 + i,'middle_block');
        }
        this.platformLayer.addBasePlat(base - (i * 110))

        this.resBlocks.addLayer(10 + i,'bottom_block')

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

        if (this.keyboarde.isDown) {
            this.miningTimer += this.player.resources_Map["mining_Speed"]; // Increment the hold timer
        if (this.miningTimer >= this.miningThreshold) {
            this.mineBlock(); // Call the function after threshold
            this.miningTimer = 0; // Reset timer to prevent repeated calls
        }
        }
        
        this.player.update();
        //this.enemy.update();
        this.updateRegistry();
    }


    //Will mine blocks in front of and underneath the player when pressing E   
    mineBlock(){
        // Get bounds of the player's body
        const playerBounds = this.player.sprite.getBounds();

        // Find the block below or overlapping with player
        const blockBelow = this.resBlocks.getChildren().find(block => {
            return Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, block.getBounds());});

    if (blockBelow) {
        //if the block held a resource then give that resource to the player
        //via the resources_Map
        if (blockBelow.getData('resource') != null){
            this.player.resources_Map[blockBelow.getData('resource')] += 1 ;
        }
        if (blockBelow.getData('mineable') == true)
        blockBelow.destroy();
        

        // Remove associated icon
        const icon = this.resBlocks.iconGroup.getChildren().find(icon =>
        Phaser.Geom.Intersects.RectangleToRectangle(icon.getBounds(), blockBelow.getBounds())
        );
        if (icon) icon.destroy();
    }

    }
    
      

    updateRegistry() {
        this.registry.set('health', this.player.resources_Map["health"]);
        this.registry.set('resource_one', this.player.resources_Map["resource_one"]);
        this.registry.set('resource_two', this.player.resources_Map["resource_two"]);
        this.registry.set('resource_three', this.player.resources_Map["resource_three"]);
        this.registry.set('resource_four', this.player.resources_Map["resource_four"]);
    }

    

}

export default GameScene;
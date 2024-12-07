import { Player } from '../player.js';
import { Level } from '../level.js';
import {ResBlocks} from '../resblocks.js';
import { Enemy } from '../enemy.js';
import { PlatformLayer } from '../platformLayer.js';
import { BasePlat } from '../basePlat.js';


class GameScene extends Phaser.Scene {
    constructor(){
        super('gameScene')
        this.cam_view = 'player';
    }

    preload() {
        Player.preload(this)
        ResBlocks.preload(this)
        Enemy.preload(this)
        PlatformLayer.preload(this)
        this.load.image('background', 'assets/background/sky.png');
        this.load.image('base', 'assets/base/base.png');
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

        this.scene.launch('HUDScene');

        this.basePlat = new BasePlat(this);

        const bg = this.add.image(0, 0, 'background');

        // Set the origin to the top-left corner
        bg.setOrigin(0, 0);

        // Stretch the image to fill the screen
        bg.setDisplaySize(this.scale.width, this.scale.height);
        bg.setScrollFactor(0)

        this.level = new Level(this);
        this.player = new Player(this);
        this.resBlocks = new ResBlocks(this);
        this.platformLayer = new PlatformLayer(this);


         // Add some blocks


        var base_plat_pos = this.create_randomized_fields();

        this.basePlat.addBasePlat(base_plat_pos);

        // Start following the player vertically
        this.cameras.main.startFollow(this.player.sprite, false, 0, 1);

        // Lock the camera horizontally at the center of the screen
        this.cameras.main.scrollX = 400 - this.cameras.main.width / 2;
    
        // Lock the camera horizontally to the center of the screen
        this.cameras.main.on('cameraupdate', () => {
            this.cameras.main.scrollX = centerX - this.cameras.main.width / 2;
        });

        this.base = this.physics.add.sprite(400, (base_plat_pos - 330), 'base').setScale(1.5);
        this.base.body.setImmovable(true);
        this.base.body.allowGravity = false;

        this.player.create();     
        //this.enemy.create();


        // Colliders
        this.physics.add.collider(this.player.sprite, this.resBlocks);
        this.physics.add.collider(this.player.sprite, this.platformLayer);
        this.physics.add.collider(this.player.sprite, this.basePlat, this.cam_followBase, null, this);

        this.physics.world.createDebugGraphic();
    }

    create_randomized_fields() {
        this.resBlocks.addLayer(10,'top_block');
        

        let start = 450
        let i = 0;
        for (i = 0; i < 10; i++) {
            this.platformLayer.addPlatform(0, start - (i * 110));
            this.resBlocks.addLayer(11 + i,'middle_block');
        }
        this.resBlocks.addLayer(10 + i,'bottom_block')


        return start - (i * 110);
    }

    cam_followBase() {
        if (this.cam_view == 'player')
        {
            const camera = this.cameras.main;

        // Stop following any target for manual control
        this.cam_view = 'base';
        camera.stopFollow();

        this.tweens.add({
        targets: camera,
        scrollY: this.base.y - this.scale.height / 2,
        duration: 1000, // Duration of the transition in milliseconds
        ease: 'Sine.easeInOut', // Easing function for smooth motion

        onComplete: () => {
            this.platformLayer.deleteAll();
            this.resBlocks.deleteAll();
            this.create_randomized_fields();
            this.time.delayedCall(2000, () => { //TEMPORARY to get back from transition
                this.cam_followPlayer();
            });
        },
    });
        }
        

    }
    
    // Define the cam_followPlayer function
    cam_followPlayer() {
        const camera = this.cameras.main;

        
        // Stop following any target for manual control
    
        // Smoothly pan the camera to the base's position
        this.tweens.add({
            targets: camera,
            scrollY: this.player.sprite.y - this.scale.height /2,
            duration: 2000, // Duration of the transition in milliseconds
            ease: 'Sine.easeInOut', // Easing function for smooth motion

            onComplete: () => {
                this.cameras.main.startFollow(this.player.sprite, false, 0, 1);
                this.cameras.main.scrollX = 400 - this.cameras.main.width / 2;
                var base_plat_pos = this.basePlat.y;
                this.basePlat.deleteAll();
                
                this.time.delayedCall(10000, () => { 
                    this.basePlat.addBasePlat(base_plat_pos);
                    this.cam_view = "player";
            
                 });

            },
        }); 
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

        if (Phaser.Input.Keyboard.JustDown(this.keyboarde)){
            this.mineBlock();
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
        return Phaser.Geom.Intersects.RectangleToRectangle(
        playerBounds,
        block.getBounds()
    );
    });

    if (blockBelow) {
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
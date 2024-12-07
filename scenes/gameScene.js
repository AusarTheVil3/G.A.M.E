import { Player } from '../player.js';
import { Level } from '../level.js';
import {ResBlocks} from '../resblocks.js';
import { Enemy } from '../enemy.js';
import { PlatformLayer } from '../platformLayer.js';
import { BasePlat } from '../basePlat.js';


class GameScene extends Phaser.Scene {
    constructor(){
        super('gameScene')
    }

    preload() {
        //call static preload methods
        Player.preload(this);
        ResBlocks.preload(this);
        Enemy.preload(this);
        PlatformLayer.preload(this);
        this.load.image('background', 'assets/background/sky.png');
        this.load.image('base', 'assets/base/base.png');
        this.load.image('resource_one', 'assets/resources/1 icons/Icon14_01.png');
        this.load.image('resource_two', 'assets/resources/1 icons/Icon14_03.png');
        this.load.image('resource_three', 'assets/resources/1 icons/Icon14_05.png');
        this.load.image('resource_four', 'assets/resources/1 icons/Icon14_24.png');
        this.load.image('puzzle', 'assets/resources/1 icons/Icon14_22.png');

    }
    
    create() {
        //key stuff
        this.keyboardesc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyboardp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyboarde = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //useful properties
        this.cam_view = 'player';
        this.counting_down = true;
        this.display_timer = true;
        this.timer = 30; //set one higher than you want at start

        //background stuff
        const bg = this.add.image(0, 0, 'background');
        bg.setOrigin(0, 0);
        bg.setDisplaySize(this.scale.width, this.scale.height);
        bg.setScrollFactor(0)

        //objects from other classes ORDER MATTERS
        this.basePlat = new BasePlat(this);
        this.level = new Level(this);
        this.resBlocks = new ResBlocks(this);
        this.platformLayer = new PlatformLayer(this);
        this.player = new Player(this);
        this.scene.launch('HUDScene');

        

        // Start following the player vertically
        this.cameras.main.startFollow(this.player.sprite, false, 0, 1);
        this.cameras.main.scrollX = 400 - this.cameras.main.width / 2;
        this.cameras.main.on('cameraupdate', () => { //locks camera vertically
            this.cameras.main.scrollX = centerX - this.cameras.main.width / 2;
        });

         // Adds base plat AND randomized blocks + plats
        var base_plat_pos = this.create_randomized_fields();
        this.basePlat.addBasePlat(base_plat_pos);

        //base
        this.base = this.physics.add.sprite(400, (base_plat_pos - 330), 'base').setScale(1.5);
        this.base.body.setImmovable(true);
        this.base.body.allowGravity = false;

        //create player
        this.player.create();     

        // Colliders
        this.physics.add.collider(this.player.sprite, this.resBlocks);
        this.physics.add.collider(this.player.sprite, this.platformLayer);
        this.physics.add.collider(this.player.sprite, this.basePlat, this.cam_followBase, null, this);

        //timer event, tics down (tics timer OR health)
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.timer > 0 && this.counting_down) {
                    this.timer -= 1;
                } 
                else if (this.counting_down){
                        this.player.resources_Map['health'] -= 5;
                        if (this.player.resources_Map['health'] < 0){
                            this.player.resources_Map['health'] = 0;
                        }
                    }
                    this.updateRegistry();
            },
            loop: true
        });

        //adds the physics overlay for easy use
        this.physics.world.createDebugGraphic();
    }

    //this function is for plats and resblocks (kinda bad function ignore for now -Blake)
    create_randomized_fields() {
        this.resBlocks.addLayer(11,'top_block');

        let start = 458;
        let i = 0;
        for (i = 0; i < 10; i++) {
            this.platformLayer.addPlatform(0, start - (i * 110));
            this.resBlocks.addLayer(12 + i,'middle_block');
        }
        this.resBlocks.addLayer(12 + i,'bottom_block')


        return start - (i * 110);
    }

    //switches to following base on collision with base plat
    cam_followBase() {
        if (this.cam_view == 'player')
        {
            const camera = this.cameras.main;

        this.cam_view = 'base';
        this.counting_down = false;
        camera.stopFollow();

        this.tweens.add({
        targets: camera,
        scrollY: this.base.y - this.scale.height / 2,
        duration: 1000, // Duration of the transition in milliseconds
        ease: 'Sine.easeInOut', // Easing function for smooth motion

        onComplete: () => {
            this.display_timer = false;
            this.updateRegistry();
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
    
    //switches to following player after enemies defeated (no enemies yet :( )
    cam_followPlayer() {
        const camera = this.cameras.main;

        this.display_timer = true;
        this.timer = 30;
        this.updateRegistry();

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
                this.counting_down = true;
                
                this.time.delayedCall(10000, () => { 
                    this.basePlat.addBasePlat(base_plat_pos);
                    this.cam_view = "player";
            
                 });

            },
        }); 
    }
    
    //updates stuff
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
    

    //call any time this.timer or player resources changed- communicates with HUD
    updateRegistry() {
        this.registry.set('health', this.player.resources_Map["health"]);
        this.registry.set('resource_one', this.player.resources_Map["resource_one"]);
        this.registry.set('resource_two', this.player.resources_Map["resource_two"]);
        this.registry.set('resource_three', this.player.resources_Map["resource_three"]);
        this.registry.set('resource_four', this.player.resources_Map["resource_four"]);
        this.registry.set('timer', this.timer); 
        this.registry.set('display_timer', this.display_timer); 
    }

    

}

export default GameScene;

import TitleScene from './titleScene.js';
import GameScene from './gameScene.js';


const config = {
    type: Phaser.AUTO,
    width: 1250,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [ TitleScene , GameScene]    
};

const game = new Phaser.Game(config);






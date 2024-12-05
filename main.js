
import TitleScene from './scenes/titleScene.js';
import GameScene from './scenes/gameScene.js';
import PauseScene from './scenes/pauseScene.js';
import LoadingScene from './scenes/loadingScene.js';


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [ TitleScene , GameScene, PauseScene, LoadingScene ]    
};


const game = new Phaser.Game(config);





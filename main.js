
import TitleScene from './scenes/titleScene.js';
import GameScene from './scenes/gameScene.js';
import PauseScene from './scenes/pauseScene.js';
import LoadingScene from './scenes/loadingScene.js';
import HUDScene from './scenes/headsUpDisplayScene.js';
import GameOverScene from './scenes/gameOverScene.js';
import PuzzleScene from './scenes/puzzleScene.js';


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 500 }
            
        }
    },
    scene: [ TitleScene , GameScene, PauseScene, LoadingScene, HUDScene, GameOverScene, PuzzleScene]    
};


const game = new Phaser.Game(config);





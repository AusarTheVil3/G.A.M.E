class GameOverScene extends Phaser.Scene {
    constructor(){
        super('gameOverScene');
    }
    preload(){
        
        this.load.image('pauseBackground','./assets/pauseBackground.jpg');
        this.load.image('Return to Main Menu','./assets/start.jpg');
        this.load.image('gameOver','./assets/gameOver.PNG');
        this.load.image('returnButton','./assets/return.PNG');
        
        //add in game over background
    }

    create(){
        let background = this.add.image(400,400, 'pauseBackground');
        let gameOver = this.add.image(400,300,'gameOver');
        let returnToMain = this.add.image(400,700,'returnButton').setScale(0.5);
        


        
        returnToMain.setInteractive();
        returnToMain.on('pointerdown', ()=>{
            returnToMain.setScale(0.65);
        })

        returnToMain.on('pointerup', ()=>{
            returnToMain.setScale(1);
            this.scene.start('titleScene');
        })
    }



}
export default GameOverScene
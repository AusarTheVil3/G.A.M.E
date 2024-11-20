
class PauseScene extends Phaser.Scene {
    constructor(){
        super('pauseScene')
    }

    preload(){
        
        this.load.image('pauseScreen','./assets/pause.png');
        this.load.image('backToGameButton','./assets/backToGame.png');
        this.keyboardp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    create(){
        let pauseScreen = this.add.image(650,500,'pauseScreen');
        let backtoGameButton = this.add.image(650,600,'backToGameButton');
        backtoGameButton.setInteractive();

        backtoGameButton.on('pointerdown', ()=>{
            backtoGameButton.setScale(1.40);
        })

        backtoGameButton.on('pointerup', ()=>{
            backtoGameButton.setScale(1);
            this.scene.switch('gameScene');
        })


    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keyboardp)) {
            this.scene.switch('gameScene');
        }
    }

}

export default PauseScene;
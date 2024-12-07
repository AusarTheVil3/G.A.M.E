
class PauseScene extends Phaser.Scene {
    constructor(){
        super('pauseScene')
    }

    preload(){
        
        this.load.image('pauseScreen','./assets/pause.jpg');
        this.load.image('backToGameButton','./assets/resume.png');
        this.keyboardp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    create(){
        let pauseScreen = this.add.image(400,400,'pauseScreen');
        let backtoGameButton = this.add.image(290,340,'backToGameButton');
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
            //this.scene.start('HUDScene');
            this.scene.switch('gameScene');
        }
    }

}

export default PauseScene;


class PauseScene extends Phaser.Scene {
    constructor(){
        super('pauseScene')
    }

    preload(){
        
        this.load.image('pauseScreen','./assets/pause.jpg');
        this.load.image('backToGameButton','./assets/resume.png');
        this.load.image('quit','./assets/quit.png');
        this.keyboardp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    create(){
        let pauseScreen = this.add.image(400,400,'pauseScreen');
        let backtoGameButton = this.add.image(290,340,'backToGameButton');
        let quitButton = this.add.image(550, 340,'quit').setScale(0.8);

        quitButton.setInteractive();
        backtoGameButton.setInteractive();


        quitButton.on('pointerdown', ()=>{
            quitButton.setScale(1.0);
        })

        quitButton.on('pointerup', ()=>{
            quitButton.setScale(1);
            this.scene.stop('HUDScene');
            this.scene.stop('gameScene');
            this.scene.start('titleScene');
        })

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
            this.scene.launch('HUDScene');
            this.scene.switch('gameScene');
        }
    }

}

export default PauseScene;

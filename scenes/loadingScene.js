class LoadingScene extends Phaser.Scene {
    constructor(){
        super('loadingScene')
    }

    preload(){
        this.load.image('loadingScreen','./assets/loading.jpg');
        this.keyboardspace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create(){
        let loadingScreen = this.add.image(400,400,'loadingScreen');
    } 

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keyboardspace)) {
            this.scene.switch('gameScene');
        }
    }



}

export default LoadingScene;

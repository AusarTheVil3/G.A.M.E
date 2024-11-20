class TitleScene extends Phaser.Scene {
    constructor(){
        super('titleScene')
    }

    preload(){
        this.cameras.main.setBackgroundColor(0xFFFFFF);
        this.load.image('Background','./assets/title.png');
        this.load.image('StartButton','./assets/start.png')
    }

    create(){
        let Background = this.add.image(650,500,'Background');
        let startButton = this.add.image(650,550,'StartButton');
        startButton.setInteractive();
        startButton.on('pointerdown', ()=>{
            startButton.setScale(1.25);
        })

        startButton.on('pointerup', ()=>{
            startButton.setScale(1);
            this.scene.start('loadingScene');
        })
    }

    update(){

    }

}

export default TitleScene;
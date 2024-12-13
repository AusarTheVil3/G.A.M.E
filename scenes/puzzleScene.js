class PuzzleScene extends Phaser.Scene {
    constructor(){
        super('puzzleScene')
    }

    preload(){
        this.load.image('puzzle1','./assets/puzzles/puzzle1.png');
        this.load.image('CorrectButton1','./assets/puzzles/CorrectButton1.png');

        this.load.image('puzzle2','./assets/puzzles/puzzle2.png');
        this.load.image('CorrectButton2','./assets/puzzles/CorrectButton2.png');

        this.load.image('puzzle3','./assets/puzzles/puzzle3.png');        
        this.load.image('CorrectButton3','./assets/puzzles/CorrectButton3.png');
     
    }

    create(){
        const random = Phaser.Math.FloatBetween(0, 4);

        if(random == 1){
            let correctButton1 = this.add.image(400,775,'CorrectButton1');
            let incorrectButton1 = this.add.image(400,400,'puzzle1');
            correctButton1.setInteractive();
            incorrectButton1.setInteractive();
            correctButton1.on('pointerup', ()=>{
                this.registry
                this.scene.switch('gameScene');
            })
            incorrectButton1.on('pointerup', ()=>{
                correctButton1.setScale(1);
                this.scene.switch('gameScene');
            })
        }
        else if(random == 2){
            let correctButton2 = this.add.image(400,775,'CorrectButton2');
            let incorrectButton2 = this.add.image(400,400,'puzzle2');
            correctButton2.setInteractive();
            incorrectButton2.setInteractive();
            correctButton2.on('pointerup', ()=>{
                correctButton2.setScale(1);
                this.scene.switch('gameScene');
            })
            incorrectButton2.on('pointerup', ()=>{
                correctButton2.setScale(1);
                this.scene.switch('gameScene');
            })
        }
        else if(random == 3){
            let correctButton3 = this.add.image(400,775,'CorrectButton3');
            let incorrectButton3 = this.add.image(400,400,'puzzle3');
            correctButton3.setInteractive();
            incorrectButton3.setInteractive();          
            correctButton3.on('pointerup', ()=>{
                this.scene.switch('gameScene');
            })
            incorrectButton1.on('pointerup', ()=>{
                this.scene.switch('gameScene');
            })
        }
    }

    update(){

    }

}

export default PuzzleScene;

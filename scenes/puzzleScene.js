class PuzzleScene extends Phaser.Scene {
    constructor(){
        super('puzzleScene')
        this.random = 0;
    }

    preload(){
        this.load.image('puzzle1','./../assets/puzzles/puzzle1.png');
        this.load.image('CorrectButton1','./../assets/puzzles/CorrectButton1.png');

        this.load.image('puzzle2','./../assets/puzzles/puzzle2.png');
        this.load.image('CorrectButton2','./../assets/puzzles/CorrectButton2.png');

        this.load.image('puzzle3','./../assets/puzzles/puzzle3.png');        
        this.load.image('CorrectButton3','./../assets/puzzles/CorrectButton3.png');
        
    }

    create(){
        this.random =2.5// = Phaser.Math.FloatBetween(0, 3);
          
        if(this.random <= 1){
            
            
            this.incorrectButton1 = this.add.image(400,400,'puzzle1');
            this.correctButton1 = this.add.image(564,565 ,'CorrectButton1');
            this.correctButton1.setInteractive();
            this.incorrectButton1.setInteractive();
            this.correctButton1.on('pointerup', ()=>{
                console.log("correct");
                this.registry.set('puzzle', 1);
                this.scene.switch('gameScene');
            })
            this.incorrectButton1.on('pointerup', ()=>{
                this.correctButton1.setScale(1);
                this.scene.switch('gameScene');
            })
        }
        else if(this.random <= 2){
            console.log(this.random);
            this.incorrectButton2 = this.add.image(400,400,'puzzle2');
            this.correctButton2 = this.add.image(666,436,'CorrectButton2');
            
            this.correctButton2.setInteractive();
            this.incorrectButton2.setInteractive();
            this.correctButton2.on('pointerup', ()=>{
                console.log("correct");
                this.registry.set('puzzle', 1);
                this.correctButton2.setScale(1);
                this.scene.switch('gameScene');
            })
            this.incorrectButton2.on('pointerup', ()=>{
                this.correctButton2.setScale(1);
                this.scene.switch('gameScene');
            })
        }
        else if(this.random <= 3){
            console.log(this.random);
            this.incorrectButton3 = this.add.image(400,400,'puzzle3');
            this.correctButton3 = this.add.image(595,570,'CorrectButton3');
           
            this.correctButton3.setInteractive();
            this.incorrectButton3.setInteractive();          
            this.correctButton3.on('pointerup', ()=>{
                console.log("correct");
                this.registry.set('puzzle', 1);
                this.scene.switch('gameScene');
            })
            this.incorrectButton3.on('pointerup', ()=>{
                this.scene.switch('gameScene');
            })
        }
    }

    update(){
       
    }

}

export default PuzzleScene;

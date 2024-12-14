class GameOverScene extends Phaser.Scene {
    constructor(){
        super('gameOverScene');
    }
    preload(){
        
        this.load.image('pauseBackground','./assets/pauseBackground.jpg');
        this.load.image('Return to Main Menu','./assets/start.jpg');
        this.load.image('gameOver','./assets/gameOver.PNG');
        this.load.image('returnButton','./assets/return.PNG');
        this.load.image('resource_one', 'assets/resources/1 icons/Icon14_01.png');
        this.load.image('resource_two', 'assets/resources/1 icons/Icon14_03.png');
        this.load.image('resource_three', 'assets/resources/1 icons/Icon14_05.png');
        this.load.image('resource_four', 'assets/resources/1 icons/Icon14_24.png');
        this.load.image('resourcesCollected','./assets/resourcesCollected.PNG');
        this.load.image('puzzle0comp','../assets/puzzles/puzzle0complete.PNG');
        this.load.image('puzzle1comp','../assets/puzzles/puzzle1complete.PNG');
        this.load.image('puzzle2comp','../assets/puzzles/puzzle2complete.PNG');
        this.load.image('puzzle3comp','../assets/puzzles/puzzle3complete.PNG');
        //add in game over background
    }

    create(){
        let background = this.add.image(400,400, 'pauseBackground');
        let gameOver = this.add.image(400,250,'gameOver');
        let returnToMain = this.add.image(400,700,'returnButton').setScale(0.5);
        let resources_tag = this.add.image(400,350,'resourcesCollected').setScale(0.5);
        
       this.graphics = this.add.graphics();
        this.graphics.fillRect(135 , 380, 75, 40);
        this.resource1 = this.add.image(155, 400, 'resource_one');
        this.resource1text = this.add.text(175, 388, this.registry.get('resource_one'), { fontSize: '25px', fill: '#FFF' });

        this.graphics.fillRect(290, 380, 80, 40);
        this.resource2 = this.add.image(310, 400, 'resource_two');
        this.resource2text = this.add.text(335, 388, this.registry.get('resource_two'), { fontSize: '25px', fill: '#FFF' });

        this.graphics.fillRect(440, 380, 80, 40);
        this.resource3 = this.add.image(460, 400, 'resource_three');
        this.resource3text = this.add.text(485, 388, this.registry.get('resource_three'), { fontSize: '25px', fill: '#FFF' });

        this.graphics.fillRect(600, 380, 85, 40);
        this.resource4 = this.add.image(620, 400, 'resource_four');
        this.resource4text = this.add.text(650, 388, this.registry.get('resource_four'), { fontSize: '25px', fill: '#FFF' });

        this.puzzlesCompleted = 0;
        if(this.registry.get('puzzle1') == true)
            this.puzzlesCompleted += 1;
        if(this.registry.get('puzzle2') == true)
            this.puzzlesCompleted += 1;
        if(this.registry.get('puzzle3') == true)
            this.puzzlesCompleted += 1;

        console.log
        if(this.puzzlesCompleted == 0)
        {
            this.add.image(400,530,'puzzle0comp').setScale(0.5);
        } 
        else if(this.puzzlesCompleted == 1) {
            this.add.image(400,530,'puzzle1comp').setScale(0.5);
        }   
        else if(this.puzzlesCompleted == 2) {
            this.add.image(400,530,'puzzle2comp').setScale(0.5);
        }  
        else if(this.puzzlesCompleted == 3) {
            this.add.image(400,530,'puzzle3comp').setScale(0.5);
        }  

   
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
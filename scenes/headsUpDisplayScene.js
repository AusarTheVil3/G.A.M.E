class HUDScene extends Phaser.Scene {
    constructor(){
        super('HUDScene')
    }

    preload(){
        //Assets for the health bar
        this.load.image('heart',"./assets/skill-icon/1 Icons/10/Skillicon10_16.png")
        this.registry.set('health', 100);
        this.registry.set('resource_one', 0);
        this.registry.set('resource_two', 0);
        this.registry.set('resource_three', 0);
        this.registry.set('resource_four', 0);


        this.load.image('resource_one', 'assets/resources/1 icons/Icon14_01.png');
        this.load.image('resource_two', 'assets/resources/1 icons/Icon14_03.png');
        this.load.image('resource_three', 'assets/resources/1 icons/Icon14_05.png');
        this.load.image('resource_four', 'assets/resources/1 icons/Icon14_24.png');
        this.load.image('puzzle', 'assets/resources/1 icons/Icon14_22.png');
    }

    create(){
        this.heart = this.add.image(30, 30, 'heart');
        this.healthText = this.add.text(50,18,this.registry.get('health'), {fontSize: '25px',
            fill: '#000',});

        this.resource1 = this.add.image(155, 30,'resource_one');
        this.resource1text = this.add.text(175,18,this.registry.get('resource_one'), {fontSize: '25px',fill: '#000',});

        this.resource2 = this.add.image(230, 30,'resource_two');
        this.resource2text = this.add.text(255,18,this.registry.get('resource_two'), {fontSize: '25px',fill: '#000',});

        this.resource3 = this.add.image(310, 30,'resource_three');
        this.resource3text = this.add.text(335,18,this.registry.get('resource_three'), {fontSize: '25px',fill: '#000',});

        this.resource4 = this.add.image(390, 30,'resource_four');
        this.resource4text = this.add.text(420,18,this.registry.get('resource_four'), {fontSize: '25px',fill: '#000',});


        this.registry.events.on('changedata-health', (parent,value) => {this.healthText.setText(`${value}`)});
        this.registry.events.on('changedata-resource_one', (parent,value) => {this.resource1text.setText(`${value}`)});
        this.registry.events.on('changedata-resource_two', (parent,value) => {this.resource2text.setText(`${value}`)});
        this.registry.events.on('changedata-resource_three', (parent,value) => {this.resource3text.setText(`${value}`)});
        this.registry.events.on('changedata-resource_four', (parent,value) => {this.resource4text.setText(`${value}`)});
    }

    update(){
        
    }


}

export default HUDScene;
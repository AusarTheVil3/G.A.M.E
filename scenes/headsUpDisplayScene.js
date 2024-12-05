class HUDScene extends Phaser.Scene {
    constructor(){
        super('HUDScene')
    }

    preload(){
        //Assets for the health bar
        this.load.image('heart',"../assets/skill-icon/1 Icons/10/Skillicon10_16.png")
        this.registry.set('health', 100);
    }

    create(){
        this.heart = this.add.image(30, 30, 'heart');
        this.health_value = 100
        this.healthText = this.add.text(50,18,this.health_value, {fontSize: '25px',
            fill: '#000',});

        this.registry.events.on('changedata-health', (parent,value) => {this.healthText.setText(`${value}`)});
        
    }

    update(){
        
    }


}

export default HUDScene;
class HUDScene extends Phaser.Scene {
    constructor() {
        super('HUDScene');
    }

    preload() {
        // Assets for the health bar and other elements
        this.load.image('heart', "./assets/skill-icon/1 Icons/10/Skillicon10_16.png");
        this.load.image('resource_one', 'assets/resources/1 icons/Icon14_01.png');
        this.load.image('resource_two', 'assets/resources/1 icons/Icon14_03.png');
        this.load.image('resource_three', 'assets/resources/1 icons/Icon14_05.png');
        this.load.image('resource_four', 'assets/resources/1 icons/Icon14_24.png');
    }

    create() {
        // Health display
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x000000, 1);
    
        // Draw a rectangle (x, y, width, height)
        this.graphics.fillRect(15, 10, 80, 40);
        this.heart = this.add.image(30, 30, 'heart');
        this.healthText = this.add.text(50, 18, this.registry.get('health'), { fontSize: '25px', fill: '#FFF' });

        this.graphics.fillRect(135 , 10, 70, 40);
        // Resource display
        this.resource1 = this.add.image(155, 30, 'resource_one');
        this.resource1text = this.add.text(175, 18, this.registry.get('resource_one'), { fontSize: '25px', fill: '#FFF' });

        this.graphics.fillRect(210, 10, 75, 40);
        this.resource2 = this.add.image(230, 30, 'resource_two');
        this.resource2text = this.add.text(255, 18, this.registry.get('resource_two'), { fontSize: '25px', fill: '#FFF' });

        this.graphics.fillRect(290, 10, 75, 40);
        this.resource3 = this.add.image(310, 30, 'resource_three');
        this.resource3text = this.add.text(335, 18, this.registry.get('resource_three'), { fontSize: '25px', fill: '#FFF' });

        this.graphics.fillRect(370, 10, 80, 40);
        this.resource4 = this.add.image(390, 30, 'resource_four');
        this.resource4text = this.add.text(420, 18, this.registry.get('resource_four'), { fontSize: '25px', fill: '#FFF' });

        this.timer_box = this.add.graphics();
        // Timer display (hidden by default)
        this.timerText = this.add.text(
            this.scale.width - 220, // Position closer to the right edge
            18,
            '', // Start with an empty string
            { fontSize: '25px', fill: '#FFF' }
        );

        // Update events
        this.registry.events.on('changedata-health', (parent, value) => {
            this.healthText.setText(`${value}`);
        });

        this.registry.events.on('changedata-resource_one', (parent, value) => {
            this.resource1text.setText(`${value}`);
        });

        this.registry.events.on('changedata-resource_two', (parent, value) => {
            this.resource2text.setText(`${value}`);
        });

        this.registry.events.on('changedata-resource_three', (parent, value) => {
            this.resource3text.setText(`${value}`);
        });

        this.registry.events.on('changedata-resource_four', (parent, value) => {
            this.resource4text.setText(`${value}`);
        });


        
        

        this.registry.events.on('changedata-display_timer', (parent, value) => {
            if (value) {
                // Show the timer
                this.timer_box.fillRect(575, 10, 200, 40);         
                this.timer_box.setVisible(true);

                const timerValue = this.registry.get('timer');
                this.timerText.setText(`Next Wave: ${timerValue}`);
                this.timerText.setVisible(true);
                
            } else {
                // Hide the timer
                this.timerText.setVisible(false);                    
                this.timer_box.setVisible(false);
            }
        });
        
        this.registry.events.on('changedata-timer', (parent, value) => {
            if (this.registry.get('display_timer')) {
                // Update timer text if display_timer is true
                this.timerText.setText(`Next Wave: ${value}`);
                this.timerText.setVisible(true);
        
                if (value === 0) {
                    this.timerText.setStyle({ fill: '#FF0000' }); // Turn red when timer is 0
                } else {
                    this.timerText.setStyle({ fill: '#FFF' }); // Reset to black otherwise
                }
            }
        });

        // Ensure the timer is initially hidden if display_timer is false
        if (!this.registry.get('display_timer')) {
            this.timerText.setVisible(false);
        }
    }

    update() {
        // The timerText visibility will automatically update based on the registry value
    }
}

export default HUDScene;

// Create the main game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

// Initialize the game with the configuration
const game = new Phaser.Game(config);

// Preload assets
function preload() {
    // Load any assets like images or sounds here
}

// Create the title screen
function create() {
    // Add a background color
    this.cameras.main.setBackgroundColor('#333');

    // Add title text
    const titleText = this.add.text(400, 100, 'My Awesome Game', {
        fontSize: '48px',
        fill: '#ffffff'
    });
    titleText.setOrigin(0.5, 0.5);

    // Create Play button
    const playButton = this.add.text(400, 250, 'Play', {
        fontSize: '32px',
        fill: '#ffffff'
    });
    playButton.setOrigin(0.5, 0.5);
    playButton.setInteractive();
    playButton.on('pointerdown', () => {
        alert('Play Button Clicked!');
        // Here you would start the game or transition to the game scene
    });

    // Create Settings button
    const settingsButton = this.add.text(400, 350, 'Settings', {
        fontSize: '32px',
        fill: '#ffffff'
    });
    settingsButton.setOrigin(0.5, 0.5);
    settingsButton.setInteractive();
    settingsButton.on('pointerdown', () => {
        alert('Settings Button Clicked!');
        // Here you would open the settings menu
    });

    // Create Tutorial button
    const tutorialButton = this.add.text(400, 450, 'Tutorial', {
        fontSize: '32px',
        fill: '#ffffff'
    });
    tutorialButton.setOrigin(0.5, 0.5);
    tutorialButton.setInteractive();
    tutorialButton.on('pointerdown', () => {
        alert('Tutorial Button Clicked!');
        // Here you would show the tutorial screen or instructions
    });
}

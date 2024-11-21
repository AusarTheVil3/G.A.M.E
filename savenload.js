const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

const game = new Phaser.Game(config);

let player;
let gameState = {
    score: 0,
    position: { x: 0, y: 0 },
};

function preload() {
    this.load.image('player', 'path/to/player.png');
}

function create() {
    // Create the player sprite
    player = this.add.sprite(400, 300, 'player');

    // Load game state if available
    const savedState = loadGame();
    if (savedState) {
        gameState = savedState;
        player.setPosition(gameState.position.x, gameState.position.y);
    }

    // Save the game when 'S' is pressed
    this.input.keyboard.on('keydown-S', () => {
        gameState.position = { x: player.x, y: player.y };
        saveGame(gameState);
    });

    // Reset the game when 'L' is pressed
    this.input.keyboard.on('keydown-L', () => {
        const loadedState = loadGame();
        if (loadedState) {
            gameState = loadedState;
            player.setPosition(gameState.position.x, gameState.position.y);
        }
    });
}

function update() {
    // Example player movement
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
        player.x -= 5;
    } else if (cursors.right.isDown) {
        player.x += 5;
    }
    if (cursors.up.isDown) {
        player.y -= 5;
    } else if (cursors.down.isDown) {
        player.y += 5;
    }
}

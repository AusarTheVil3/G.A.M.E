// Save game state
export function saveGame(player, level, enemies) {
    const state = {
        player: {
            x: player.sprite.x,
            y: player.sprite.y,
            animation: player.sprite.anims.currentAnim ? player.sprite.anims.currentAnim.key : 'idle',
        },
        level: {
            ground: level.ground.getChildren().map(obj => ({ x: obj.x, y: obj.y })),
            platforms: level.platforms.getChildren().map(obj => ({ x: obj.x, y: obj.y })),
        },
        enemies: enemies.map(enemy => ({
            x: enemy.sprite.x,
            y: enemy.sprite.y,
            velocityX: enemy.sprite.body.velocity.x,
        })),
    };

    localStorage.setItem('gameState', JSON.stringify(state));
    console.log('Game saved:', state);
}

// Load game state
export function loadGame(player, level, enemies) {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const state = JSON.parse(savedState);

        // Load player state
        player.sprite.setPosition(state.player.x, state.player.y);
        player.sprite.anims.play(state.player.animation);

        // Load level state
        level.ground.clear(true, true);
        state.level.ground.forEach(pos => {
            level.ground.create(pos.x, pos.y, 'ground').setScale(55).refreshBody();
        });

        level.platforms.clear(true, true);
        state.level.platforms.forEach(pos => {
            level.platforms.create(pos.x, pos.y, 'ground').setScale(3).refreshBody();
        });

        // Load enemies state
        enemies.forEach((enemy, index) => {
            if (state.enemies[index]) {
                enemy.sprite.setPosition(state.enemies[index].x, state.enemies[index].y);
                enemy.sprite.setVelocityX(state.enemies[index].velocityX);
            }
        });

        console.log('Game loaded:', state);
    } else {
        console.log('No saved game found.');
    }
}

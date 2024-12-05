class LoadingScene extends Phaser.Scene {
    constructor(){
        super('loadingScene')
    }

    preload(){
        this.cameras.main.setBackgroundColor(0x000000);
        
    }

    create(){
        this.statusText = this.add.text(400, 400, "Loading");

        this.time.addEvent({
            delay: 5000,                  // 5 seconds (in milliseconds)
            callback: this.resumeScene,  // Function to call after the delay
            callbackScope: this          // Scope for the callback function
        });

        this.scenePaused = true;  
    }

    update(){
        if (this.scenePaused) return;
        
        this.scene.switch('gameScene');
    }

    resumeScene() {
        this.scenePaused = false;  
    }


}

export default LoadingScene;
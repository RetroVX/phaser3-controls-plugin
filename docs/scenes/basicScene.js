/**
 * Standard Scene to display the control schemes
 */
export default class basicScene extends Phaser.Scene {
    constructor() {
        super({key: 'basicScene'});
    }

    preload() {
        this.load.image('player', 'assets/block.png');
    }

    create() {

        this.sceneText = this.add.text(400, 24, 'Basic Example Scene', {fontFamily: 'Verdana', fontSize: 24, color: '#000000'}).setOrigin(0.5, 0.5);
        this.sceneText2 = this.add.text(400, 50, 'Press SPACE to change scene', {fontFamily: 'Verdana', fontSize: 24, color: '#000000'}).setOrigin(0.5, 0.5);

        this.player = this.add.sprite(400, 200, 'player');

        this.input.keyboard.on('keydown_SPACE', function (event) {

            this.scene.switch('comboScene');
    
        }, this);
    
        this.input.keyboard.addCapture('SPACE');

        // create cursor keys 
        this.controls.createCursorKeys(true);

        // create wasd keys 
        this.controls.createWasdKeys();

        // add new control scheme
        const config = {
            name: 'azertyKeys',
            controls: {
            up: 'Z',
            down: 'S',
            left: 'Q',
            right: 'D',
            shift: 'SHIFT',
            space: 'SPACE',
            },
            active: false,
        }
        this.controls.add(config);

        // Setup debug controls text
        // click on text to switch to next control scheme
        // x, y, font-size
        this.controls.debugText(225, 245, 18, '#000000');

    }

    update(time, delta) {
        // up
        if(this.controls.keys.up.isDown) {
            this.player.y -= 4;
        }
        // down
        else if(this.controls.keys.down.isDown) {
            this.player.y += 4;
        }
        // left
        if(this.controls.keys.left.isDown) {
            this.player.x -= 4;
        }
        // right
        else if(this.controls.keys.right.isDown) {
            this.player.x += 4;
        }
    }
}
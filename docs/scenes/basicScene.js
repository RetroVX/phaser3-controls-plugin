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

        this.player = this.add.sprite(400, 200, 'player');


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


        let dashLeft = this.controls.createCombo({ 
            name: 'dashLeft',
            combo: [37, 37],
            resetOnMatch: true,
            maxKeyDelay: 450,
            deleteOnMatch: false,
            schemes: ['cursorKeysDefault'],
            onMatched: function(scene) {
                scene.player.x -= 100;
            }
        });

        let dashRight = this.controls.createCombo({
            name: 'dashRight',
            combo: [39, 39],
            resetOnMatch: true,
            maxKeyDelay: 450,
            deleteOnMatch: false,
            schemes: ['cursorKeysDefault', 'wasdKeysDefault'],
            onMatched: function(scene) {
                scene.player.x += 100;
            }         
        });

        this.controls.createKonamiCode(function(scene){
            window.alert('30+ Lives!');
        })

        //dashRight.destroy();

        // Setup debug controls text
        // click on text to switch to next control scheme
        // x, y, font-size
        this.controls.debugText(225, 200, 20, '#000000');

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
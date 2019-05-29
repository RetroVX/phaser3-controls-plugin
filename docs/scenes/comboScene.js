/**
 * Standard Scene to display the control schemes
 */
export default class comboScene extends Phaser.Scene {
    constructor() {
        super({key: 'comboScene'});
    }

    preload() {

    }

    create() {

        this.sceneText = this.add.text(400, 24, 'Combo Example Scene', {fontFamily: 'Verdana', fontSize: 24, color: '#000000'}).setOrigin(0.5, 0.5);
        this.sceneText2 = this.add.text(400, 50, 'Press SPACE to change scene', {fontFamily: 'Verdana', fontSize: 24, color: '#000000'}).setOrigin(0.5, 0.5);

        this.player = this.add.sprite(400, 200, 'player');

        this.input.keyboard.on('keydown_SPACE', function (event) {

            this.scene.switch('basicScene');
    
        }, this);

        const controlText = 'Double tap Left Arrow or Right Arrow on your keyboard to dash';
        this.sceneText3 = this.add.text(400, 120, controlText, {fontFamily: 'Verdana', fontSize: 20, color: '#000000'}).setOrigin(0.5, 0.5);


        const basicExample = this.controls.createCombo({
            combo: 'AA',
            resetOnMatch: true,
            onMatch: function(scene, event) {
                console.log('I run every time this combo matches!')
            },
            onMatchOnce: function(scene, event) {
                console.log('I only run once!');
            }
        });

        

        let dashLeft = this.controls.createCombo({ 
            name: 'dashLeft',
            combo: [37, 37],
            resetOnMatch: true,
            maxKeyDelay: 450,
            deleteOnMatch: false,
            onMatch: function(scene) {
                scene.tweens.add({
                    targets: scene.player,
                    x: scene.player.x - 150,
                    duration: 250,
                    ease: 'Power1', 
                });
            }
        });

        let dashRight = this.controls.createCombo({
            name: 'dashRight',
            combo: [39, 39],
            resetOnMatch: true,
            maxKeyDelay: 450,
            deleteOnMatch: false,
            onMatch: function(scene) {
                scene.tweens.add({
                    targets: scene.player,
                    x: scene.player.x + 150,
                    duration: 250,
                    ease: 'Power1', 
                });
            }         
        });

        this.controls.createKonamiCode(function(){
            window.alert('30+ Lives!');
        });

        //dashRight.destroy();


    }

    update(time, delta) {

    }
}
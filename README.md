# Phaser 3 Controls

A simple class to assist with creating control schemes with keyboard inputs for Phaser 3


### Demo
[https://retrovx.github.io/phaser3-controls/](https://retrovx.github.io/phaser3-controls/)

## Getting Started

### Install

```
git clone https://github.com/RetroVX/phaser3-controls.git
```
Or download from Zip

#### Import into a Phaser scene

index.html
```html
<script type="text/javascript" src="lib/phaser.js"></script>
<script src="game.js" type="module"></script>
```

game.js
```javascript
import levelScene from "./levelScene.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "gameCanvas",
    scene: levelScene,

};

const game = new Phaser.Game(config);
```

levelscene.js

```javascript
import phaserControls from "./phaserControls.js";

// pass scene instance
this.controls = new phaserControls(this);
```

Full example of levelScene.js below.

#### Config
[Phaser 3 keyCodes docs](https://github.com/photonstorm/phaser/blob/v3.16.2/src/input/keyboard/keys/KeyCodes.js)

```javascript
const config = {
    // name of the controller scheme
    name: 'WASDKeys',

    // setup controls
    controls: {
        up: 'W',
        down: 'S',
        left: 'A',
        right: 'D',
        shift: 'SHIFT',
        space: 'SPACE'
    },
    // if true then this controller scheme will be used (only one scheme can be 'active' at one time)
    active: true,
}
```

### Examples

##### Add new control scheme:

```javascript
this.controls.add({
    name: 'azerty',
    controls: {
        up: 'Z',
        down: 'S',
        left: 'Q',
        right: 'D',
        shift: 'SHIFT',
        space: 'SPACE',
    },
    active: false,
});
```

##### Add multiple control schemes
```javascript
let array = [
    {config},
    {config},
    {config},
];

this.controls.addMultiple(array);

```

##### Access Controls
```javascript
this.controls.keys
// this.controls.keys.up
```

##### Access Control Schemes
```javascript
// returns schemes array
this.controls.schemes;
```

##### Create WASD keys (w,a,s,d, shift, space) or CURSOR keys (up, down, left, right, shift, space)

```javascript
// options
// active - (default false) set this scheme to active (this overrides the current active control scheme)
// add to schemes array - (default true) adds this control scheme to to the schemes array

this.controls.createWasdKeys();
this.controls.createCursorKeys();
```

##### Get control scheme object

```javascript
// get scheme object. Leave blank to get currently used control scheme
let scheme = this.controls.get('azerty');
// returns - {name: "azerty", controls: {…}, active: false}

// get currently used control scheme, set to true to return only the control scheme name string 
let currentScheme = this.controls.getActive();
```

##### Select control scheme to use
```javascript
// scheme - pass in either the control scheme name string or object
this.controls.setActive(scheme);
```

##### Edit control scheme
```javascript
// 
let getScheme = this.controls.get('azerty');
// scheme (object || string) - pass in control scheme to edit
// config (object) - config to replace chosen control scheme
this.controls.edit(getScheme, {
    name: 'azertyEdit',
    controls: {
    up: 'Z',
    down: 'S',
    left: 'Q',
    right: 'D',
    shift: 'SHIFT',
    space: 'SPACE',
    },
    active: false,
})
```

##### Delete control scheme
```javascript
// delete control scheme
// scheme - pass in either control scheme name string or object
// destroy - ( >= phaser v3.16) - removes keys and removes captures
this.controls.delete(scheme, destroy);
```

##### Debug control scheme text
```javascript
// Setup debug controls text
// click on text to switch to next control scheme
// x, y, font-size
this.controls.debugText(200, 200, 20);
```

#### levelScene.js Example

```javascript
import phaserControls from "./phaserControls.js";

export default class levelScene extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image('player', 'assets/player.png');
    }

    create() {

        this.player = this.add.sprite(400, 400, 'player');

        this.controls = new phaserControls(this);

        const config = {
            name: 'cursorKeys',

            controls: {
                up: 'UP',
                down: 'DOWN',
                left: 'LEFT',
                right: 'RIGHT',
                shift: 'SHIFT',
                space: 'SPACE',
                attack: 'Z'
            },

            active: true,
        }

        this.controls.add(config);

        // where the current keys are stored
        //this.controls.keys;
        //this.controls.keys.up
        //this.controls.keys.down
        //this.controls.keys.left
        //this.controls.keys.right
        //this.controls.keys.shift
        //this.controls.keys.space
        //this.controls.keys.attack
    }

    update(time, delta) {

        if(this.controls.keys.up.isDown) {
            this.player.y -= 4;
        }
        else if(this.controls.keys.down.isDown) {
            this.player.y += 4;
        }

        if(this.controls.keys.left.isDown) {
            this.player.x -= 4;
        }
        else if(this.controls.keys.right.isDown) {
            this.player.x += 4;
        }

        //if(this.controls.keys.space.isDown) {
        //    // do something
        //}
        //else if(this.controls.keys.attack.isDown) {
        //    // do something else
        //}

    }
```

#### Made With [Phaser.io](https://phaser.io)
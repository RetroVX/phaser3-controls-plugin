# Phaser 3 Controls Plugin

A simple plugin to assist with creating control schemes with keyboard inputs for Phaser 3


### Demo

https://retrovx.github.io/phaser3-controls-plugin/

## Getting Started

### Prerequisites

* Phaser 3.16 +

### Install

```
git clone https://github.com/RetroVX/phaser3-controls-plugin.git
```
Or download from Zip

#### Install as a global scene plugin

Use phaserControlsPlugin.js or phaserControlsPlugin.min.js  

game config  
```javascript
import levelScene from "./scenes/levelScene.js";
import phaserControls from "./path/to/phaserControlsPlugin.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    plugins: {
    scene: [
        { key: 'phaserControls', plugin: phaserControls, mapping: 'controls' }
    ]
    },
    parent: "gameCanvas",
    scene: [levelScene],
};

const game = new Phaser.Game(config);
```

levelScene.js
```javascript
// You can now access the plugin from any scene using this.controls
this.controls
```

Or

#### Import into a Phaser scene

Use phaserControls.js or phaserControls.min.js  


```javascript
import phaserControls from "./path/to/phaserControls.js";

// pass scene instance
this.controls = new phaserControls(this);
```

#### Config
[Phaser 3 keyCodes docs](https://github.com/photonstorm/phaser/blob/v3.16.2/src/input/keyboard/keys/KeyCodes.js)

```javascript
const config = {
    // name of the controller scheme
    name: 'WASDKeys',

    // if true then this control scheme will be used (only one scheme can be 'active' at one time)
    active: true,

    // setup controls
    controls: {
        up: 'W',
        down: 'S',
        left: 'A',
        right: 'D',
        shift: 'SHIFT',
        space: 'SPACE'
    },

    // optional. Pass any data you want to add to the control scheme
    data: {},

    // optional function to call whenever this control scheme is set to active
    // scene - (optional) the scene this function is running in
    // scheme - (optional) the control scheme object
    onActive: function(scene, scheme) {
        console.log(scheme.name + ' is active!');
    }
}
```

### Examples

#### Add new control scheme:

```javascript
this.controls.add({
    name: 'azerty',
    active: false,
    controls: {
        up: 'Z',
        down: 'S',
        left: 'Q',
        right: 'D',
        shift: 'SHIFT',
        space: 'SPACE',
    },
});
```

#### Add multiple control schemes
```javascript
let array = [
    {config},
    {config},
    {config},
];

this.controls.addMultiple(array);

```

#### Access Controls
```javascript
this.controls.keys
// this.controls.keys.up.isDown
// this.controls.keys.down.isDown
// this.controls.keys.left.isDown
// this.controls.keys.right.isDown
```

#### Access Control Schemes
```javascript
// returns schemes array with all saved control schemes
this.controls.getAll();
```

#### Create WASD keys (w,a,s,d, shift, space) or CURSOR keys (up, down, left, right, shift, space)

```javascript
// options
// active - (default false) set this scheme to active (this overrides the current active control scheme)
// add - (to schemes array0 - (default true) adds this control scheme to to the schemes array
// data - optional data to pass to this control scheme
// onActive (scene, scheme) - optional function to call when this control scheme is set active

this.controls.createWasdKeys();
// cursor keys set active, add to schemes array, pass no data, add onActive function
this.controls.createCursorKeys(true, true, null, function(scene, scheme){
    console.log('Cursor Keys is active!');
});
```

#### Get control scheme object

```javascript
// get scheme object. Leave blank to get the active control scheme
let scheme = this.controls.get('azerty');
// returns - {name: "azerty", controls: {…}, active: false}

// get the active control scheme, set to true to return only the control scheme name string 
let currentScheme = this.controls.getActive();
```

#### Select control scheme to use
```javascript
// scheme - pass in either the control scheme name string or object
this.controls.setActive(scheme);
```
Or
```javascript
// scheme - pass in either the control scheme name string or object
this.controls.switch(scheme);
```


#### Edit control scheme
```javascript
// 
let getScheme = this.controls.get('azerty');
// scheme (object || string) - pass in control scheme to edit
// config (object) - config to replace chosen control scheme
this.controls.edit(getScheme, {
    name: 'azertyEdit',
    active: false,
    controls: {
        up: 'Z',
        down: 'S',
        left: 'Q',
        right: 'D',
        shift: 'SHIFT',
        space: 'SPACE',
    },
})
```

#### Delete control scheme
```javascript
// delete control scheme
// scheme - pass in either control scheme name string or object
// destroy - ( >= phaser v3.16) - boolean, removes keys and removes captures
this.controls.delete(scheme, destroy);
```

#### Enable Keys
```javascript
// enables keys from active control scheme
this.controls.enableKeys();
```

#### Disable Keys
```javascript
// disables keys from active control scheme
this.controls.disableKeys();
```

#### Create a key combo
Basic Example:  
```javascript
// config options
const comboConfig = {
    combo: 'AA', // the combo to use
    name: '', // optional - name to reference by if needed
    data: {}, // optional - data to pass into the combo event
    resetOnMatch: true, // optional - reset the combo on match, default false
    maxKeyDelay: 450, // optional - the delay between key presses, if longer then it resets the combo, default 0
    deleteOnMatch: false, // optional - delete the combo when the combo is complete, default false
    schemes: ['myControlScheme1', 'controlScheme2'], // optional - control schemes that use this combo, default ['global']
    onMatch: function(scene, event) {}, // function to call when the combo is a match
    onMatchOnce: function(scene, event) {} // Same as onMatch but only runs once
}

// create the combo to dash player left
let dashLeft = this.controls.createCombo({ 
    combo: 'AA',
    onMatch: function(scene) {
        scene.player.x -= 100;
    }
});

// create a combo that only works if 'yourcontrolscheme' is active
let dashLeftWasd = this.controls.createCombo({ 
    combo: 'AA',
    schemes: ['yourcontrolscheme'],
    onMatch: function(scene) {
        scene.player.x -= 100;
    }
});

// delete combo
dashLeft.delete();
```

#### Create the Konami Code
```javascript
this.controls.createKonamiCode(function(scene){
    window.alert('30+ Lives!');
});
```

#### Record Player Key Inputs
```javascript
// use inside the update() function
this.controls.recordKeys();
// returns an array with an object for each key pressed
// the object contains - key, keyCode, duration the key was down, timestamp of when the key was down
```

#### Convert a keyCode to a Key
```javascript
// a helper function to input a keyCode or an array of keyCodes and convert them to phaser key strings
this.controls.keyCodeToKey(37);
// returns - 'LEFT'
this.controls.keyCodeToKey([37, 39]);
// returns - ['LEFT', 'RIGHT']
```

#### Debug control scheme text
```javascript
// Setup debug controls text
// click on text to switch to next control scheme
// x, y, font-size, font color
this.controls.debugText(200, 200, 20, '#000000');
```

#### levelScene.js Example

```javascript

export default class levelScene extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image('player', 'assets/player.png');
    }

    create() {

        this.player = this.add.sprite(400, 400, 'player');

        const config = {
            name: 'cursorKeys',

            active: true,

            controls: {
                up: 'UP',
                down: 'DOWN',
                left: 'LEFT',
                right: 'RIGHT',
                shift: 'SHIFT',
                space: 'SPACE',
                attack: 'Z'
            },

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

#### Todo
 - Create more examples

#### Made With [Phaser.io](https://phaser.io)

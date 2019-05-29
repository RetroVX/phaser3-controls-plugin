/**
 * @author Conor Irwin <conorirwin.co.uk> 
 * @classdesc 
 * GitHub: https://github.com/retroVX/phaser3-controls-plugin <br>
 * A simple plugin to assist with creating control schemes with keyboard inputs for Phaser (3) <br>
 * @version: 1.5.0
 * @class phaserControls
 * @extends Phaser.Plugins.ScenePlugin
 * @param {Phaser.Scene} scene - The Scene the phaserControls will be created in (this)
 * @param {Phaser.pluginManager} pluginManager - Phaser plugin manager
 */

export default class phaserControls extends Phaser.Plugins.ScenePlugin {

    constructor(scene, pluginManager) {

        super(scene, pluginManager);

        /**
         * Get 'this' from scene
         * @name phaserControls.scene
         * @type {Object}
         * @since 1.0.0
        */

        this.scene = scene;


        /**
         * Holds all the control schemes in an array
         * @name phaserControls.schemes
         * @type {Array}
         * @since 1.0.0
        */  

        this.schemes = [];


        /**
         * Stores the keyboard keys that have been created from a control scheme
         * @name phaserControls.keys
         * @type {Object}
         * @since 1.0.0
        */ 

        this.keys = null;


        /**
         * Holds all inputs recorded with phaserControls.recordKeys
         * @name phaserControls.inputArray
         * @since 1.5.0
         */
        this.inputArray = [];


        /**
         * Key Combo Match event
         * @since 1.3.0
        */

        this.scene.input.keyboard.on('keycombomatch', function (event, key, data) {
            for(let i = 0; i < event.schemes.length; i++) {

                if(event.schemes[0] === 'global' || this.getActive().name === event.schemes[i]) {

                    // run onMatch function
                    if(event.onMatch !== undefined) {
                        event.onMatch(this.scene, event);
                    }

                    // run onMatchOnce if function passed in and counter is 0
                    if(event.counter === 0 && event.onMatchOnce !== undefined) {
                        event.onMatchOnce(this.scene, event);
                    }

                    // increase counter
                    event.counter += 1;
                }
            }

        }, this);

    }


    /**
     * boot function for plugin, setup event handlers
     */

    boot() {
        const eventEmitter = this.systems.events;
        eventEmitter.once('destroy', function(){
            // remove everything
            for(let i = 0; i < this.schemes.length; i++) {
                this.delete(this.schemes[i], true);
            }

            this.scene = null;
            this.schemes = null;
            this.keys = null;

        }, this);
    }


    /**
    * Create default cursor keys.  
    * The difference between this.input.keyboard.createCursorKeys(); and phaserControls.createCursorKeys();
    * is that the phaserControls will be added to the control scheme array with other created control schemes.
    * @method phaserControls.createCursorKeys
    * @type {function}
    * @param {boolean} [active=false] - If the cursor keys should be used, overiding current scheme
    * @param {boolean} [add=true] - add the default cursor keys to the schemes list
    * @param {object} data - optional data to pass into the control scheme
    * @param {function} onActiveFunc - optional function to call whenever this control scheme is set to active
    * @since 1.0.0
    */

    createCursorKeys(active, add, data, onActiveFunc) {
        // make sure 'add' & 'active' are not undefined
        if (active === undefined || active === null) active = false;
        if (add === undefined || add === null) add = true;
        if (data === undefined || data === null) data = {},

        // scheme
        this.cursorKeys = {
            name: 'cursorKeysDefault',
            active: active,
            controls: {
                up: 'UP',
                down: 'DOWN',
                left: 'LEFT',
                right: 'RIGHT',
                shift: 'SHIFT',
                space: 'SPACE'
            },
            data: data,
            onActive: function(scene, scheme) {
                if(onActiveFunc !== undefined) {
                    onActiveFunc(scene, scheme);
                }
            }
        }
        // if true add to list of schemes
        if (add) {
            this.add(this.cursorKeys);
            // select cursor key scheme if set to 'active'
            if (active) {
                this.setActive('cursorKeysDefault');
            }
        }

        return this.cursorKeys;
    }


    /**
    * Create default wasd keys. The same approach as phaserControls.createCursorKeys but using WASD instead.
    * @method phaserControls.createWasdKeys
    * @type {function}
    * @param {boolean} [active=false] - If the wasd keys should be used, overiding current scheme
    * @param {boolean} [add=true] - add the default wasd keys to the schemes list
    * @param {object} data - optional data to pass into the control scheme
    * @param {function} onActiveFunc - optional function to call whenever this control scheme is set to active
    * @since 1.0.0
    */
  
    createWasdKeys(active, add, data, onActiveFunc) {
        // make sure 'add' & 'active' are not undefined
        if (active === undefined || active === null) active = false;
        if (add === undefined || add === null) add = true;
        if (data === undefined || data === null) data = {},

        // scheme
        this.wasdKeys = {
            name: 'wasdKeysDefault',
            active: active,
            controls: {
                up: 'W',
                down: 'S',
                left: 'A',
                right: 'D',
                shift: 'SHIFT',
                space: 'SPACE'
            },
            data: data,
            onActive: function(scene, scheme) {
                if(onActiveFunc !== undefined) {
                    onActiveFunc();
                }
            }
        }

        // if true add to list of schemes
        if (add) {
            this.add(this.wasdKeys);
            // select wasd key scheme if set to 'active'
            if (active) {
                this.setActive('wasdKeysDefault');
            }
        }

        return this.wasdKeys;
    }


    /**
    * Add new control scheme and switch to the new scheme if it's set to 'active'
    * @method phaserControls.add
    * @type {function}
    * @param {object} config - A new scheme config to be added to the schemes array
    * @since 1.0.0
    */

    add(config) {
        if(config.data === undefined || config.data === null) config.data = {};
        // add new control scheme
        this.schemes.push(config);

        // if new control scheme is set to 'active' then switch
        if (config.active) {
            this.setActive(config);
        }
    }


    /**
    * Adds an array of multiple control scheme objects into the schemes array <br>
    * Useful if saving the controls with localStorage
    * @method phaserControls.addMultiple
    * @type {function}
    * @param {Array} array - An array of control scheme objects
    * @since 1.0.0
    */

    addMultiple(array) {

        if(array.length > 0) {
            // get schemes from passed in array and add to the phaserControls.schemes array
            array.forEach(function(config, index){
                this.schemes.push(config);

                if(config.active) {
                    this.setActive(config);
                }
            })
        } 
    }


    /**
    * Returns the control scheme object that matches the control scheme name
    * @method phaserControls.get
    * @type {function}
    * @param {string} name - The name of the scheme to get and return as object
    * @param {boolean} [active=false] - if the scheme should be used, overiding current scheme
    * @return {Object} The control scheme object
    * @since 1.0.0
    */

    get(name, active) {
        // if name is undefined then return the currently used scheme
        if (name === undefined || name === null) return this.getActive();
        if (active === undefined || active === null) active = false;

        // find the scheme
        let getScheme = this.schemes.find(function (s) {
            return s.name === name;
        });

        // if set to active
        if (active) {
            this.setActive(getScheme);
        }

  
        return getScheme;
        
    }


    /**
    * Returns the active control scheme object or name string
    * @method phaserControls.getActive
    * @type {function}
    * @param {boolean} [name=false] - If true returns only the schemes name
    * @return {(Object|string)} The control scheme object or string
    * @since 1.0.0
    */

    getActive(name) {
        if (name === undefined || name === null) name = false;
        // find the scheme
        let findScheme = this.schemes.find(function (s) {
            return s.active === true;
        });
        // if name is set to true then only return the current schemes name
        if (name) {
            return findScheme.name;
        } else {
            return findScheme;
        }

    }

    /**
     * returns an array with all the control schemes
     * @method phaserControls.getAll
     * @type {function}
     * @return {Array} The array containing the control schemes
     * @since 1.1.0
    */

    getAll() {
        return this.schemes;
    }


    /**
     * Switch from one control scheme to another  
     * Alternative way of setActive();
     * @method phaserControls.switch
     * @type {function}
     * @param {(string|object)} scheme - the control scheme to switch to
     * @since 1.1.0
    */
   
    switch(scheme) {
        // setActive will automatically switch the old and new schemes
        this.setActive(scheme);
    }


    /**
    * Select control scheme while turning off the currently used scheme
    * @method phaserControls.setActive
    * @type {function}
    * @param {(string|Object)} scheme - the 'name' or object of a scheme to be selected
    * @since 1.0.0
    */

    setActive(scheme) {
        const scene = this.scene;
        let getNewScheme;
        // find scheme and set to 'active' while setting others to false
        this.schemes.forEach(function (s) {
            if (s.active) {
                s.active = false;
            }
            // find by string or by object 
            if (scheme === s.name || scheme === s) {
                s.active = true;
                getNewScheme = s;
            }
        });

        if(getNewScheme.onActive !== undefined) {
            getNewScheme.onActive(scene, getNewScheme);
        }

        // set new keys
        this.keys = scene.input.keyboard.addKeys(getNewScheme.controls);
    }


    /**
    * Edit control scheme. This is used if you need to edit a control scheme on the front end
    * @method phaserControls.edit
    * @type {function}
    * @param {(string|object)} scheme - The scheme name to find and edit
    * @param {Object} config - config to edit
    * @since 1.0.0
    */

    edit(scheme, config) {
        // find scheme then overwrite the scheme with the config
        this.schemes.forEach(function (s, index) {
            if (s.name === scheme || s === scheme) {
                this.schemes[index] = config;
            }
        }, this);

    }


    /**
    * Delete scheme from the schemes array and removes key and key captures
    * @method phaserControls.delete
    * @type {function}
    * @param {(string|object)} scheme - The scheme name to find and delete
    * @param {boolean} [destroy=true] - Removes keys and captures used by scheme (phaser version >= 3.16)
    * @since 1.0.0
    */

    delete(scheme, destroy) {
        if(destroy === undefined || destroy === null) destroy = true;
        const scene = this.scene;
        let schemesArray = this.getAll();
        let nextScheme = false;
        let currentControls = Object.keys(this.keys);

        // find matching scheme then splice from the array
        schemesArray.forEach(function (s, index) {
            if (s.name === scheme || s === scheme) {
                // if the deleted scheme was the active scheme
                if (s.active) {
                    nextScheme = true;
                }

                // delete keys and captures if set to 'destroy'
                if (destroy) {
                    currentControls.forEach(function (key) {
                        scene.input.keyboard.removeCapture(this.keys[key].keyCode);
                        scene.input.keyboard.removeKey(this.keys[key]);
                    }, this);
                }

                // remove scheme from this.schemes array
                schemesArray.splice(index, 1);
            }
        }, this);

        if (nextScheme) {
            // select the first scheme in the array
            this.setActive(schemesArray[0]);
        }
    }


    /**
     * Create a key combo  
     * Add a combo scheme globally or only when using a specific control scheme
     * @method phaserControls.createCombo
     * @param {Object} scheme - combo scheme config to pass into the keyboard manager
     * @type {function}
     * @return {Object} returns the combo object so you can edit/delete when needed
     * @since 1.3.0     
     */

    createCombo(scheme) {
        const scene = this.scene;

        if (scheme.maxKeyDelay === undefined || scheme.maxKeyDelay === null) scheme.maxKeyDelay = 0;
        if (scheme.resetOnMatch === undefined || scheme.resetOnMatch === null) scheme.resetOnMatch = false;
        if (scheme.deleteOnMatch === undefined || scheme.deleteOnMatch === null) scheme.deleteOnMatch = false;
        if (scheme.schemes === undefined || scheme.schemes === null) scheme.schemes = ['global'];

        // create the combo
        let combo = scene.input.keyboard.createCombo(scheme.combo, { maxKeyDelay: scheme.maxKeyDelay, resetOnMatch: scheme.resetOnMatch, deleteOnMatch: scheme.deleteOnMatch });
        // combo name
        combo.name = scheme.name;
        // optional data to pass
        combo.data = scheme.data;
        // function to call when combo matches
        combo.onMatch = scheme.onMatch;
        // function to call when combo matches once
        combo.onMatchOnce = scheme.onMatchOnce;
        // combo will only work if a specific control scheme is being used
        combo.schemes = scheme.schemes;
        // counter for onMatchOnce
        combo.counter = 0;

        return combo;
    }


    /**
     * Create the Konami Code (up,up,down,down,left,right,left,right,b,a)
     * @method phaserControls.createKonamiCode
     * @type {function}
     * @param {Function} onMatch - function to call when konami code has been entered
     * @return {Object} returns the konami combo object
     * @since 1.3.0     
     */
    
    createKonamiCode(onMatch) {
        const scene = this.scene;

        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

        // create the konami code
        let konamiCombo = scene.input.keyboard.createCombo(konamiCode);
        konamiCombo.name = 'konamiCode';
        konamiCombo.onMatch = onMatch;
        konamiCombo.schemes = ['global'];

        return konamiCombo;
    }


    /**
     * record which key was pressed down, for how long and the timestamp when the key was down <br> 
     * @method phaserControls.recordKeys
     * @type {function}
     * @return {array} returns the array holding the input objects
     * @since 1.5.0
     */

    recordKeys() {
        const scene = this.scene;
        // get the active scheme to capture the key
        const scheme = this.getActive();
        // get active keys
        const keys = this.keys;
        // array to hold the inputs
        const inputArray = this.inputArray;
        // convert keys object to an array to get each key
        let currentControls = Object.keys(keys);

        // loop through the active keys
        currentControls.forEach(function (key) {
            
            // when the key is released, record the key string ('LEFT'), keycode (37), duration the key was down (530ms)
            // and the timestamp of when the key was down (5340.33) into an object and push into the inputArray
            if(Phaser.Input.Keyboard.JustUp(keys[key])) {
                let inputObj = {
                    keyCode: keys[key].keyCode,
                    key: scheme.controls[key],
                    duration: keys[key].duration,
                    lastDown: keys[key].timeDown
                }
                inputArray.push(inputObj);
            }

        }, this);

        // return the array
        return inputArray;
    }


    /**
     * Helper function to enable all the keys for the active control scheme
     * @method phaserControls.enableKeys
     * @type {function}
     * @since 1.5.0
     */

    enableKeys() {
        const scene = this.scene;
        // convert keys object to an array to get each key
        let currentControls = Object.keys(this.keys);

        currentControls.forEach(function (key) {
            this.keys[key].enabled = true;
        }, this);

    }


    /**
     * Helper function to disable all the keys for the active control scheme
     * @method phaserControls.disableKeys
     * @type {function}
     * @since 1.5.0
     */

    disableKeys() {
        const scene = this.scene;
        // convert keys object to an array to get each key
        let currentControls = Object.keys(this.keys);

        currentControls.forEach(function (key) {
            this.keys[key].enabled = false;
        }, this);

    }


    /**
     * Helper function to convert a keyCode either from phaser keyboard or from window event to the phaser key string
     * @method phaserControls.keyCodeToKey
     * @type {function}
     * @param {(number|array)} keyCode - the keyCode to convert or an array of keyCodes to convert
     * @return {(string|array)} Returns the key name or an array of key names
     * @since 1.5.0
     */
    keyCodeToKey(keyCode) {
        // get the keys and values from Phaser.Input.Keyboard.KeyCodes
        const phaserKeyNames = Object.keys(Phaser.Input.Keyboard.KeyCodes);
        const phaserKeyCodes = Object.values(Phaser.Input.Keyboard.KeyCodes);

        let keyCodeIsArray = false;
        // the array to hold the converted keyCodes if keyCodeIsArray is true
        let keyArray = [];
        // the new key string to return if the paramter keyCode is a number 
        let newKey;
        // check if paramter is an array or just a number
        if(keyCode instanceof Array) keyCodeIsArray = true;

        phaserKeyCodes.forEach(function(key, index) {
            // if the keyCode parameter is an array, loop through the array and convert to key names
            if(keyCodeIsArray) {
                // loop through the passed in array
                keyCode.forEach(function(kCode){
                    if(kCode === key) {
                        keyArray.push(phaserKeyNames[index]);
                    }
                })
            }
            // if keyCode is a number then convert the keyCode to a key name
            if(!keyCodeIsArray && keyCode === key) {
                // update newKey
                newKey = phaserKeyNames[index];
            }
        }, this);

        // return an array or number depending on the parameter type
        if(keyCodeIsArray) {
            return keyArray;
        }
        else {
            return newKey;
        }
    }


    /**
    * Debug text displaying current control scheme thats being used.
    * Click on the text to move onto the next control scheme and select it.
    * @method phaserControls.debugText
    * @type {function}
    * @param {number} x - x coordinate for text display on canvas
    * @param {number} y - y coordinate for text display on canvas
    * @param {number} fontsize - Fontsize to display the text at.
    * @param {string} color - font color.
    * @since 1.0.0
    */

    debugText(x, y, fontsize, color) {

        const scene = this.scene;
        let i = 0;
        // show the control scheme that is currently being used
        let scheme = this.getActive();

        // create the text to display the control schemes
        let controlsText = scene.add.text(x, y, 'Click text to change the control scheme. \n \n' + JSON.stringify(scheme, undefined, 2), {
            fontFamily: 'Verdana',
            fontSize: fontsize,
            color: color
        }).setOrigin(0.5, 0.5);
        // add setInteractive on text so we can click on the text
        controlsText.setInteractive(new Phaser.Geom.Rectangle(0, 0, controlsText.width, controlsText.height), Phaser.Geom.Rectangle.Contains);
        // when text is clicked on then display and set to active the next control scheme
        controlsText.on('pointerdown', function (pointer) {
            if (i < this.schemes.length - 1) {
                i++;
            } else {
                i = 0;
            }
            scheme = this.schemes[i];
            // update text and control scheme
            this.setActive(this.schemes[i].name);
            controlsText.setText('Click text to change the control scheme. \n \n' + JSON.stringify(scheme, undefined, 2));
        }, this);
    }
}

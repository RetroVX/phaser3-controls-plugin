# Phaser 3 Controls CHANGELOG

### VERSION 1.5.0

* Added ```enableKeys()``` helper function to enable all keys for the control scheme that is active
* Added ```disableKeys()``` helper function to disable all keys for the control scheme that is active
* Added ```recordKeys()``` function that records key inputs into an array
    * returns an array with objects that provide the key, keyCode, duration of key being held down and the timestamp of when the key was down
* Added ```keyCodeToKey()``` helper function that converts window keyCodes to the phaser key name string
    * input a keyCode or an array of keyCodes
* Minor clean up of code
* updated docs and README.md

### VERSION 1.4.0

* Added parameter optional ```onMatchOnce(scene, event);``` function to the ```createCombo()``` config
* Added parameter optional data object to pass into the ```createCombo()``` config
* Added parameter optional ```onActive(scene, scheme)``` function to the ```add()``` config
* Added parameter optional data object to pass into the ```add()``` config
* Fixed ```switch()``` function
* Updated examples and README.md

### VERSION 1.3.2

* Fixed error with combo for konami code
* minor update to README.md
* minor update to index.html inside docs folder

### VERSION 1.3.1

* Fixed minor bug with combo name being undefined
* Changed onMatched to ```onMatch``` for ```createCombo()``` function
* Fixed examples in doc folder

### VERSION 1.3.0

* Added ```createCombo(comboConfig, event)``` function that easily creates key combos
    * Example added to basicScene.js inside docs/scene folder
    * Allows combos to only be used depending on the control scheme or it can be used globally
* Added ```createKonamiCode(function(scene, event){})```
* Updated README.md to reflect changes
* Updated JSDOCs found in docs/out folder

### VERSION 1.2.0

* Created the phaserControlsPlugin
    * Easy installation, no need to import phaserControls into each scene thats needed
    * globally accessible within scenes using 'this.controls'
* Added example for installing plugin
* Revision of README.md to reflect changes
    * default install method will now be via the plugin

### VERSION 1.1.0

* fixed the schemes array from testing
* cleanup of phaserControls.js for readability
* Added ```getAll()``` function that returns all the control schemes added to phaserControls 
* Added ```switch(scheme)``` function as an alternative to ```get(scheme, true)``` or ```setActive()```
* updated README.md to reflect changes


### VERSION 1.0.1

* minor cleanup of phaserControls.js


### VERSION 1.0.0

* phaserControls.js
* First attempt at using jsDoc
* Added README.md
* Basic example created (inside docs folder)
* Replaced phaser.js file with phaser.min.js to decrease load times in demo
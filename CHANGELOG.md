# Phaser 3 Controls CHANGELOG

### VERSION 1.2.0

* Created the phaserControlsPlugin
    * Easy installation, no need to import phaserControls into each scene thats needed anymore
    * globally accessible within scenes using 'this.controls'
* Added example for installing plugin
* Revision of README.md to reflect changes
    * default install method will now be via the plugin

### VERSION 1.1.0

* fixed the schemes array from testing
* cleanup of phaserControls.js for readability
* Added getAll() function that returns all the control schemes added to phaserControls 
* Added switch(oldScheme, newScheme) function as an alternative to get(scheme, true) or setActive()
* updated README.md to reflect changes


### VERSION 1.0.1

* minor cleanup of phaserControls.js


### VERSION 1.0.0

* phaserControls.js
* First attempt at using jsDoc
* Added README.md
* Basic example created (inside docs folder)
* Replaced phaser.js file with phaser.min.js to decrease load times in demo
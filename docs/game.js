import basicScene from "./scenes/basicScene.js";
import phaserControls from "./../dist/phaserControlsPlugin.js";

const config = {
  type: Phaser.AUTO,
  transparent: true,
  width: 800,
  height: 400,
  parent: "gameCanvas",
  dom: {
    createContainer: true
  },
  plugins: {
    scene: [
        { key: 'phaserControls', plugin: phaserControls, mapping: 'controls' }
    ]
  },
  scene: [basicScene],

};

const game = new Phaser.Game(config);

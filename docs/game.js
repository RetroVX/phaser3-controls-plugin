import basicScene from "./scenes/basicScene.js";

const config = {
  type: Phaser.AUTO,
  transparent: true,
  width: 800,
  height: 400,
  parent: "gameCanvas",
  scene: [basicScene],

};

const game = new Phaser.Game(config);

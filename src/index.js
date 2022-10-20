if (document.readyState !== "loading") {
  console.log("Document is ready!");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is ready after waiting!");
    initializeCode();
  });
}
function initializeCode() {
  let game;

  const gameOptions = {
    dudeGravity: 800,
    dudeSpeed: 300,
  };

  window.onload = function () {
    let gameConfig = {
      type: Phaser.AUTO,
      backgroundColor: "#112211",
      scale: {
        mode: Phaser.scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 1000,
      },
      pixelArt: true,
      physics: {
        default: "arcade",
        arcade: {
          gravity: {
            y: 0,
          },
        },
      },
      scene: PlayGame,
    };

    game = new Phaser.Game(gameConfig);
    window.focus();
  };

  class PlayGame extends Phaser.Scene {
    constructor() {
      super("PlayGame");
    }

    preload() {}

    create() {}
  }
}

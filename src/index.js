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
        mode: Phaser.Scale.FIT,
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

    preload() {
      this.load.image("sky", "./assets/sky.png");
      this.load.image("ground", "./assets/platform.png");
      this.load.image("star", "./assets/star.png");
      this.load.spritesheet("dude", "./assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48,
      });
    }

    create() {
      this.groundGroup = this.physics.add.group({
        immovable: true,
        allowGravity: false,
      });

      for (let i = 0; i < 20; i++) {
        this.groundGroup.create(
          Phaser.Math.Between(0, game.config.width),
          Phaser.Math.Between(0, game.config.height),
          "ground"
        );
      }

      this.dude = this.physics.add.sprite(
        game.config.width / 2,
        game.config.height / 2,
        "dude"
      );
      this.dude.body.gravity.y = gameOptions.dudeGravity;
      this.physics.add.collider(this.dude, this.groundGroup);

      this.cursors = this.input.keyboard.createCursorKeys();

      /*      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 4 }],
        frameRate: 10,
      });

      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
      });*/
    }

    update() {
      if (this.cursors.left.isDown) {
        this.dude.body.velocity.x = -gameOptions.dudeSpeed;
        this.dude.anims.play("left", true);
      } else if (this.cursors.right.isDown) {
        this.dude.body.velocity.x = gameOptions.dudeSpeed;
        this.dude.anims.play("right", true);
      } else {
        this.dude.body.velocity.x = 0;
        this.dude.anims.play("turn", true);
      }

      if (this.cursors.up.isDown && this.dude.body.touching.down) {
        this.dude.body.velocity.y = -gameOptions.dudeGravity / 1.6;
      }

      if (this.dude.y > game.config.height || this.dude.y < 0) {
        this.scene.start("PlayGame");
      }
    }
  }
}

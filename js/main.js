//Phaser Game w/1 state

var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
	preload: function(){
		//loads the game assets before the game starts
	  this.load.image('background', 'assets/images/background.png');
	  this.load.image('cat1', 'assets/images/phaser-cat1.png');
	  this.load.image('rightArrow', 'assets/images/right-arrow.png');
	  // this.load.image('cat3', 'assets/images/phaser-cat3.png');



	},
	create: function(){
		//define scale
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		//creates sprites
	  this.background = this.game.add.sprite(0, 0, 'background');
	  this.cat1 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cat1');
	  this.cat1.anchor.setTo(0.5);
	  this.cat1.scale.setTo(-1,1);
	  //right arrow
	  this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'rightArrow');
	  this.rightArrow.scale.setTo(5);
	},
	//executed multiple times per second
	update: function(){
		//rotates the sprite
		// this.cat1.angle += 0.5;

	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');
//Phaser Game w/1 state

var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
	preload: function(){
		//loads the game assets before the game starts
	  this.load.image('background', 'assets/images/background.png');
	  this.load.image('cat1', 'assets/images/phaser-cat1.png');
	  this.load.image('rightArrow', 'assets/images/right-arrow.png');
	  this.load.image('leftArrow', 'assets/images/left-arrow.png');




	},
	create: function(){
		//defines scale
	 this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	 this.scale.pageAlignHorizontally = true;
	 this.scale.pageAlignVertically = true;

	//creates sprites
	  //bg image
	  this.background = this.game.add.sprite(0, 0, 'background');
	  //cat1 sprite
	  this.cat1 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cat1');
	  this.cat1.anchor.setTo(0.5);
	  this.cat1.scale.setTo(-.5,.5);
	  //right arrow
	  this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'rightArrow');
	  // this.rightArrow.scale.setTo(2);
	  this.rightArrow.anchor.setTo(0.5);
	  this.rightArrow.customParams = {direction: 1};
	  //left arrow
	  this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'leftArrow');
	  this.leftArrow.anchor.setTo(0.5);
	  this.leftArrow.customParams = {direction: -1};
	  // this.leftArrow.scale.x.setTo(-1);


	},
	//update function is executed multiple times per second
	update: function(){
		//rotates the sprite
		// this.cat1.angle += 0.5;

	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');
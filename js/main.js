//Phaser Game w/1 state

var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
	preload: function(){
	  this.load.image('background', 'assets/images/background.png');
	  this.load.image('cat1', 'assets/images/phaser-cat1.jpeg');
	  this.load.image('cat2', 'assets/images/phaser-cat2.jpg');
	  this.load.image('cat3', 'assets/images/phaser-cat3.png');



	},
	create: function(){
	  this.background = this.game.add.sprite(0, 0, 'background');	
	},
	update: function(){

	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');
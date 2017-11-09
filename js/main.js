//Phaser Game w/1 state

var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
	preload: function(){
		//loads the game assets before the game starts
	  this.game.load.image('background', 'assets/images/background.png');
	  this.game.load.image('cat1', 'assets/images/phaser-cat1.png');
	  this.game.load.image('llama', 'assets/images/llama.png');
	  this.game.load.image('rightArrow', 'assets/images/right-arrow.png');
	  this.game.load.image('leftArrow', 'assets/images/left-arrow.png');

	},
	create: function(){
		//defines scale
	 this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	 this.scale.pageAlignHorizontally = true;
	 this.scale.pageAlignVertically = true;

	//creates sprites
	  //bg image
	  this.background = this.game.add.sprite(0, 0, 'background');
	  this.background.scale.setTo(.25);

	  //group for sprites 
	  var spriteData = [
	  {key: 'llama', text:'LLAMA'},
	  {key: 'cat1', text: 'CAT'}
	  ];
	  this.sprites = this.game.add.group();
	// forEach loops through sprites in group
	//self var allows access to this inside scope of loop
	  var self = this;
	  var animal;	
	  spriteData.forEach(function(element){
	  	animal = self.sprites.create(-1000, self.game.world.centerY, element.key);
	  	animal.customParams= {text: element.text};
	  	animal.inputEnabled = true;
	  	animal.input.pixelPerfectClick = true;
	  	animal.anchor.setTo(0.5);
	  	animal.events.onInputDown.add(self.animateSprite, self);
	  });

	  this.currentSprite = this.sprites.next();
	  this.currentSprite.position.set(this.game.world.centerX, 300);
	
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

	  //left arrow user input
	  this.leftArrow.inputEnabled = true; 
	  this.leftArrow.input.pixelPerfectClick = true;
	  this.leftArrow.events.onInputDown.add(this.switchSprite, this);

	  //right arrow user input
	  this.rightArrow.inputEnabled = true; 
	  this.rightArrow.input.pixelPerfectClick = true;
	  this.rightArrow.events.onInputDown.add(this.switchSprite, this);


	},
	//update function is executed multiple times per second
	update: function(){
	},
	switchSprite: function(sprite, event) {
		//function runs on arrow click
		var newSprite, endX;
		//1. get the direction of arrow
		if(sprite.customParams.direction > 0) {
			newSprite = this.sprites.next();
			endX = 640 + this.currentSprite.width/2;
		} else {
			newSprite = this.sprites.previous();
			endX = -this.currentSprite.width/2;
		}
		this.currentSprite.x = endX;
		//2. get next sprite
		newSprite.x = this.game.world.centerX;
		this.currentSprite = newSprite; 
		//3. get final destination of current sprite
		//4. move current spriate to final destination 
		//5. set the next sprite as the new current sprite
	},
	animateSprite: function(sprite, event) {
		console.log('animate sprite');
	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');
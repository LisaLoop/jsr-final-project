//Phaser Game w/1 state

var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
	preload: function(){
		//loads the game assets before the game starts
	  this.game.load.image('background', 'assets/images/background.png');
	  this.game.load.image('rightArrow', 'assets/images/right-arrow.png');
	  this.game.load.image('leftArrow', 'assets/images/left-arrow.png');
	   // this.game.load.image('cat', 'assets/images/cat1.png');
	  // this.game.load.image('llama', 'assets/images/llama.png');
	  //loads spritesheet instead of individual image
	  this.load.spritesheet('cat','assets/images/cat1.png', 48, 48, 6);
	  this.load.spritesheet('llama','assets/images/llama.png', 48, 48, 6);
	  this.load.spritesheet('bird','assets/images/bird.png', 32, 32, 6);



	},
	//runs after assets load
	create: function(){
	 //defines scale
	 this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	 this.scale.pageAlignHorizontally = true;
	 this.scale.pageAlignVertically = true;

	//creates sprites
	  this.background = this.game.add.sprite(0, 0, 'background');
	  this.background.scale.setTo(.25);


	 //group for spritesheets 
	  var spriteData = [
	  {key: 'llama', text:'LLAMA'},
	  {key: 'cat', text: 'CAT'},
	  {key: 'bird', text: 'BIRD'}
	  ];
	  this.sprites = this.game.add.group();

	// forEach loops through sprites in group
	//self var allows access to this inside scope of loop
	  var self = this;
	  var animal;	
	  spriteData.forEach(function(element){
	  	//last parameter refers to frame in sprite animation
	  	animal = self.sprites.create(-1000, self.game.world.centerY, element.key, 0);
	  	animal.customParams = {text: element.key};
	  	//anchor point set to the center of sprite
	  	animal.anchor.setTo(0.5, 0.5);
	  	animal.scale.setTo(1.5);
	  	// console.log(animal.customParams);


	  	//create animation
	  	animal.animations.add('animate', [0, 1, 2 ,3 ,4, 5], 3, false);
	  	animal.inputEnabled = true;
	  	animal.input.pixelPerfectClick = true;
	  	animal.events.onInputDown.add(self.animateSprite, self);
	  	// console.log(animal);
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
		if(this.isMoving) {
			return false
		}
		this.isMoving = true;
		//function runs on arrow click
		var newSprite, endX;
		if(sprite.customParams.direction > 0) {
			newSprite = this.sprites.next();
			newSprite.x = -newSprite.width/2;
			endX = 640 + this.currentSprite.width/2;
		} else {
			newSprite = this.sprites.previous();
			newSprite.x = 640 + newSprite.width/2;
			endX = -this.currentSprite.width/2;
		}

		var newSpriteMovement = this.game.add.tween(newSprite);
		newSpriteMovement.to({x: this.game.world.centerX}, 1000);
		newSpriteMovement.onComplete.add(function(){
			this.isMoving = false;
		}, this);
		newSpriteMovement.start();

		var currentSpriteMovement = this.game.add.tween(this.currentSprite);
		currentSpriteMovement.to({x: endX}, 1000);
		currentSpriteMovement.start();

		this.currentSprite.x = endX;
		newSprite.x = this.game.world.centerX;
		this.currentSprite = newSprite; 
	},
	animateSprite: function(sprite, event) {
		// console.log('animate sprite');
		sprite.play('animate');
	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');
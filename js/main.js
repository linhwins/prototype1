window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'bambooscreen', 'assets/living3.jpg' ); //load background 
        //game.load.spritesheet('panda', 'assets/pandasprites11test.png', 120, 122); //load panda sprite
        //game.load.spritesheet('panda', 'assets/dude.png', 32, 48); //load panda sprite
        game.load.spritesheet('panda', 'assets/newcutcat.png', 46, 48);
        game.load.image('coin', 'assets/catfood.png'); //load coin 
        game.load.image('ground','assets/plat1.png');
        game.load.audio('track','assets/track1.mp3');
        game.load.image('base','assets/plat2.png'); //chair
        game.load.image('sofa','assets/platSofa.png'); //sofa
         game.load.image('shelf','assets/shelf.png'); //shelves
        game.load.image('rod','assets/rod.png'); //rod
        game.load.image('frame','assets/frame.png'); //frame
        game.load.image('window','assets/window.png'); //frame
        game.load.spritesheet('mouse', 'assets/mouse.png, 92, 34'); 

    }
    
    //var bouncy;
    var bkgr; //use this var for the background "bkgr"  
    var sprite;
    var player;
    var facing = 'right';
    var jumpTimer = 0;
    var cursors;
    var jumpButton;
    var yAxis = p2.vec2.fromValues(0, 1);
    var coins;
    var platforms;
    var music; 
    var mice = [];
    var miceFacing = [];
    var numberOfMice = 2; 

    
    function create() {
        music = game.sound.play('track'); //added music here
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        
        
        // Create a sprite at the center of the screen using the 'logo' image.
        /////bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        bkgr = game.add.tileSprite(0, 0, 2000, 2000, 'bambooscreen'); 
        //game.add.sprite(0,0,'bambooscreen');
        //game.add.sprite(0,0,'coin');
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        ////bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        ////////game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        ////////////bouncy.body.collideWorldBounds = true;
        
        
        
        //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height -10, 'base');  //70

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    //var ledge = platforms.create(500, 400, 'ground');
    var ledge = platforms.create(63, 450, 'ground'); //chairLeft

    ledge.body.immovable = true;

    //ledge = platforms.create(-150, 250, 'ground');
    ledge = platforms.create(252, 440, 'sofa'); //sofa

    ledge.body.immovable = true;
  
    ledge = platforms.create(690, 450, 'ground'); //chairRight

    ledge.body.immovable = true;
    
    ledge = platforms.create(500, 256, 'shelf'); //lower shelf

    ledge.body.immovable = true;
        
    ledge = platforms.create(464, 220, 'shelf'); //upper shelf

    ledge.body.immovable = true;
        
    ledge = platforms.create(163, 150, 'rod'); //rod

    ledge.body.immovable = true;
        
    ledge = platforms.create(56, 200, 'frame'); //left frame

    ledge.body.immovable = true;
        
    ledge = platforms.create(682, 200, 'frame'); //right frame

    ledge.body.immovable = true;
        
    ledge = platforms.create(177, 330, 'window'); //right frame

    ledge.body.immovable = true;
        //game.physics.startSystem(Phaser.Physics.P2JS);
        //game.physics.startSystem(Phaser.Physics.ARCADE);

        //game.physics.p2.gravity.y = 350;
        //game.physics.p2.world.defaultContactMaterial.friction = 0.3;
        //game.physics.p2.world.setGlobalStiffness(1e5);
        
        
        //Add a sprite
        //player = game.add.sprite(32, game.world.height - 150, 'panda'); 
        player = game.add.sprite(52, game.world.height - 150, 'panda');
        //player = game.add.sprite(47,49,'panda');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true; 
        //player.animations.add('left', [0], 10, true);
        //player.animations.add('right', [2], 100, true);
        //player.animations.add('left', [0,1,2,3], 10, true);
        //player.animations.add('right', [5,6,7,8], 10, true);
        player.animations.add('left', [0], 10, true);
        player.animations.add('right', [1], 10, true);
        
        //  Enable if for physics. This creates a default rectangular body.
        //game.physics.p2.enable(player);
    //
        //player.body.fixedRotation = true;
        //player.body.damping = 0.5;
        //player.body.collideWorldBounds = true;
        //var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', player.body);
        //var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
        //var boxMaterial = game.physics.p2.createMaterial('worldMaterial');
        
        //game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);
        
        //text = game.add.text(200, 100, 'move panda with arrow', { fill: '#190718' });

        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "60px Broadway", fill: "#190718", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Curious Cat", style );
        text.anchor.setTo( 0.5, 0.0 );
        
        
        
        //coin = game.add.sprite(200, game.world.height - 150, 'coin');
        //game.physics.player.enable(coin); 
        //coin.body.collideWorldBounds = true;
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //  Here we create our coins group
        coins = game.add.group();
        coins.enableBody = true;
        
        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 16; i++)
        {
        //  Create a star inside of the 'stars' group
        var coin = coins.create(i * 70, 0, 'coin');

        //  Let gravity do its thing
        coin.body.gravity.y = 70;

        //  This just gives each star a slightly random bounce value
        //coin.body.bounce.y = 0.4 + Math.random() * 0.2;
        }
        

        }
    
    
    function createMice()
{
    for(var i = 0; i < numberOfMice; ++i)
        {
            var randomValue = game.rnd.integerInRange(1024, 2900);
            mice.push(game.add.sprite(randomValue + (i * 64), 32, 'mouse'));
            mice[i].animations.add('left', [0], 10, true);
            mice[i].animations.add('right', [1], 10, true)
            game.physics.enable(mice[i], Phaser.Physics.ARCADE);
            mice[i].body.setSize(75, 65, 5, 16); 
            var randomDirection = game.rnd.integerInRange(0, 1);
            if(randomDirection == 0)
                {
                    miceFacing.push('left');
                }
            else
                {
                    miceFacing.push('right');
                }
            
        }
}
    
    function collectCoin (player, coin) {

        // Removes the star from the screen
        coin.kill();
        }
    
    function update() {
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(coins, platforms);
        game.physics.arcade.overlap(player, coins, collectCoin, null, this);
        //game.physics.arcade.collide(coin, platforms);
        //game.physics.arcade.overlap(player, coin, collectCoin, null, this);
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //////bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 )
        
        
        
        player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 2;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -399;
    }
        
        
        
        
        
    }
    
    /*function checkIfCanJump() {

    var result = false;

    for (var i=0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
    {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === player.body.data || c.bodyB === player.body.data)
        {
            var d = p2.vec2.dot(c.normalA, yAxis);

            if (c.bodyA === player.body.data)
            {
                d *= -1;
            }

            if (d > 0.5)
            {
                result = true;
            }
        }
    }
    
    return result;

}*/
};

class scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }
    create(){
        this.background = this.add.tileSprite(0,0, config.width, config.height, "background");
        this.background.setOrigin(0,0);

        var xAll = config.width;
        var yAll = config.height;


        this.ship = this.add.sprite(xAll/2 -50, yAll/2, "ship");
        this.ship2 = this.add.sprite(xAll/2, yAll/2, "ship2");
        this.ship3 = this.add.sprite(xAll/2 + 50, yAll/2, "ship3");

        this.player = this.physics.add.sprite(config.width/2-8, config.height-64, "player");
        this.player.play("trust");

        this.ship.play("ship_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");

        this.ship.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        this.input.on('gameobjectdown', this.destroyShip, this);


        this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "Yellow"});

        

        this.powerUps = this.physics.add.group();

        var maxObjects = 4;

        for(var i = 0; i <= maxObjects; i++){
            var powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, config.width, config.height);
            if(Math.random()>0.5){
                powerUp.play("red");
            } else{
                powerUp.play("gray");
            }

            powerUp.setVelocity(100, 100);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);

        }
        
    }
    moveShip(ship, speed){
        ship.y += speed;
        if (ship.y>config.height){
            this.resetShipPos(ship);
        }
    }
    resetShipPos(ship){
        ship.y = 0;
        var randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX;
    }

    
    
    update(){
        this.moveShip(this.ship, 1);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 3);
        this.background.tilePositionY -= 0.5;
    }
    destroyShip(pointer, gameObject){
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }
} 
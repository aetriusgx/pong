let BallInstances = [];
class Ball {
    /**@returns {Ball} New instance of Ball @param {number} x The position of the ball on the x-axis @param {number} y The position of the ball on the y-axis @param {number} diameter The diameter of the ball*/
    constructor(x, y, diameter) {
        this.defaultX = x
        this.defaultY = y
        this.x = x
        this.y = y
        this.diameter = diameter
        this.radius = diameter / 2
        this.speed = 1
        this.velocity = [this.speed, this.speed]
        this.exists = false
        BallInstances.push(this);
    }

    //Getters & Setters
    /**@param {number} speed Set the speed of the ball in PPF*/
    set speed(speed) {
        this.speed = Math.abs(speed)
    }
    /**@param {Array} velocity Set the velocity of the ball in PPF*/
    set velocity(velocity) {
        this.velocity = [velocity[0], velocity[1]]
    }

    //Methods
    /**@param {?number} color (Optional) Sets the hue of the ball*/
    spawn(color) {
        if (!this.exists) {
            noStroke()
            fill(color % 360 || colors.alt)
            ellipse(this.x, this.y, this.diameter)
            this.exists = true
            let chance = Math.random()
            if (chance > 0.5) this.velocity[0] = this.speed
            if (chance > 0.25 || chance < 0.75) this.velocity[1] = this.speed
            if (chance <= 0.5) this.velocity[0] = -this.speed
            if (chance <= 0.25 || chance >= 0.75) this.velocity[1] = -this.speed
        }
    }

    despawn() {
        if (this.exists) {
            this.exists = false
            this.x = this.defaultX
            this.y = this.defaultY
            background(colors.background)
        }
    }

    bounce() {
        if (this.exists) {
            if (this.y > canvas.height || this.y < 0) {
                this.velocity[1] = -this.speed
            }
            this.x += this.velocity[0]
            this.y += this.velocity[1]
        }
    }

    //Static Methods
    /**@returns {Ball} Returns all instances of Ball*/
    static GetInstances() {
        BallInstances.forEach(balls => {if (balls instanceof Ball) return balls})
    }

    static spawnEverything() {
        this.GetInstances().spawn()
    }

    static despawnEverything() {
        this.GetInstances().despawn()
    }

    static bounce() {
        this.GetInstances().bounce()
    }
}
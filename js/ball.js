class Ball {
    constructor(x, y, diameter) { //    returns Ball
        this.x = x
        this.y = y
        this.diameter = diameter
        this.radius = diameter / 2
        this.speed = 1
        this.velocity = [this.speed, this.speed]
        this.exists = false
    }

    //Getters & Setters
    get x           ()      {    return this.x                      }
    get y           ()      {    return this.y                      }
    get speed       ()      {    return this.speed                  }
    get velocity    ()      {    return this.velocity               }
    set speed       (speed) {    this.speed = Math.abs(speed)       }
    set velocity    (velo)  {    this.velocity = [velo[0], velo[1]] }

    //Methods
    bounce() {
        if(this.y > canvas.height || this.y < 0){
            this.velocity[1] = -this.speed
        }
        this.x += this.velocity[0];
        this.y += this.velocity[1];
    }

    
}
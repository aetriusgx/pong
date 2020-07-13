let BracketInstances = [];
class Bracket {
    constructor(x) {
        this.defaultY = y
        this.width = canvas.width * 0.025
        this.height = canvas.height * 0.25
        this.x = x
        this.y = canvas.height / 2 - this.height
        this.controlled = true
        this.goal
        this.score = 0
        this.controls = []
        this.index = BracketInstances.push(this) - 1
    }

    //Getters and Setters
    /**@param {number} x The goal of the bracket. Score will go up beyond this*/
    set goal(x) {
        this.goal = x
    }
    /**@param {boolean} controlled Whether it is player controlled*/
    set controlled(controlled) {
        this.controlled = controlled;
    }
    /**@param {Array} KeyCodes The key codes that will control the bracket*/
    set controls(KeyCodes) {
        if (this.controlled) {
            controls[0] = KeyCodes[0]
            controls[1] = KeyCodes[1]
        } else {
            throw new Error('Controls can\'t be set on a bracket that can\'t be controlled')
        }
    }

    //Methods
    resetY() {
        this.y = this.defaultY;
    }
    /**@param {number} color The hue of the bracket. Will overflow past 360 */
    draw(color) {
        noStroke()
        fill(color % 360, 100, 100)
        rect(this.x, this.y, this.width, this.height)
    }

    //Static Methods
    static GetInstances() {
        BracketInstances.forEach(instance => {
            if (instance instanceof Bracket) return instance
        })
    }

    static GetInstanceByGoal(x) {
        BracketInstances.forEach(instance => {
            if(instance instanceof Bracket && instance.goal == x) return instance;
        })
    }

    static Control() {
        let bracket = this.GetInstances()
        if(bracket.controlled){
            if(keyIsDown(bracket.controls[0])) bracket.y--
            if(keyIsDown(bracket.controls[1])) bracket.y++
        } else {
            let CenterOfBracket = (bracket.y + bracket.height) / 2
            if(Ball.GetInstances().y > CenterOfBracket) bracket.y++
            else bracket.y--
        }
    }
}
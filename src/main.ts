class tower {
    constructor(cost: number, dmg: number) { }
    
}

class Controller {
  constructor() {
    document.addEventListener("click", (event) => this.TrackMouse(event));
  }

    private TrackMouse (mouse: MouseEvent) {
    const mouseX = mouse.clientX;
    const mouseY = mouse.clientY;
    const boundingRect = Painter.instance.element.getBoundingClientRect();
    const canvasX = boundingRect.x;
    const canvasY = boundingRect.y;

    const mousePositionX = mouseX - canvasX;
    const mousePositionY = mouseY - canvasY;
    }
}


class sniper extends tower {
    constructor(cost: number, dmg: number) {
        super(cost, dmg)
    }

    private Attack1() {

    }

}

class Enemy {
    private position: { x: number, y: number } = { x: 1, y: 1 };
    private waypoints: { x: number, y: number }[];
    private currentWaypointIndex: number = 0;
    private speed: number;
    private hp: number;

    constructor(hp: number, speed: number, waypoints: { x: number, y: number }[]) {
        this.hp = hp;
        this.speed = speed;
        this.waypoints = waypoints;
        this.position = { ...waypoints[0] };
    }

    public SpawnRandomEnemy() {
        const spawnbut = document.getElementById("enemyspawn") as HTMLButtonElement;
        this.draw
    }

    public Updateposition() {
        const target = this.waypoints[this.currentWaypointIndex];
        const dx = target.x - this.position.x; // distance from target waypoint: x axis
        const dy = target.y - this.position.y; // distance from target waupoint: y axis
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.speed) {
            this.position = { ...target };
            this.currentWaypointIndex++;

            if (this.currentWaypointIndex >= this.waypoints.length) {
                this.despawn();
            }

        } else {
            this.position.x += (dx / distance) * this.speed;
            this.position.y += (dy / distance) * this.speed;
        }
    }

    private despawn() {
        // Remove the enemy from the game
        Game.instance.removeEnemy(this);
    }

    public draw(context: CanvasRenderingContext2D, image: HTMLImageElement) {
        context.drawImage(image, this.position.x, this.position.y, 50, 50);
    }
}


// while (true) {
//     new Painter().drawScene()
// }

class Game {  // full game loop for refreshing frames and display 
    public enemies: Enemy[] = [];
    private static _instance: Game;
    private constructor() { }

    public static get instance(): Game {
        if (!this._instance) {
            this._instance = new Game();
        }
        return this._instance;
    }

    public AddEnemy(enemy: Enemy) {
        this.enemies.push(enemy);
    }

    public removeEnemy(enemy: Enemy) {
        const index = this.enemies.indexOf(enemy);
        if (index > -1) {
            this.enemies.splice(index, 1);
        }
    }

    public update() {
        this.enemies.forEach(enemy => enemy.Updateposition());
    }
}

// waypoints for the enemy path to know when to turn
const waypoints = [
    { x: 0, y: 100 },
    { x: 200, y: 100 },
    { x: 200, y: 300 },
    { x: 500, y: 300 },
    { x: 500, y: 500 },
    { x: 750, y: 500 }
];

class Painter { //print and draw out all the characters sprites and map shapes
    public drawScene() {
        const context = canvas.getContext("2d") as CanvasRenderingContext2D;
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw map
        context.fillStyle = "#ff8000";
        context.fillRect(0, 100, 210, 50);
        context.fillStyle = "black";
        context.fillRect(200, 100, 50, 200);
        context.fillRect(200, 300, 300, 50);
        context.fillRect(500, 300, 50, 200);
        context.fillRect(500, 500, 200, 50);
        context.fillStyle = "#ff8000";
        context.fillRect(700, 500, 50, 50);

        // Draw enemies
        Game.instance.enemies.forEach(enemy => {
            enemy.draw(context, model1);
        });
    }
    
}

//<------------------------Display and characters-------------------------->
const canvas = document.getElementById("map1") as HTMLCanvasElement;
canvas.width = 800;
canvas.height = 600;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
const model1 = document.getElementById("tower1") as HTMLImageElement; // sniper character
const enemiesSpawn = document.getElementById("enemyspawn") as HTMLButtonElement;

//<----------------------------Map one-------------------------------->
// context.fillStyle = "#ff8000"
// context.fillRect(0, 100, 210, 50);
// context.fillStyle = "black";
// context.fillRect(200, 100, 50, 200);
// context.fillRect(200, 300, 300, 50);
// context.fillRect(500, 300, 50, 200);
// context.fillRect(500, 500, 200, 50);
// context.fillStyle = "#ff8000";
// context.fillRect(700, 500, 50, 50);

// console.log("here")
console.log(model1)

const enemy = new Enemy(100, 1, waypoints);
Game.instance.AddEnemy(enemy);

setInterval(() => {
    Game.instance.update();
    new Painter().drawScene();
}, 1000 / 60);
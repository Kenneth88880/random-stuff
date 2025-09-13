"use strict";
class tower {
    constructor(cost, dmg) { }
    PlaceTower(mouse) {
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
    constructor(cost, dmg) {
        super(cost, dmg);
    }
    Attack1() {
    }
}
class Enemy {
    position = { x: 1, y: 1 };
    waypoints;
    currentWaypointIndex = 0;
    speed;
    hp;
    constructor(hp, speed, waypoints) {
        this.hp = hp;
        this.speed = speed;
        this.waypoints = waypoints;
        this.position = { ...waypoints[0] };
    }
    SpawnRandomEnemy() {
        const spawnbut = document.getElementById("enemyspawn");
        this.draw;
    }
    Updateposition() {
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
        }
        else {
            this.position.x += (dx / distance) * this.speed;
            this.position.y += (dy / distance) * this.speed;
        }
    }
    despawn() {
        // Remove the enemy from the game
        Game.instance.removeEnemy(this);
    }
    draw(context, image) {
        context.drawImage(image, this.position.x, this.position.y, 50, 50);
    }
}
class Painter {
    drawScene() {
        const context = canvas.getContext("2d");
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
// while (true) {
//     new Painter().drawScene()
// }
class Game {
    enemies = [];
    static _instance;
    constructor() { }
    static get instance() {
        if (!this._instance) {
            this._instance = new Game();
        }
        return this._instance;
    }
    AddEnemy(enemy) {
        this.enemies.push(enemy);
    }
    removeEnemy(enemy) {
        const index = this.enemies.indexOf(enemy);
        if (index > -1) {
            this.enemies.splice(index, 1);
        }
    }
    update() {
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
//<------------------------Display and characters-------------------------->
const canvas = document.getElementById("map1");
canvas.width = 800;
canvas.height = 600;
const context = canvas.getContext("2d");
const model1 = document.getElementById("tower1"); // sniper character
const enemiesSpawn = document.getElementById("enemyspawn");
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
console.log(model1);
const enemy = new Enemy(100, 1, waypoints);
Game.instance.AddEnemy(enemy);
setInterval(() => {
    Game.instance.update();
    new Painter().drawScene();
}, 1000 / 60);
//# sourceMappingURL=main.js.map
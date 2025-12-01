import { distance, angleTo } from "./utils.js";

export class Enemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;

        // Load enemy templates
        const e = ENEMY_TYPES[type];
        this.speed = e.speed;
        this.hp = e.hp;
        this.maxHp = e.hp;
        this.color = e.color;
        this.shape = e.shape;
        this.canBePoisoned = e.canBePoisoned;

        // Status effects
        this.poisonTime = 0;
        this.poisonDamage = 0;
    }

    update(dt, player) {
        const ang = angleTo(this, player);
        this.x += Math.cos(ang) * this.speed * dt;
        this.y += Math.sin(ang) * this.speed * dt;

        if (this.poisonTime > 0) {
            this.poisonTime -= dt;
            this.hp -= this.poisonDamage * dt;
        }
    }

    draw(ctx) {
        ctx.fillStyle = (this.poisonTime > 0 && this.canBePoisoned)
            ? "green"
            : this.color;

        ctx.beginPath();

        switch (this.shape) {
            case "circle":
                ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
                break;
            case "triangle":
                ctx.moveTo(this.x, this.y - 20);
                ctx.lineTo(this.x + 20, this.y + 20);
                ctx.lineTo(this.x - 20, this.y + 20);
                ctx.closePath();
                break;
            case "square":
                ctx.rect(this.x - 20, this.y - 20, 40, 40);
                break;
            default:
                ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        }

        ctx.fill();
    }
}

export const ENEMY_TYPES = {
    circle:   { speed: 120, hp: 40, color: "red",       shape: "circle",   canBePoisoned: true },
    triangle: { speed: 200, hp: 20, color: "#ff7777",   shape: "triangle", canBePoisoned: true },
    square:   { speed: 70,  hp: 100,color: "#990000",   shape: "square",   canBePoisoned: true },
    octagon:  { speed: 120, hp: 120,color: "green",     shape: "circle",   canBePoisoned: false },
    pentagon: { speed: 180, hp: 60, color: "purple",    shape: "circle",   canBePoisoned: true },
    hexagon:  { speed: 50,  hp: 400,color: "yellow",    shape: "circle",   canBePoisoned: true }
};

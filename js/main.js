import { Enemy, ENEMY_TYPES } from "./enemies.js";
import { WAVES } from "./waves.js";
import { weapons, addWeapon, updateWeapons } from "./weapons.js";
import { getRandomUpgrades } from "./upgrades.js";
import { distance } from "./utils.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.onresize = resize;
resize();

const player = {
    x: innerWidth / 2,
    y: innerHeight / 2,
    speed: 250,
    hp: 100,
    maxHp: 100,
    xp: 0,
    level: 1
};

let keys = {};
window.onkeydown = e => keys[e.key] = true;
window.onkeyup = e => keys[e.key] = false;

let enemies = [];
let projectiles = [];
let wave = 0;
let spawning = false;

function spawnWave() {
    if (wave >= WAVES.length) return;

    const config = WAVES[wave];
    for (let type in config) {
        const count = config[type];
        for (let i = 0; i < count; i++) {
            const side = Math.floor(Math.random() * 4);
            let x, y;

            if (side === 0) { x = 0; y = Math.random() * innerHeight; }
            else if (side === 1) { x = innerWidth; y = Math.random() * innerHeight; }
            else if (side === 2) { x = Math.random() * innerWidth; y = 0; }
            else { x = Math.random() * innerWidth; y = innerHeight; }

            enemies.push(new Enemy(x, y, type));
        }
    }
}

spawnWave();

let last = 0;
function loop(ts) {
    const dt = (ts - last) / 1000;
    last = ts;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    update(dt);
    draw();

    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

function update(dt) {
    // Player movement
    if (keys["w"]) player.y -= player.speed * dt;
    if (keys["s"]) player.y += player.speed * dt;
    if (keys["a"]) player.x -= player.speed * dt;
    if (keys["d"]) player.x += player.speed * dt;

    // Update weapons
    updateWeapons(dt, player, enemies, projectiles);

    // Enemy updates
    for (let e of enemies) e.update(dt, player);

    // Clean up dead enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        if (enemies[i].hp <= 0) {
            player.xp += 10;
            enemies.splice(i, 1);
        }
    }

    // Wave progression
    if (enemies.length === 0) {
        wave++;
        if (wave < WAVES.length) spawnWave();
    }

    // Level up
    const xpNeeded = player.level * 50;
    if (player.xp >= xpNeeded) {
        player.xp -= xpNeeded;
        player.level++;
        console.log("Level up!", getRandomUpgrades(player));
    }
}

function draw() {
    // Player
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(player.x, player.y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Enemies
    for (let e of enemies) e.draw(ctx);

    // UI sidebar
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("HP: " + player.hp + "/" + player.maxHp, 20, 40);
    ctx.fillText("XP: " + player.xp, 20, 70);
    ctx.fillText("Level: " + player.level, 20, 100);
    ctx.fillText("Wave: " + (wave + 1), 20, 130);

    ctx.fillText("Weapons:", 20, 180);
    weapons.forEach((w, i) => {
        ctx.fillText("- " + w.type + " (Lv " + w.level + ")", 20, 210 + i * 30);
    });
}

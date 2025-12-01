export function getRandomUpgrades(player) {
    const ALL_UPGRADES = [
        { name: "Faster Move Speed", apply: p => p.speed += 50 },
        { name: "More Max HP", apply: p => p.maxHp += 20 },
        { name: "Heal 20 HP", apply: p => p.hp = Math.min(p.maxHp, p.hp + 20) },
        { name: "Unlock Rotating Orb", weapon: "orb" },
        { name: "Unlock Home Shot", weapon: "homeshot" },
        { name: "Unlock Buckshot", weapon: "buckshot" },
        { name: "Unlock Rocket Launcher", weapon: "rocket" },
        { name: "Unlock Zap", weapon: "zap" },
        { name: "Unlock Scythe", weapon: "scythe" },
        { name: "Unlock Ring", weapon: "ring" }
    ];

    const picks = [];
    while (picks.length < 3) {
        const pick = ALL_UPGRADES[Math.floor(Math.random() * ALL_UPGRADES.length)];
        if (!picks.includes(pick)) picks.push(pick);
    }
    return picks;
}

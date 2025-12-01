export const weapons = [];

export function addWeapon(player, type) {
    weapons.push({
        type,
        level: 1,
        cooldown: 0
    });
}

export function updateWeapons(dt, player, enemies, projectiles) {
    for (let w of weapons) {
        w.cooldown -= dt;

        switch (w.type) {
            case "orb":
                updateOrb(w, dt, player, enemies);
                break;

            case "homeshot":
                updateHomeShot(w, dt, player, enemies, projectiles);
                break;

            case "buckshot":
                updateBuckshot(w, dt, player, enemies, projectiles);
                break;

            case "rocket":
                updateRocket(w, dt, player, enemies, projectiles);
                break;

            case "zap":
                updateZap(w, dt, player, enemies);
                break;

            case "scythe":
                updateScythe(w, dt, player, enemies, projectiles);
                break;

            case "ring":
                updateRing(w, dt, player, enemies, projectiles);
                break;
        }
    }
}

// Placeholder functions — I can fully implement these afterward
function updateOrb() {}
function updateHomeShot() {}
function updateBuckshot() {}
function updateRocket() {}
function updateZap() {}
function updateScythe() {}
function updateRing() {}

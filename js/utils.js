export function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

export function randRange(min, max) {
    return Math.random() * (max - min) + min;
}

export function angleTo(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x);
}

export function lerp(a, b, t) {
    return a + (b - a) * t;
}

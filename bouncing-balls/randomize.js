
export function randomFromInterval(a,b) {
    return Math.random() * (b - a) + a;
}

export function generateRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

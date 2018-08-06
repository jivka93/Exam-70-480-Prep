// Global

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colorArray) {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}

var colorArray = [
    '#7d0552',
    '#8d7b8d',
    '#4863a0',
    '#2b3856',
    '#342d7e',
    '#E8A317',
    '#CD7F32',
    '#6f4e37'
];

var mouse = {
    x: undefined,
    y: undefined
};
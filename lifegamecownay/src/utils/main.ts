import { parse } from "path";
import draw from "./drawUtils"
import vec from "./vec2"
import { randomInt } from "./random";

// Defina o tamanho do ambiente

const size = 2;
const WIDTH = 240/size;
const HEIGHT = 136/size;

// Agora ambient é uma matriz bidimensional
let ambient: { pos: ReturnType<typeof vec>, alive: number }[][] = [];

const createAmbient = (f?) => {
    const arr = [];
    for (let x = 0; x < WIDTH; x++) {
        const row = [];
        for (let y = 0; y < HEIGHT; y++) {
            row.push({ pos: vec(x * size + x*0.5, y * size + y*0.5), alive: f() | 0 });
        }
        arr.push(row);
    }
    return arr;
};

const addpoint = (x: number, y: number, alive = 0) => {
    if (ambient[x] && ambient[x][y]) {
        ambient[x][y].alive = alive;
    }
};

const drawPoints = (ctx: CanvasRenderingContext2D) => {
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            const point = ambient[x][y];
            if (point.alive == 1) {
                draw.rect(ctx, point.pos, vec(size, size), "#ffffee");
            } else {
                draw.rect(ctx, point.pos, vec(size, size), "#000011");
            }
        }
    }
};

let Game = {
    init: () => {
        ambient = createAmbient(()=> randomInt(0, 1));
        addpoint(1, 1, 1); 
    },
    update: () => {
        // lógica de atualização aqui
    },
    draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        ctx.clearRect(0, 0, 1000, 1000);

        ctx.save()
        let x = canvas.clientWidth/WIDTH
        let y = canvas.clientHeight/HEIGHT
        console.log(x)
        ctx.scale(x,y)
        drawPoints(ctx);
        ctx.restore()
    }
};

export default Game
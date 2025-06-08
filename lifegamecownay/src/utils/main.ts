import { parse } from "path";
import draw from "./drawUtils"
import vec from "./vec2"
import { randomInt } from "./random";

// Defina o tamanho do ambiente

const size = 2;
const WIDTH = 240/size;
const HEIGHT = 136/size;
let t = 0

// Agora ambient é uma matriz bidimensional
let ambient: { pos: ReturnType<typeof vec>, alive: number }[][] = [];

const createAmbient = (f?) => {
    const arr = [];
    for (let x = 0; x < WIDTH; x++) {
        const row = [];
        for (let y = 0; y < HEIGHT; y++) {
            row.push({ pos: vec(x * size + x*0.15, y * size + y*0.15), alive: f() | 0 });
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

const updateAmbiente = () => {
    // Cria uma cópia do estado atual
    const nextAmbient = createAmbient(() => 0);

    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            let aliveNeighbors = 0;
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    const nx = x + dx;
                    const ny = y + dy;
                    if (
                        nx >= 0 && nx < WIDTH &&
                        ny >= 0 && ny < HEIGHT &&
                        ambient[nx][ny].alive
                    ) {
                        aliveNeighbors++;
                    }
                }
            }
            if (ambient[x][y].alive) {
                nextAmbient[x][y].alive = (aliveNeighbors === 3 || aliveNeighbors === 2) ? 1 : 0;
            } else {
                nextAmbient[x][y].alive = (aliveNeighbors === 3) ? 1 : 0;
            }
        }
    }
    ambient = nextAmbient;
}

let Game = {
    init: () => {
        ambient = createAmbient(()=> randomInt(0, 1));
        addpoint(1, 1, 1); 
    },
    update: () => {
        if (t%5 == 0) updateAmbiente();
        t=t+1
    },
    draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.save()
        let scx = canvas.width/(WIDTH*size)
        let scy = canvas.height/(HEIGHT*size)
        ctx.scale(scx, scy)
        drawPoints(ctx);
        ctx.restore()
    }
};

export default Game
import { parse } from "path";
import draw from "./drawUtils"
import vec from "./vec2"
import { randomInt } from "./random";
import { CanvasHTMLAttributes } from "react";

// Defina o tamanho do ambiente

const size = 16;
let WIDTH:number = 240/size;
let HEIGHT:number = 136/size;

let t: number = 0

let pause:boolean = false
let State: string = "menuView"

let mouse = {
    x: 0,
    y: 0,
    click: false
}

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

const addANewPointInAmbient = (x: number, y: number) => {
    addpoint(x, y, 1);
}

let Game = {
    init: (state? : string, canvas?: HTMLCanvasElement) => { 
        State = state
        WIDTH = window.innerWidth/size;
        HEIGHT = window.innerWidth/size;
        if (State === "draw"){
            ambient = createAmbient(()=>0);
            pause = true
        }else{
            ambient = createAmbient(()=> randomInt(0, 1));
        }

        if (State === "draw"){
            canvas.addEventListener('mousemove', (event) => {
                const rect = canvas.getBoundingClientRect();
                mouse.x = event.clientX - rect.left;
                mouse.y = event.clientY - rect.top;
                // console.log('Mouse:', mouse.x, mouse.y);
            });

            canvas.addEventListener('mousedown', (event) => {
                const rect = canvas.getBoundingClientRect();
                mouse.x = event.clientX - rect.left;
                mouse.y = event.clientY - rect.top;
                mouse.click = true;
                
                const cellX = Math.floor(mouse.x / size);
                const cellY = Math.floor(mouse.y / size);
                addANewPointInAmbient(cellX, cellY);
            });

            canvas.addEventListener('mouseup', () => {
                mouse.click = false;
            });

            window.addEventListener("keydown", (e) =>{
                console.log(e.key)
                if (e.key === "e") {
                    pause = !pause
                }
            })
        }
        
        addpoint(1, 1, 1); 
    },
    update: () => {
        if (t%5 == 1) {updateAmbiente()};
       
        if (pause === false){t+=1} 
    },
    draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.save()
        ctx.scale(1, 1)
        drawPoints(ctx);
        ctx.restore()
    }
};

export default Game
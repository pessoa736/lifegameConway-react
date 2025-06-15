import { parse } from "path";
import draw from "./drawUtils";
import vec from "./vec2";
import { randomInt } from "./random";
import { CanvasHTMLAttributes } from "react";

// Declaração global organizada
declare global {
    interface Window {
        Game: GameType;
    }
}

// Tipagem para o objeto Game
type GameType = {
    pause: boolean;
    size: number;
    WIDTH: number;
    HEIGHT: number;
    drawMode: "draw" | "erase";
    t: number;
    State: string;
    mouse: {
        x: number;
        y: number;
        click: boolean;
    };
    ambient: { pos: ReturnType<typeof vec>, alive: number }[][];
    createAmbient: (f?: () => number) => typeof this.ambient;
    addpoint: (x: number, y: number, alive?: number) => void;
    drawPoints: (ctx: CanvasRenderingContext2D) => void;
    updateAmbiente: () => void;
    limparAmbient: () => void;
    apagar_pixel?: (x: number, y: number) => void;
    addANewPointInAmbient: (x: number, y: number) => void;
    init: (state?: string, canvas?: HTMLCanvasElement) => void;
    set_pause: (val: boolean) => void;
    update: () => void;
    draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
    performAction: (x: number, y: number) => void;
    handlePointerDown: (x: number, y: number) => void;
    handlePointerMove: (x: number, y: number) => void;
    handlePointerUp: () => void;
};

if (typeof window !== "undefined") {
    // Variáveis do Game organizadas
    window.Game = {
        pause: false,
        size: 16,
        WIDTH: Math.floor(240 / 16),
        HEIGHT: Math.floor(136 / 16),
        drawMode: "draw",
        t: 0,
        State: "menuView",
        mouse: {
            x: 0,
            y: 0,
            click: false
        },
        ambient: [] as { pos: ReturnType<typeof vec>, alive: number }[][],

        createAmbient(f?) {
            const arr = [];
            for (let x = 0; x < this.WIDTH; x++) {
                const row = [];
                for (let y = 0; y < this.HEIGHT; y++) {
                    row.push({ pos: vec(x * this.size + x * 0.15, y * this.size + y * 0.15), alive: f ? f() : 0 });
                }
                arr.push(row);
            }
            return arr;
        },

        addpoint(x: number, y: number, alive = 0) {
            if (this.ambient[x] && this.ambient[x][y]) {
                this.ambient[x][y].alive = alive;
            }
        },

        drawPoints(ctx: CanvasRenderingContext2D) {
            for (let x = 0; x < this.WIDTH; x++) {
                for (let y = 0; y < this.HEIGHT; y++) {
                    const point = this.ambient[x][y];
                    if (point.alive == 1) {
                        draw.rect(ctx, point.pos, vec(this.size, this.size), "#ffffee");
                    } else {
                        draw.rect(ctx, point.pos, vec(this.size, this.size), "#000011");
                    }
                }
            }
        },

        updateAmbiente() {
            const nextAmbient = this.createAmbient(() => 0);

            for (let x = 0; x < this.WIDTH; x++) {
                for (let y = 0; y < this.HEIGHT; y++) {
                    let aliveNeighbors = 0;
                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            if (dx === 0 && dy === 0) continue;
                            const nx = x + dx;
                            const ny = y + dy;
                            if (
                                nx >= 0 && nx < this.WIDTH &&
                                ny >= 0 && ny < this.HEIGHT &&
                                this.ambient[nx][ny].alive
                            ) {
                                aliveNeighbors++;
                            }
                        }
                    }
                    if (this.ambient[x][y].alive) {
                        nextAmbient[x][y].alive = (aliveNeighbors === 3 || aliveNeighbors === 2) ? 1 : 0;
                    } else {
                        nextAmbient[x][y].alive = (aliveNeighbors === 3) ? 1 : 0;
                    }
                }
            }
            this.ambient = nextAmbient;
        },

        limparAmbient() {
            this.ambient = this.createAmbient();
        },

        apagar_pixel(x: number, y: number) {
            this.addpoint(x, y, 0);
        },

        addANewPointInAmbient(x: number, y: number) {
            this.addpoint(x, y, 1);
        },

        init(state?: string, canvas?: HTMLCanvasElement) {
            this.State = state || this.State;
            this.WIDTH = Math.floor(window.innerWidth / this.size);
            this.HEIGHT = Math.floor(window.innerHeight / this.size);
            if (this.State === "draw") {
                this.ambient = this.createAmbient(() => 0);
                this.pause = true;
            } else {
                this.ambient = this.createAmbient(() => randomInt(0, 1));
            }

            if (this.State === "draw" && canvas) {
                canvas.addEventListener('mousedown', (event) => {
                    const rect = canvas.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    this.handlePointerDown(x, y);
                });
                canvas.addEventListener('mousemove', (event) => {
                    const rect = canvas.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    this.handlePointerMove(x, y);
                });
                canvas.addEventListener('mouseup', () => {
                    this.handlePointerUp();
                });
                canvas.addEventListener('touchstart', (event) => {
                    const touch = event.touches[0];
                    const rect = canvas.getBoundingClientRect();
                    const x = touch.clientX - rect.left;
                    const y = touch.clientY - rect.top;
                    this.handlePointerDown(x, y);
                    event.preventDefault();
                });
                canvas.addEventListener('touchmove', (event) => {
                    const touch = event.touches[0];
                    const rect = canvas.getBoundingClientRect();
                    const x = touch.clientX - rect.left;
                    const y = touch.clientY - rect.top;
                    this.handlePointerMove(x, y);
                    event.preventDefault();
                });
                canvas.addEventListener('touchend', (event) => {
                    this.handlePointerUp();
                    event.preventDefault();
                });
            }
        },

        set_pause(val: boolean) {
            this.pause = val;
        },

        update() {
            if (this.t % 5 == 1) {
                this.updateAmbiente();
            }
            if (this.pause === false) {
                this.t += 1;
            }
        },

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
            ctx.clearRect(0, 0, 1000, 1000);
            ctx.save();
            ctx.scale(1, 1);
            this.drawPoints(ctx);
            ctx.restore();
        },

        performAction(x: number, y: number) {
            const cellX = Math.floor(x / this.size);
            const cellY = Math.floor(y / this.size);
            if (cellX >= 0 && cellX < this.WIDTH && cellY >= 0 && cellY < this.HEIGHT) {
                if (this.drawMode === "draw") {
                    this.addANewPointInAmbient(cellX, cellY);
                } else if (this.drawMode === "erase") {
                    this.addpoint(cellX, cellY, 0);
                }
            }
        },

        handlePointerDown(x: number, y: number) {
            this.mouse.x = x;
            this.mouse.y = y;
            this.mouse.click = true;
            this.performAction(x, y);
        },

        handlePointerMove(x: number, y: number) {
            this.mouse.x = x;
            this.mouse.y = y;
            if (this.mouse.click) {
                this.performAction(x, y);
            }
        },

        handlePointerUp() {
            this.mouse.click = false;
        }
    };
}
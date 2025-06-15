import { parse } from "path";
import draw from "./drawUtils"
import vec from "./vec2"
import { randomInt } from "./random";
import { CanvasHTMLAttributes } from "react";

declare global {
    var Game: any & {pause: boolean}
}

if (typeof window !== "undefined") {
    window.Game = {
        pause: false,
        size: 16,
        WIDTH: 240/16,
        HEIGHT: 136/16,
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
                    row.push({ pos: vec(x * this.size + x*0.15, y * this.size + y*0.15), alive: f ? f() : 0 });
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

        limparAmbient(){
            this.ambient = this.createAmbient()
        },

        paga_pixel(x: number, y: number){
            this.addANewPoint(x, y,0)
        },

        addANewPointInAmbient(x: number, y: number) {
            this.addpoint(x, y, 1);
        },

       init(state?: string, canvas?: HTMLCanvasElement) {
            this.State = state || this.State;
            this.WIDTH = window.innerWidth / this.size;
            this.HEIGHT = window.innerHeight / this.size;
            if (this.State === "draw") {
                this.ambient = this.createAmbient(() => 0);
                this.pause = true;
            } else {
                this.ambient = this.createAmbient(() => randomInt(0, 1));
            }

            if (this.State === "draw" && canvas) {
                canvas.addEventListener('mousemove', (event) => {
                    const rect = canvas.getBoundingClientRect();
                    this.mouse.x = event.clientX - rect.left;
                    this.mouse.y = event.clientY - rect.top;
                    if (this.mouse.click) {
                        const cellX = Math.floor(this.mouse.x / this.size);
                        const cellY = Math.floor(this.mouse.y / this.size);
                        this.addANewPointInAmbient(cellX, cellY);
                    }
                });

                canvas.addEventListener('mousedown', (event) => {
                    const rect = canvas.getBoundingClientRect();
                    this.mouse.x = event.clientX - rect.left;
                    this.mouse.y = event.clientY - rect.top;
                    this.mouse.click = true;

                    const cellX = Math.floor(this.mouse.x / this.size);
                    const cellY = Math.floor(this.mouse.y / this.size);
                    this.addANewPointInAmbient(cellX, cellY);
                });

                canvas.addEventListener('mouseup', () => {
                    this.mouse.click = false;
                });
            }
        },

        set_pause(val: boolean){
            this.pause = val
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
        }
    };
}
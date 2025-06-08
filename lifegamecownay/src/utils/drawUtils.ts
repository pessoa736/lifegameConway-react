import vec from "./vec2"


const draw = {
    rect: (ctx: CanvasRenderingContext2D, pos = vec(0,0), size = vec(0,0), color) => {
        ctx.save()
        ctx.fillStyle=color
        ctx.fillRect(pos.values[0], pos.values[1], size.values[0], size.values[1])
        ctx.restore()
    }
}

export default draw
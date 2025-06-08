"use client"
import Game  from "lgc/utils/main";
import { useEffect, useRef } from "react";


const GameCanvas = ({state}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    Game.init(state, canvas)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext("2d");
    if (!ctx) return;


    let animationId: number;

    const draw = () => {    
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      Game.update()
      Game.draw(ctx, canvas)
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };

  }, []);

  return <canvas ref={canvasRef} style={{width: "100%"}}/>;
};

export default GameCanvas;
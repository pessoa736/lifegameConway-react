"use client"
import { useEffect, useRef } from "react";
import "../utils/main"

const GameCanvas = ({state}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    window.Game.init(state, canvas)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const draw = () => {    
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      window.Game.update()
      window.Game.draw(ctx, canvas)
      animationId = requestAnimationFrame(draw);
    };


    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };

  }, [state]);

  return <canvas ref={canvasRef} style={{width: "100%"}}/>;
};

export default GameCanvas;
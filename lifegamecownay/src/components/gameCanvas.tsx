"use client"
import Game  from "lgc/utils/main";
import { useEffect, useRef } from "react";


const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  Game.init()
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.outerWidth
    canvas.height = window.outerHeight

    const ctx = canvas.getContext("2d");
    if (!ctx) return;


    let animationId: number;

    const draw = () => {
      Game.update()
      Game.draw(ctx, canvas);
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };

  }, []);

  return <canvas ref={canvasRef} />;
};

export default GameCanvas;
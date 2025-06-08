"use client"
import Game  from "lgc/utils/main";
import { useEffect, useRef } from "react";


const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  Game.init()
  
  useEffect(() => {
    Game.update()
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.outerWidth
    canvas.height = window.outerHeight

    const ctx = canvas.getContext("2d");
    if (!ctx) return;


    let animationId: number;

    const draw = () => {
      Game.draw(ctx, canvas);
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };

  }, []);

  return <canvas ref={canvasRef} style={{
    width: "100%",
    height: "100%"
  }} />;
};

export default GameCanvas;
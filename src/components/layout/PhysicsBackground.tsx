"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { getCustomFlowerTexture } from "./FlowerTexture"; // Import your new SVG generator

export default function PhysicsBackground() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const engine = Matter.Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false, 
        background: "transparent",
      },
    });

    const floor = Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 25, window.innerWidth, 50, { isStatic: true });
    const leftWall = Matter.Bodies.rectangle(-25, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(window.innerWidth + 25, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true });

    // Define palettes for your intricate flowers (Shadow, Main, CenterDark, CenterLight)
    // You can add or change any hex codes here to instantly change the falling flowers
    const colorPalettes = [
      { shadow: "#c0392b", main: "#e74c3c", centerD: "#c0392b", centerL: "#e67e22" }, // Red/Orange
      { shadow: "#b45309", main: "#f59e0b", centerD: "#9a3412", centerL: "#fcd34d" }, // Amber/Gold
      { shadow: "#c2410c", main: "#ea580c", centerD: "#9a3412", centerL: "#fb923c" }, // Deep Orange
      { shadow: "#b91c1c", main: "#ef4444", centerD: "#7f1d1d", centerL: "#fca5a5" }, // Bright Red
    ];

    const shapes = [];
    
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * window.innerWidth;
      const y = (Math.random() * -800) - 100; 
      
      const radius = Math.random() * 50 + 40; 
      
      // Pick a random color palette from our list above
      const colors = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      
      // Calculate scale. (Our SVG is artificially sized to 100x100 in the generator)
      const scale = (radius * 2.2) / 100; 

      shapes.push(
        Matter.Bodies.circle(x, y, radius, {
          restitution: 0.6, 
          friction: 0.5,
          render: {
            sprite: {
              // Call the imported generator function with the chosen colors
              texture: getCustomFlowerTexture(colors.shadow, colors.main, colors.centerD, colors.centerL),
              xScale: scale,
              yScale: scale,
            },
          },
        })
      );
    }

    Matter.World.add(world, [floor, leftWall, rightWall, ...shapes]);

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Matter.World.add(world, mouseConstraint);
    render.mouse = mouse; 

    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      Matter.Body.setPosition(floor, { x: window.innerWidth / 2, y: window.innerHeight + 25 });
      Matter.Body.setPosition(rightWall, { x: window.innerWidth + 25, y: window.innerHeight / 2 });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      if (render.canvas) render.canvas.remove();
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div 
      ref={sceneRef} 
      className="absolute inset-0 pointer-events-auto overflow-hidden"
      style={{ zIndex: 1 }}
    />
  );
}
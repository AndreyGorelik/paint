import "./canvas.css";
import React from "react";
import { useRef, useEffect, useState } from "react";
import drawBrush from "../tools/drawBrush";
import drawRect from "../tools/drawRect";
import drawLine from "../tools/drawLine";
import drawCircle from "../tools/drawCircle";
import drawTriangle from "../tools/drawTriangle";
import Toolbar from "../toolbar/Toolbar";

const Canvas = () => {
  const [tool, setTool] = useState<string>("brush");
  const [color, setColor] = useState<string>("#000000");
  const [width, setWidth] = useState<number>(5);
  const [drawingMode, setDrawingMode] = useState<boolean>(false);

  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const historyRef = useRef<ImageData[]>([]);

  const prevMouseX = useRef<number>(0);
  const prevMouseY = useRef<number>(0);
  const snapshot = useRef<ImageData | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    if (context) {
      context.lineCap = "round";
      context.strokeStyle = color;
      context.lineWidth = width;
      context.lineJoin = "round";
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      contextRef.current = context;
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.lineWidth = width;
        context.strokeStyle = color;
      }
    }
  }, [width, color]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (contextRef.current && canvasRef.current) {
      setDrawingMode(true);
      contextRef.current.beginPath();
      prevMouseX.current = offsetX;
      prevMouseY.current = offsetY;
      snapshot.current = contextRef.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  };

  const stopDrawing = () => {
    if (!contextRef.current || !canvasRef.current) {
      return;
    }
    if (snapshot.current) {
      historyRef.current.push(snapshot.current);
    }
    setDrawingMode(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingMode || !contextRef.current) {
      return;
    }
    if (snapshot.current) {
      contextRef.current.putImageData(snapshot.current, 0, 0);
    }
    switch (tool) {
      case "brush":
        drawBrush(e, contextRef);
        return;
      case "rectangle":
        drawRect(e, contextRef, prevMouseX, prevMouseY);
        return;
      case "circle":
        drawCircle(e, contextRef, prevMouseX, prevMouseY);
        return;
      case "line":
        drawLine(e, contextRef, prevMouseX, prevMouseY);
        return;
      case "triangle":
        drawTriangle(e, contextRef, prevMouseX, prevMouseY);
        return;
    }
  };

  return (
    <>
      <Toolbar
        canvasRef={canvasRef}
        contextRef={contextRef}
        historyRef={historyRef}
        setTool={setTool}
        tool={tool}
        color={color}
        setColor={setColor}
        width={width}
        setWidth={setWidth}
      />
      <div className="canvas">
        <canvas
          className="draw-canvas"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
      </div>
    </>
  );
};

export default Canvas;

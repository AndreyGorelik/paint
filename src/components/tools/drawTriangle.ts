import { eventCanvas, ctxRef } from "../../types";
import { PrevMouse } from "../../interfaces";

const drawTriangle = (e: eventCanvas, contextRef: ctxRef, prevMouseX: PrevMouse, prevMouseY: PrevMouse) => {
    if (contextRef.current) {
        const { offsetX, offsetY } = e.nativeEvent;
        
        contextRef.current.beginPath();
        contextRef.current.moveTo(prevMouseX.current, prevMouseY.current);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.lineTo(prevMouseX.current * 2 - offsetX, offsetY);
        contextRef.current.closePath();
        contextRef.current.stroke()
      }
}

export default drawTriangle;
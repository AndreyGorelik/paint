import { eventCanvas, ctxRef } from "../../types";
import { PrevMouse } from "../../interfaces";

const drawRect = (e: eventCanvas, contextRef: ctxRef, prevMouseX: PrevMouse, prevMouseY: PrevMouse) => {
    if (contextRef.current) {
      const { offsetX, offsetY } = e.nativeEvent;
      contextRef.current.strokeRect(
        offsetX,
        offsetY,
        prevMouseX.current - offsetX,
        prevMouseY.current - offsetY
      );
    }
  };

export default drawRect;
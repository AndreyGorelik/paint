import { eventCanvas, ctxRef } from "../../types";
import { PrevMouse } from "../../interfaces";

const drawCircle = (e: eventCanvas, contextRef: ctxRef, prevMouseX: PrevMouse, prevMouseY: PrevMouse) => {
    if (contextRef.current) {
        const { offsetX, offsetY } = e.nativeEvent;
        contextRef.current.beginPath();
        let radius = Math.sqrt(
            Math.pow(prevMouseX.current - offsetX, 2) +
            Math.pow(prevMouseY.current - offsetY, 2)
        );
        contextRef.current.arc(
            prevMouseX.current,
            prevMouseY.current,
            radius,
            0,
            2 * Math.PI
        );
        contextRef.current.stroke();
    }
};

export default drawCircle;
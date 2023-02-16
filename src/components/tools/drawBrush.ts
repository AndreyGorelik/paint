import { eventCanvas, ctxRef } from "../../types";

const drawBrush = (e: eventCanvas, contextRef: ctxRef) => {
    if (contextRef.current) {
        const { offsetX, offsetY } = e.nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }
};

export default drawBrush;
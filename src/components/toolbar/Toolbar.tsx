import React from "react";
import { BsBrush } from "react-icons/bs";
import { BiRectangle, BiUndo, BiSave, BiFileBlank } from "react-icons/bi";
import { BsCircle, BsTriangle, BsPaintBucket } from "react-icons/bs";
import { AiOutlineLine } from "react-icons/ai";
import { savePictureToDB } from "./toolbarSlice";
import { iconSize, toolsButtonId, constans } from "../../constans/constans";
import { ToolbarProps } from "../../interfaces";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {useEffect} from "react"
import useNotify from "../../hooks/notify.hook";
import useAuth from "../../hooks/auth.hook";
import "./toolbar.css";

const ToolbarAlt = (props: ToolbarProps) => {
  const {canvasRef,color,contextRef,historyRef,setColor,setTool,setWidth,tool,width} = props;
  const {saved, error} = useAppSelector(state => state.toolbarSlice)

  const dispatch = useAppDispatch();
  const { userId } = useAuth();
  const {notifyError, notifySuccess} = useNotify()

  useEffect(()=>{
    if (saved) {
      notifySuccess(constans.saved)
    }
    if (error) {
      notifySuccess(constans.wentWrong)
    }
  }, [saved, error])

  const changeTool = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTool(e.currentTarget.id);
  };

  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const changeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(+e.target.value);
  };

  const clearCanvas = () => {
    const canvas = props.canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas) {
      context.clearRect(0, 0, 2000, 2000);
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const undoAction = () => {
    if (historyRef.current.length && contextRef.current) {
      contextRef.current.putImageData(
        historyRef.current.pop()!,
        0,
        0
      );
    }
    return;
  };

  const fillCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas) {
      context.fillStyle = props.color;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const save = () => {
    if (userId && canvasRef.current) {
      const img = canvasRef.current.toDataURL();
      dispatch(savePictureToDB({ img, userId }));
    }
  };

  return (
    <>
      <div className="toolbar">
        <button
          id={toolsButtonId.brush}
          className={tool === toolsButtonId.brush ? "active" : ""}
          onClick={changeTool}
        >
          <BsBrush size={iconSize.iconSize} />
        </button>
        <button
          id={toolsButtonId.line}
          className={tool === toolsButtonId.line ? "active" : ""}
          onClick={changeTool}
        >
          <AiOutlineLine size={iconSize.iconSize} />
        </button>
        <button
          id={toolsButtonId.rectangle}
          className={tool === toolsButtonId.rectangle ? "active" : ""}
          onClick={changeTool}
        >
          <BiRectangle size={iconSize.iconSize} />
        </button>
        <button
          id={toolsButtonId.circle}
          className={tool === toolsButtonId.circle ? "active" : ""}
          onClick={changeTool}
        >
          <BsCircle size={iconSize.iconSize} />
        </button>
        <button
          id={toolsButtonId.triangle}
          className={tool === toolsButtonId.triangle ? "active" : ""}
          onClick={changeTool}
        >
          <BsTriangle size={iconSize.iconSize} />
        </button>
        <button onClick={fillCanvas}>
          <BsPaintBucket size={iconSize.iconSize} />
        </button>
        <input type="color" value={color} onChange={changeColor} />
        <div className="brush-preview">
          <div
            className="brush"
            style={{
              backgroundColor: color,
              width: `${width}px`,
              height: `${width}px`,
            }}
          ></div>
        </div>
        <input
          type="range"
          min={1}
          max={20}
          value={width}
          onChange={changeWidth}
        />
        <button id={"undo"} onClick={undoAction}>
          <BiUndo size={iconSize.iconSize} />
        </button>
        <button id={"clear"} onClick={clearCanvas}>
          <BiFileBlank size={iconSize.iconSize} />
        </button>
        <button onClick={save}>
          <BiSave size={iconSize.iconSize} />
        </button>
      </div>
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default ToolbarAlt;

export interface PrevMouse {
    current: number
}

export interface Auth {
    email: null | string;
    id: null | string;
    loadingStatus: boolean;
    error: null | string;
}

export interface PublicPicture {
    pictures: Pictures;
    loadingStatus: boolean;
    error: null | string;
}

export interface Pictures {
    [key: string]: PicInfo[]
}

export interface Img {
    [key: string]: {
        createdAt: number,
        id: string,
        img: string
    }
}

export interface UserInfo {
    email: string,
    img: Img
}

export interface User {
    [key: string]: UserInfo
}

export interface PicInfo {
    createdAt: number,
    id: string,
    img: string
}

export interface CanvasRef {
    current: HTMLCanvasElement | null;
}

export interface ContextRef {
    current: CanvasRenderingContext2D | null;
}

export interface HistoryRef {
    current: ImageData[];
}

export interface ToolbarProps {
    canvasRef: CanvasRef;
    color: string;
    contextRef: ContextRef;
    historyRef: HistoryRef;
    tool: string;
    width: number;
    setColor: (arg: string) => void;
    setWidth: (arg: number) => void;
    setTool: (arg: string) => void;
}

import React from "react";

import Toolbox from "./toolbox";

interface ToolbarItem {
  name: string;
  image: string;
}

interface ContentProps {
  items: ToolbarItem[];
  activeItem: string;
  handleClick: (event: React.MouseEvent<HTMLDivElement>, name: string) => void;
  color: string;
}

interface ContentState {
  isDrawing: boolean;
  offsetX: number;
  offsetY: number;
  startX: number;
  startY: number;
}

export default class Content extends React.Component<ContentProps, ContentState> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private canvasOverlayRef: React.RefObject<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;
  private ctxOverlay: CanvasRenderingContext2D | null = null;

  constructor(props: ContentProps) {
    super(props);
    this.state = {
      isDrawing: false,
      offsetX: 0,
      offsetY: 0,
      startX: 0,
      startY: 0
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.canvasRef = React.createRef();
    this.canvasOverlayRef = React.createRef();
  }

  componentDidMount() {
    let canvasRef = this.canvasRef.current;
    let canvasOverlayRef = this.canvasOverlayRef.current;

    if (!canvasRef || !canvasOverlayRef) return;

    this.ctx = canvasRef.getContext("2d");
    this.ctxOverlay = canvasOverlayRef.getContext("2d");
  }

  getCanvasCoordinates(e: React.MouseEvent<HTMLCanvasElement>) {
    // Use nativeEvent.offsetX/offsetY for more accurate coordinates
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    return { x, y };
  }

  handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    e.preventDefault(); // Prevent any default browser behavior

    let ctx = this.ctx;
    let ctxOverlay = this.ctxOverlay;
    let activeItem = this.props.activeItem;

    if (!ctx || !ctxOverlay) return;

    const { x, y } = this.getCanvasCoordinates(e);

    this.setState({ isDrawing: true });
    ctx.beginPath();
    ctx.strokeStyle = this.props.color;
    ctx.lineWidth = 1;
    ctx.lineJoin = ctx.lineCap = "round";

    if (activeItem === "Pencil" || activeItem === "Brush") {
      ctx.moveTo(x, y);
      if (activeItem === "Brush") ctx.lineWidth = 5;
    } else if (activeItem === "Line" || activeItem === "Rectangle") {
      ctxOverlay.strokeStyle = this.props.color;
      ctxOverlay.lineWidth = 1;
      ctxOverlay.lineJoin = ctxOverlay.lineCap = "round";
      this.setState({
        startX: x,
        startY: y
      });
    }
  }

  handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    e.preventDefault();

    let ctx = this.ctx;
    let ctxOverlay = this.ctxOverlay;

    if (!ctx || !ctxOverlay) return;

    const { x, y } = this.getCanvasCoordinates(e);

    if (this.state.isDrawing) {
      if (
        this.props.activeItem === "Pencil" ||
        this.props.activeItem === "Brush"
      ) {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      if (this.props.activeItem === "Line") {
        ctxOverlay.clearRect(0, 0, 600, 480);
        ctxOverlay.beginPath();
        ctxOverlay.moveTo(this.state.startX, this.state.startY);
        ctxOverlay.lineTo(x, y);
        ctxOverlay.stroke();
        ctxOverlay.closePath();
      }
      if (this.props.activeItem === "Rectangle") {
        ctxOverlay.clearRect(0, 0, 600, 480);
        let width = x - this.state.startX;
        let height = y - this.state.startY;
        ctxOverlay.strokeRect(
          this.state.startX,
          this.state.startY,
          width,
          height
        );
      }
    }
  }

  handleMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    e.preventDefault();

    let ctx = this.ctx;
    let ctxOverlay = this.ctxOverlay;

    if (!ctx || !ctxOverlay) return;

    const { x, y } = this.getCanvasCoordinates(e);

    if (this.props.activeItem === "Line") {
      ctxOverlay.clearRect(0, 0, 600, 480);
      ctx.moveTo(this.state.startX, this.state.startY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    if (this.props.activeItem === "Rectangle") {
      let width = x - this.state.startX;
      let height = y - this.state.startY;
      ctxOverlay.clearRect(0, 0, 600, 480);
      ctx.strokeRect(this.state.startX, this.state.startY, width, height);
    }

    ctx.closePath();
    this.setState({ isDrawing: false });
  }

  handleMouseLeave() {
    // Clean up drawing state when mouse leaves canvas
    if (this.state.isDrawing) {
      let ctx = this.ctx;
      let ctxOverlay = this.ctxOverlay;

      if (ctx) ctx.closePath();
      if (ctxOverlay) ctxOverlay.clearRect(0, 0, 600, 480);

      this.setState({ isDrawing: false });
    }
  }

  render() {
    return (
      <div className="content">
        <Toolbox
          items={this.props.items}
          activeItem={this.props.activeItem}
          handleClick={this.props.handleClick}
        />
        <div className="canvas">
          <canvas
            className="canvas-actual"
            width={600}
            height={480}
            ref={this.canvasRef}
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
            onMouseLeave={this.handleMouseLeave}
          />
          <canvas
            className="canvas-overlay"
            width={600}
            height={480}
            ref={this.canvasOverlayRef}
          />
        </div>
      </div>
    );
  }
} 
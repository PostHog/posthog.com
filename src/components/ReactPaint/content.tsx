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
    } else if (activeItem === "Line" || activeItem === "Rectangle" || activeItem === "Circle") {
      ctxOverlay.strokeStyle = this.props.color;
      ctxOverlay.lineWidth = 1;
      ctxOverlay.lineJoin = ctxOverlay.lineCap = "round";
      this.setState({
        startX: x,
        startY: y
      });
    } else if (activeItem === "Fill") {
      // Fill bucket tool - fill the entire canvas with the selected color
      ctx.fillStyle = this.props.color;
      ctx.fillRect(0, 0, 600, 480);
      this.setState({ isDrawing: false });
    } else if (activeItem === "Erase") {
      // Eraser tool - use white color to "erase"
      ctx.strokeStyle = "white";
      ctx.lineWidth = 10;
      ctx.moveTo(x, y);
    } else if (activeItem === "Text") {
      // Text tool - prompt for text input
      const text = prompt("Enter text:");
      if (text) {
        ctx.font = "16px Arial";
        ctx.fillStyle = this.props.color;
        ctx.fillText(text, x, y);
      }
      this.setState({ isDrawing: false });
    } else if (activeItem === "Picker") {
      // Color picker tool - get color from canvas
      const imageData = ctx.getImageData(x, y, 1, 1);
      const data = imageData.data;
      const rgb = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
      // Note: We can't directly change the color from here since this component doesn't own the color state
      // The parent component would need to handle color picker functionality
      console.log("Picked color:", rgb);
      this.setState({ isDrawing: false });
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
      if (this.props.activeItem === "Erase") {
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
      if (this.props.activeItem === "Circle") {
        ctxOverlay.clearRect(0, 0, 600, 480);
        ctxOverlay.beginPath();
        let radius = Math.sqrt(Math.pow(x - this.state.startX, 2) + Math.pow(y - this.state.startY, 2));
        ctxOverlay.arc(this.state.startX, this.state.startY, radius, 0, 2 * Math.PI);
        ctxOverlay.stroke();
        ctxOverlay.closePath();
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

    if (this.props.activeItem === "Circle") {
      ctxOverlay.clearRect(0, 0, 600, 480);
      ctx.beginPath();
      let radius = Math.sqrt(Math.pow(x - this.state.startX, 2) + Math.pow(y - this.state.startY, 2));
      ctx.arc(this.state.startX, this.state.startY, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
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
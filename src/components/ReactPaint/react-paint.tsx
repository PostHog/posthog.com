import React from "react";

import MenuBar from "./menu-bar";
import Content from "./content";
import ColorPanel from "./color-panel";

// Import SVG icons
import pencil from "./images/pencil.svg";
import line from "./images/line.svg";
import brush from "./images/brush.svg";
import fill from "./images/fill.svg";
import rectangle from "./images/rectangle.svg";
import text from "./images/text.svg";
import circle from "./images/circle.svg";
import erase from "./images/erase.svg";
import picker from "./images/picker.svg";

const defaultColor = "black";
const defaultTool = "Pencil";

interface ToolbarItem {
  name: string;
  image: string;
}

interface ReactPaintState {
  color: string;
  selectedItem: string;
  toolbarItems: ToolbarItem[];
}

const toolbarItems: ToolbarItem[] = [
  { name: "Pencil", image: pencil },
  { name: "Line", image: line },
  { name: "Brush", image: brush },
  { name: "Fill", image: fill },
  { name: "Text", image: text },
  { name: "Rectangle", image: rectangle },
  { name: "Circle", image: circle },
  { name: "Erase", image: erase },
  { name: "Picker", image: picker }
];

export default class ReactPaint extends React.Component<{}, ReactPaintState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      color: defaultColor,
      selectedItem: defaultTool,
      toolbarItems: toolbarItems
    };
    this.changeColor = this.changeColor.bind(this);
    this.changeTool = this.changeTool.bind(this);
  }

  changeColor(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLDivElement;
    this.setState({ color: target.style.backgroundColor });
  }

  changeTool(event: React.MouseEvent<HTMLDivElement>, tool: string) {
    this.setState({ selectedItem: tool });
  }

  render() {
    return (
      <React.Fragment>
        <MenuBar />
        <Content
          items={this.state.toolbarItems}
          activeItem={this.state.selectedItem}
          handleClick={this.changeTool}
          color={this.state.color}
        />
        <ColorPanel
          selectedColor={this.state.color}
          handleClick={this.changeColor}
        />
      </React.Fragment>
    );
  }
} 
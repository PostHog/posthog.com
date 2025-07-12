import React from "react";

const colors = [
  "#000000",
  "#464646",
  "#787878",
  "#980031",
  "#ed1d25",
  "#ff7d01",
  "#ffc30e",
  "#a7e71d",
  "#23b14c",
  "#03b8ef",
  "#4c6cf3",
  "#303699",
  "#6e3198",
  "#ffffff",
  "#dcdcdc",
  "#9c593c",
  "#ffa3b1",
  "#e5aa7a",
  "#f5e59c",
  "#fff9be",
  "#d3f9bc",
  "#9cbb60",
  "#99d9eb",
  "#6f99d2",
  "#536c8e",
  "#b5a5d6"
];

interface SelectedColorProps {
  color: string;
}

const SelectedColor: React.FC<SelectedColorProps> = ({ color }) => {
  const style = {
    backgroundColor: color
  };

  return <div className="color-selected" style={style} />;
};

interface ColorProps {
  color: string;
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Color: React.FC<ColorProps> = ({ color, handleClick }) => {
  const style = {
    backgroundColor: color
  };

  return <div className="color" style={style} onClick={handleClick} />;
};

interface ColorPanelProps {
  selectedColor: string;
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default class ColorPanel extends React.Component<ColorPanelProps> {
  constructor(props: ColorPanelProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: React.MouseEvent<HTMLDivElement>) {
    this.props.handleClick(event);
  }

  render() {
    const colorItems = colors.map(color => (
      <Color color={color} key={color} handleClick={this.handleClick} />
    ));

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <SelectedColor color={this.props.selectedColor} />
        <div className="color-panel">{colorItems}</div>
      </div>
    );
  }
} 
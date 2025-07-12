import React from "react";

interface ToolbarItem {
  name: string;
  image: string;
}

interface ButtonProps {
  active: boolean;
  name: string;
  image: string;
  handleClick: (event: React.MouseEvent<HTMLDivElement>, name: string) => void;
}

const Button: React.FC<ButtonProps> = ({ active, name, image, handleClick }) => {
  return (
    <div
      className={"button " + (active ? "selected" : "")}
      onClick={e => handleClick(e, name)}
    >
      <img src={image} alt={name} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

interface ToolboxProps {
  items: ToolbarItem[];
  activeItem: string;
  handleClick: (event: React.MouseEvent<HTMLDivElement>, name: string) => void;
}

export default class Toolbox extends React.Component<ToolboxProps> {
  constructor(props: ToolboxProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: React.MouseEvent<HTMLDivElement>, name: string) {
    this.props.handleClick(event, name);
  }

  render() {
    const items = this.props.items.map(item => (
      <Button
        active={this.props.activeItem === item.name ? true : false}
        name={item.name}
        image={item.image}
        key={item.name}
        handleClick={this.handleClick}
      />
    ));

    return <div className="toolbox">{items}</div>;
  }
} 
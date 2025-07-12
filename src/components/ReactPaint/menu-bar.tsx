import React from "react";

interface MenuItemProps {
  text: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ text }) => {
  return <div className="menu-item">{text}</div>;
};

export default class MenuBar extends React.Component {
  render() {
    return (
      <div className="menu-bar">
        <MenuItem text="File" />
        <MenuItem text="Edit" />
        <MenuItem text="View" />
        <MenuItem text="Image" />
        <MenuItem text="Colors" />
        <MenuItem text="Help" />
      </div>
    );
  }
} 
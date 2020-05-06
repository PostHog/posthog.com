import React, { Component } from "react";
import SidebarContents from "../SidebarContents";

class ResponsiveSidebar extends Component {
  render() {

    return (
      <div style={{
        position: "relative",
        top: 80,
        left: 10,
        right: "80%",
        bottom: 0,
        zIndex:1, 
      }} >
        <div style={{
          position:"absolute", 
          left:0,
          right:10,
          top:0,
          bottom:0
        }}>
          <SidebarContents/>
        </div>
      </div>
    )
  }
}

export default ResponsiveSidebar;
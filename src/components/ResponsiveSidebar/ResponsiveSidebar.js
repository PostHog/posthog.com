import React, { Component } from "react";
import SidebarContents from "../SidebarContents";

class ResponsiveSidebar extends Component {
  render() {

    return (
      <div style={{
        position: "fixed",
        top: 80,
        left: 10,
        right: "80%",
        bottom: 0,
        overflow: "auto", 
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
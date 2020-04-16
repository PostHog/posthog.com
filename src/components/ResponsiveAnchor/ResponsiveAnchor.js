import React, { Component } from 'react'
import TableOfContents from '../TableOfContents';

class ResponsiveAnchor extends Component {
  render() {
    return (
      <div style={{
        position: "fixed",
        top: 80,
        left: "85%",
        right: 10,
        bottom: 0,
        overflow: "auto",
      }} >
        <div style={{
          position: "absolute",
          left: 10,
          right: 0,
          top: 0,
          bottom: 0
        }}>
          <TableOfContents offsetTop={80} affix={true}/>
        </div>
      </div>
    )
  }
}

export default ResponsiveAnchor
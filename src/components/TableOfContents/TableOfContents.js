import React, { Component } from 'react'
import Anchor from 'antd/lib/anchor'
import 'antd/lib/anchor/style/css'
import { onSetAnchorOpen } from '../../actions/layout'
import { connect } from 'react-redux'
import './TableOfContents.css'

const { Link } = Anchor

const filterAnchorDetails = anchors => {
  let last_depth = 0
  anchors = [].slice.call(anchors).map(anchor => {
    let depth = parseInt(anchor.parentElement.nodeName[1])
    if (last_depth !== 0 && depth > last_depth) depth = last_depth + 1
    last_depth = depth
    return ({
      href: "#"+ anchor.parentElement.id,
      title: anchor.parentElement.innerText,
      depth: depth,
      children: []
    })
  })
  constructTree(anchors)
  return anchors
}

const constructTree = list => {
  let deleteNode = []
  for (let i = 0; i < list.length; i++) {
    for (let j = i+1; j < list.length; j++) {
      if (list[i].depth + 1 === list[j].depth) {
        list[i].children.push(list[j])
        deleteNode.push(j)
      }
      else if (list[i].depth >= list[j].depth) break 
    } 
  }
  deleteNode.sort((a,b)=>b-a).forEach(index => list.splice(index,1))
}

class TableOfContents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchors: []
    }
  }

  componentDidMount() {
    const anchors = document.getElementsByClassName('post-toc-anchor')
    this.setState({
      anchors: filterAnchorDetails(anchors)
    })
  }

  onSetAnchorOpen = () => {
    this.props.onSetAnchorOpen(false)
  }

  render() {
    const { anchors } = this.state
    const { offsetTop, affix } = this.props
    const loop = data =>  data.map((item) => {
      if (item.children.length > 0) {
        return (
          <Link href={item.href} title={item.title} key={item.href}>
            {loop(item.children)} 
          </Link>
        )
      }
      return (<Link href={item.href} title={item.title} key={item.href}/>)
    })
    return (
      <Anchor onClick={this.onSetAnchorOpen} offsetTop={offsetTop} affix={affix}>
        {loop(anchors)}
        {/* {(anchors.length > 1 && loop(anchors)) ||
         (anchors.length === 1 && loop(anchors[0].children))} */}
      </Anchor>
    )
  }
}

const mapDispatchToProps = {
  onSetAnchorOpen
}

export default connect(()=>({}), mapDispatchToProps) (TableOfContents)